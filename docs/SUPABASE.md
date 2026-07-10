# Conectar Supabase (base de datos multinacional)

El Command Center ya tiene toda la capa de base de datos construida. Hoy:

- **Local (`npm run dev`)** → persiste en SQLite (`dev.db`). Funciona sin configurar nada.
- **Producción (Vercel) sin Postgres** → los módulos migrados caen a `localStorage` del navegador (sin pérdida de datos, pero sin sincronización entre dispositivos). El badge en Contactos lo indica: _"Guardado local — conecta Supabase para sincronizar"_.
- **Con Supabase conectado** → todo persiste en la nube y sincroniza entre equipos y países. El badge cambia a _"Base de datos conectada"_.

## Pasos para activar Supabase (una sola vez)

1. **Crea el proyecto** en [supabase.com](https://supabase.com) → New Project. Elige la región más cercana a tu operación (o varias para multi-país más adelante).

2. **Copia la connection string**: Supabase → Project Settings → Database → Connection string → **URI** (modo *Session* / *Transaction* con pooler para serverless). Se ve así:
   ```
   postgresql://postgres.[ref]:[password]@aws-0-[region].pooler.supabase.com:6543/postgres
   ```

3. **Cambia el proveedor de Prisma** en `prisma/schema.prisma`:
   ```prisma
   datasource db {
     provider = "postgresql"   // antes: "sqlite"
     url      = env("DATABASE_URL")
   }
   ```

4. **Aplica el esquema** a Supabase:
   ```bash
   DATABASE_URL="postgresql://..." npx prisma migrate deploy
   # o, para la primera vez:
   DATABASE_URL="postgresql://..." npx prisma db push
   ```

5. **Configura la variable en Vercel**: Project → Settings → Environment Variables →
   `DATABASE_URL` = tu connection string de Supabase (Production + Preview). Redeploy.

Listo. `isPersistentDb()` detecta el prefijo `postgresql://` y activa el modo base de datos automáticamente — sin tocar la UI.

## Qué módulos ya usan la base de datos

- ✅ **Contactos** — migrado (modelo `Contact`, API `/api/contacts`)
- ✅ **Leads del sitio** — ya iban a DB desde el formulario público (modelo `Lead`)
- ⏳ Pendientes de migrar con el mismo patrón: Pipelines (deals), Inbox (conversaciones), Broadcasts, Cola/pool

Cada módulo sigue el mismo patrón: modelo Prisma → ruta API protegida por cookie → hook `use*` con fallback a `localStorage`. Replicarlo es mecánico.

## Siguiente paso recomendado: auth por persona

Con Supabase ya tienes **Supabase Auth** incluido (email + contraseña, Google, Microsoft, 2FA). El salto natural: reemplazar `ADMIN_PASSWORD`/`MEMBER_PASSWORD` por login individual, ligando cada registro a su `createdBy` (el campo ya existe en el modelo `Contact`) y filtrando por `country` para la estructura multi-país.
