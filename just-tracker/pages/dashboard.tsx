import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { supabase } from '../lib/supabase'

interface Tarea {
  id: string
  nombre: string
  estado: string
  prioridad: string
  pais: string
  tipo: string
  proveedor: string
  responsable: string
  fecha_entrega: string
  comentarios: string
  subtarea_de: string | null
}

export default function Dashboard() {
  const [tareas, setTareas] = useState<Tarea[]>([])
  const [filtroTipo, setFiltroTipo] = useState('TODOS')
  const [filtroEstado, setFiltroEstado] = useState('TODOS')
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<any>(null)
  const router = useRouter()

  useEffect(() => {
    const checkAuth = async () => {
      const { data } = await supabase.auth.getSession()
      if (!data.session) {
        router.push('/')
      } else {
        setUser(data.session.user)
        fetchTareas()
      }
    }
    checkAuth()
  }, [])

  const fetchTareas = async () => {
    try {
      const { data, error } = await supabase
        .from('tareas')
        .select('*')
        .order('nombre', { ascending: true })

      if (error) {
        console.error('Error fetching tareas:', error)
      } else {
        setTareas(data || [])
      }
    } catch (err) {
      console.error('Error:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/')
  }

  const getEstadoColor = (estado: string) => {
    const colors: { [key: string]: string } = {
      'En Ejecución': '#10b981',
      'On Going': '#10b981',
      'Pendiente': '#ef4444',
      'Completado': '#6b7280',
    }
    return colors[estado] || '#6b7280'
  }

  const getTipoColor = (tipo: string) => {
    const colors: { [key: string]: string } = {
      'PAID': '#3b82f6',
      'RRSS': '#8b5cf6',
      'EMAIL_MKT': '#ec4899',
      'MULTI': '#f59e0b',
    }
    return colors[tipo] || '#6b7280'
  }

  const filteredTareas = tareas.filter((tarea) => {
    const tipoMatch = filtroTipo === 'TODOS' || tarea.tipo === filtroTipo
    const estadoMatch = filtroEstado === 'TODOS' || tarea.estado === filtroEstado
    return tipoMatch && estadoMatch
  })

  const tareasPrincipales = filteredTareas.filter((t) => !t.subtarea_de)
  const subTareas = filteredTareas.filter((t) => t.subtarea_de)

  if (loading) {
    return <div className="loading">Cargando...</div>
  }

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div>
          <h1>📊 JUST TRACKER</h1>
          <p>Estado de Tareas - Digital Communications</p>
        </div>
        <div className="header-actions">
          <span className="user-email">{user?.email}</span>
          <button onClick={handleLogout} className="logout-btn">
            Cerrar Sesión
          </button>
        </div>
      </header>

      <div className="filters">
        <div className="filter-group">
          <label>Tipo:</label>
          <select value={filtroTipo} onChange={(e) => setFiltroTipo(e.target.value)}>
            <option value="TODOS">TODOS</option>
            <option value="PAID">PAID MEDIA</option>
            <option value="RRSS">RRSS</option>
            <option value="EMAIL_MKT">EMAIL MKT</option>
            <option value="MULTI">MULTI</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Estado:</label>
          <select value={filtroEstado} onChange={(e) => setFiltroEstado(e.target.value)}>
            <option value="TODOS">TODOS</option>
            <option value="Pendiente">Pendiente</option>
            <option value="En Ejecución">En Ejecución</option>
            <option value="On Going">On Going</option>
            <option value="Completado">Completado</option>
          </select>
        </div>
      </div>

      <div className="metrics">
        <div className="metric-card">
          <span className="metric-label">Total Tareas</span>
          <span className="metric-value">{filteredTareas.length}</span>
        </div>
        <div className="metric-card">
          <span className="metric-label">En Ejecución</span>
          <span className="metric-value" style={{ color: '#10b981' }}>
            {filteredTareas.filter((t) => t.estado === 'En Ejecución' || t.estado === 'On Going').length}
          </span>
        </div>
        <div className="metric-card">
          <span className="metric-label">Pendientes</span>
          <span className="metric-value" style={{ color: '#ef4444' }}>
            {filteredTareas.filter((t) => t.estado === 'Pendiente').length}
          </span>
        </div>
      </div>

      <div className="table-container">
        <table className="tasks-table">
          <thead>
            <tr>
              <th>Tarea</th>
              <th>Estado</th>
              <th>Prioridad</th>
              <th>País</th>
              <th>Tipo</th>
              <th>Proveedor</th>
              <th>Fecha Entrega</th>
              <th>Comentarios</th>
            </tr>
          </thead>
          <tbody>
            {tareasPrincipales.map((tarea) => (
              <div key={tarea.id}>
                <tr className="main-task">
                  <td className="task-name">
                    <strong>{tarea.nombre}</strong>
                  </td>
                  <td>
                    <span className="badge" style={{ backgroundColor: getEstadoColor(tarea.estado) }}>
                      {tarea.estado}
                    </span>
                  </td>
                  <td>
                    <span className={`priority ${tarea.prioridad.toLowerCase()}`}>
                      {tarea.prioridad}
                    </span>
                  </td>
                  <td>{tarea.pais}</td>
                  <td>
                    <span className="tipo-badge" style={{ backgroundColor: getTipoColor(tarea.tipo) }}>
                      {tarea.tipo}
                    </span>
                  </td>
                  <td>{tarea.proveedor}</td>
                  <td className="fecha">{tarea.fecha_entrega}</td>
                  <td className="comentarios">{tarea.comentarios}</td>
                </tr>

                {subTareas
                  .filter((st) => st.subtarea_de === tarea.id)
                  .map((subTarea) => (
                    <tr key={subTarea.id} className="sub-task">
                      <td className="task-name">
                        <span className="subtask-indent">└─ {subTarea.nombre}</span>
                      </td>
                      <td>
                        <span className="badge" style={{ backgroundColor: getEstadoColor(subTarea.estado) }}>
                          {subTarea.estado}
                        </span>
                      </td>
                      <td>
                        <span className={`priority ${subTarea.prioridad.toLowerCase()}`}>
                          {subTarea.prioridad}
                        </span>
                      </td>
                      <td>{subTarea.pais}</td>
                      <td>
                        <span className="tipo-badge" style={{ backgroundColor: getTipoColor(subTarea.tipo) }}>
                          {subTarea.tipo}
                        </span>
                      </td>
                      <td>{subTarea.proveedor}</td>
                      <td className="fecha">{subTarea.fecha_entrega}</td>
                      <td className="comentarios">{subTarea.comentarios}</td>
                    </tr>
                  ))}
              </div>
            ))}
          </tbody>
        </table>
      </div>

      <div className="footer-info">
        <p>💡 Última actualización: {new Date().toLocaleString('es-AR')}</p>
        <p>Para actualizar, contactá a Guadalupe con tu "parte diario"</p>
      </div>
    </div>
  )
}
