# 🗳️ Sistema Electoral — Comités de Seguridad y Hostigamiento

## Cómo publicar en Vercel (paso a paso)

### OPCIÓN A — Subir carpeta directo a Vercel (más fácil, sin Git)

1. Ve a https://vercel.com y crea cuenta gratuita (con Google o GitHub)
2. En el dashboard haz clic en **"Add New → Project"**
3. Selecciona **"Import from your local file system"** o arrastra la carpeta
4. En **"Framework Preset"** selecciona **Create React App**
5. Clic en **Deploy** — espera 2 minutos
6. ¡Listo! Recibirás una URL pública tipo `votaciones-comites.vercel.app`

### OPCIÓN B — Via GitHub (recomendado para futuras actualizaciones)

1. Crea repositorio en https://github.com
2. Sube esta carpeta al repositorio
3. En Vercel conecta tu cuenta de GitHub y selecciona el repositorio
4. Cada vez que actualices el código en GitHub, Vercel se actualiza automáticamente

---

## Personalizar candidatos

Edita el archivo `src/data.js` — busca `CANDIDATOS_POR_SEDE` y reemplaza los nombres de ejemplo con los nombres reales.

## Cambiar contraseña de admin

En `src/App.js` busca `admin2024` y cámbiala por tu contraseña deseada.

## Base de datos

Los votos se guardan en Supabase (PostgreSQL). Para ver los datos directamente:
1. Ve a https://supabase.com → tu proyecto
2. Menú izquierdo → **Table Editor** → tabla `votantes`
3. Desde ahí puedes filtrar, ordenar y exportar a CSV

## Exportar a Excel

Desde el Panel Admin (botón ⚙ Admin → contraseña), haz clic en **"⬇ Exportar Excel"**.
Se descarga un archivo .xlsx con 3 hojas:
- Registro completo de votos
- Resultados Comité de Seguridad  
- Resultados Comité de Hostigamiento
