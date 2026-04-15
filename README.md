# ⚽ Escuela de Fútbol Elite - Página Autoadministrable

Una página web completa y autoadministrable para una escuela de fútbol, construida con **Next.js 16**, **TypeScript**, **Tailwind CSS**, **Prisma ORM** y **SQLite**.

## 🚀 Características

### Sitio Público
- **Inicio**: Hero, características, vista previa de categorías y noticias recientes
- **Nosotros**: Historia, misión, visión y valores
- **Categorías**: Lista de categorías con rangos de edad
- **Horarios**: Tabla de horarios por categoría
- **Galería**: Galería de fotos con efectos hover
- **Noticias**: Blog de noticias con vista de detalle
- **Contacto**: Formulario e información de contacto

### Panel de Administración
- **Login seguro** con autenticación JWT y cookies httpOnly
- **Dashboard** con estadísticas y accesos rápidos
- **CRUD Noticias**: Crear, editar, publicar/noticias de borrador
- **CRUD Categorías**: Gestionar categorías por edad
- **CRUD Horarios**: Gestionar horarios por categoría
- **CRUD Galería**: Subir y gestionar fotos con vista previa
- **Configuración**: Editar contenido del sitio (teléfono, email, textos, etc.)

## 📋 Requisitos Previos

- Node.js 18+ 
- npm

## 🛠️ Instalación

```bash
# Instalar dependencias
npm install

# Configurar la base de datos y ejecutar migraciones
npx prisma migrate dev

# Generar datos de ejemplo (admin usuario, categorías, etc.)
npx tsx src/lib/seed.ts
```

## 🏃‍♂️ Ejecutar en Desarrollo

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) para ver el sitio.
Accede al panel admin en [http://localhost:3000/admin/login](http://localhost:3000/admin/login)

**Credenciales por defecto:**
- Usuario: `admin`
- Contraseña: `admin123`

## 📁 Estructura del Proyecto

```
escuela-futbol/
├── prisma/
│   └── schema.prisma          # Modelos de base de datos
├── public/
│   └── uploads/               # Imágenes subidas
├── src/
│   ├── app/
│   │   ├── page.tsx           # Página de inicio
│   │   ├── nosotros/page.tsx
│   │   ├── categorias/page.tsx
│   │   ├── horarios/page.tsx
│   │   ├── galeria/page.tsx
│   │   ├── noticias/page.tsx
│   │   ├── noticias/[slug]/page.tsx
│   │   ├── contacto/page.tsx
│   │   ├── admin/             # Panel de administración
│   │   │   ├── login/page.tsx
│   │   │   ├── dashboard/page.tsx
│   │   │   ├── noticias/      # CRUD noticias
│   │   │   ├── categorias/    # CRUD categorías
│   │   │   ├── horarios/      # CRUD horarios
│   │   │   ├── galeria/       # CRUD galería
│   │   │   └── configuracion/page.tsx
│   │   └── api/               # API Routes
│   │       ├── auth/login
│   │       ├── auth/me
│   │       ├── noticias
│   │       ├── categorias
│   │       ├── horarios
│   │       ├── galeria
│   │       ├── config
│   │       ├── contacto
│   │       └── upload
│   ├── components/
│   │   └── public/
│   │       ├── Header.tsx
│   │       ├── Footer.tsx
│   │       ├── PublicLayout.tsx
│   │       ├── HeroSection.tsx
│   │       ├── FeaturesSection.tsx
│   │       ├── CategoriasPreview.tsx
│   │       ├── NoticiasRecientes.tsx
│   │       └── CTASection.tsx
│   └── lib/
│       ├── prisma.ts          # Cliente Prisma
│       ├── auth.ts            # Utilidades JWT
│       ├── auth-middleware.ts # Middleware auth
│       └── seed.ts            # Datos de ejemplo
└── .env                       # Variables de entorno
```

## 🗄️ Base de Datos

El proyecto utiliza **SQLite** como base de datos local con los siguientes modelos:

- **Admin**: Usuarios del panel de administración
- **Configuracion**: Configuración del sitio (textos, contacto, etc.)
- **Categoria**: Categorías por edad (Pre-Infantil, Infantil, Juvenil A/B)
- **Horario**: Horarios de entrenamiento vinculados a categorías
- **Noticia**: Noticias/artículos del blog
- **Galeria**: Fotos de la galería
- **Contacto**: Información de contacto

## 🔧 Variables de Entorno

```env
DATABASE_URL="file:./dev.db"
JWT_SECRET="tu_clave_secreta_aqui"
```

## 🏗️ Construir para Producción

```bash
npm run build
npm start
```

## 📝 Panel Admin - Funcionalidades

1. **Dashboard**: Vista general con estadísticas
2. **Noticias**: Crear/editar noticias con título, slug, contenido, imagen, estado publicado/borrador
3. **Categorías**: Gestionar categorías con nombre, descripción, rango de edad, imagen
4. **Horarios**: Crear horarios con día, hora inicio/fin, sede, vinculado a categoría
5. **Galería**: Subir fotos (upload local) o por URL, con título, descripción, categoría
6. **Configuración**: Editar textos del sitio, datos de contacto, URLs de redes sociales

## 🚀 Despliegue

Para desplegar en producción:

1. **Vercel** (recomendado): Conecta tu repo a Vercel y despliega automáticamente
2. **Servidor propio**: 
   ```bash
   npm run build
   npx prisma migrate deploy
   npm start
   ```

## 🔐 Seguridad

- Autenticación JWT con cookies httpOnly
- Contraseñas hasheadas con bcrypt
- Protección de rutas API con middleware de autenticación
- Variables de entorno para datos sensibles

## 📄 Licencia

Proyecto de código abierto para uso educativo y comercial.

---

Hecho con ⚽ y ❤️ para la Escuela de Fútbol Elite
