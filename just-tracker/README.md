# JUST TRACKER - Digital Communications Status Dashboard

Dashboard para trackear el estado de tareas de comunicaciones digitales en JUST América.

## Credenciales de acceso

**Email:** guadalupe.alvarez@swissjust.net  
**Contraseña temporal:** JustTracker2026!

## Cómo deployar en Vercel (SIN necesidad de Git o línea de comandos)

### Paso 1: Crear un repositorio en GitHub (3 minutos)

1. Ve a https://github.com/new
2. Nombre del repo: `just-tracker` (o el que prefieras)
3. Descripción: "JUST America - Digital Communications Tracker"
4. Selecciona **"Public"**
5. **NO** marques "Add a README" (lo haremos luego)
6. Clickea **"Create repository"**

### Paso 2: Subir los archivos a GitHub (sin CLI)

1. En tu repo nuevo, clickea el botón verde **"Code"**
2. Clickea **"Upload files"** (arriba a la derecha)
3. **Descarga TODOS los archivos** que te doy:
   - `package.json`
   - `next.config.js`
   - `tsconfig.json`
   - `.gitignore`
   - `.env.example`
   - `README.md`
   - Carpeta `lib/` (con `supabase.ts`)
   - Carpeta `pages/` (con `_app.tsx`, `index.tsx`, `dashboard.tsx`)
   - Carpeta `styles/` (con `globals.css`)

4. Arrastrálos todos a GitHub en la ventana de upload
5. En el mensaje de commit, escribe: `Initial commit`
6. Clickea **"Commit changes"**

### Paso 3: Conectar con Vercel y deployar (2 minutos)

1. Ve a https://vercel.com/dashboard
2. Clickea **"Add New..."** → **"Project"**
3. Clickea **"Import Git Repository"**
4. Busca tu repo `just-tracker`
5. Clickea **"Import"**
6. **En "Environment Variables"**, agrega:
   - **Name:** `NEXT_PUBLIC_SUPABASE_URL`
   - **Value:** `https://xarhdnejvjtqklelszeu.supabase.co`
   - Clickea **"Add"**

7. Agrega otra variable:
   - **Name:** `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **Value:** `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhhcmhkbmVqdmp0cWtsZWxzemV1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODgxOTk2MTMsImV4cCI6MjEwMzc3NTYxM30.pJDsww_Mq2h59LcxQRuXdmPw641ImSy3dBiHXnj5M_c`
   - Clickea **"Add"**

8. Clickea **"Deploy"**
9. Espera 2-3 minutos mientras se construye
10. ¡Listo! Vercel te dará un URL tipo: `https://just-tracker-xyz.vercel.app`

### Paso 4: ¡Usa tu dashboard!

1. Entra al link que Vercel te da
2. Login con:
   - **Email:** guadalupe.alvarez@swissjust.net
   - **Contraseña:** JustTracker2026!
3. ¡Verás todas tus tareas!

---

## Cómo funciona el sistema

- **Vos:** Entras al dashboard, ves el estado de todas tus tareas
- **Yo:** Cada lunes/viernes (o cuando me das tu "parte"), actualizo la base de datos
- **Tu equipo:** Comparte el link con Annette, Dani, Mili y Giuli → ellas ven el dashboard en tiempo real

---

## Notas de seguridad

- La app usa Supabase con Row Level Security (RLS)
- Solo tú puedes actualizar tareas (desde mi acceso)
- Tu equipo puede VER pero no modificar
- Las credenciales están protegidas en Vercel (encriptadas)

---

## Para cambiar la contraseña después (opcional)

Ve a Supabase → Authentication → Users → Tu usuario → Cambia la contraseña

---

## ¿Preguntas o problemas?

Contactá a Guadalupe o al equipo de sistemas. El dashboard está listo para usar.
