# 🏢 Backoffice - Sistema de Gestión de Usuarios

Un sistema de backoffice moderno desarrollado con React, TypeScript y Vite para la gestión y administración de usuarios. Incluye autenticación, control de roles y una interfaz intuitiva para administradores.

## ✨ Características Principales

- 🔐 **Sistema de Autenticación** - Login seguro con JWT
- 👥 **Gestión de Usuarios** - CRUD completo de usuarios
- 🎭 **Control de Roles** - Manejo de roles (admin, estudiante, docente)
- 🚫 **Bloqueo de Usuarios** - Capacidad de bloquear/desbloquear usuarios
- 📱 **Diseño Responsive** - Optimizado para todos los dispositivos
- 🎨 **UI Moderna** - Interfaz atractiva con Tailwind CSS y shadcn/ui
- ⚡ **Desarrollo Rápido** - Hot Module Replacement (HMR) con Vite

## 🛠️ Tecnologías Utilizadas

### Frontend
- **React 19** - Librería principal de UI
- **TypeScript** - Tipado estático
- **Vite** - Build tool y dev server
- **React Router DOM** - Enrutamiento SPA
- **Tailwind CSS** - Framework de estilos
- **shadcn/ui** - Componentes UI reutilizables
- **Radix UI** - Componentes accesibles
- **Lucide React** - Iconos modernos

### Herramientas de Desarrollo
- **ESLint** - Linting de código
- **PostCSS** - Procesamiento de CSS
- **Axios** - Cliente HTTP

## 📋 Prerrequisitos

Antes de comenzar, asegúrate de tener instalado:

- **Node.js** (versión 18 o superior)
- **npm** o **yarn** como gestor de paquetes

## 🚀 Instalación y Configuración

### 1. Clonar el repositorio
```bash
git clone <url-del-repositorio>
cd backoffice
```

### 2. Instalar dependencias
```bash
npm install
```

### 3. Configurar variables de entorno
Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:

```env
VITE_API_URL=http://35.223.247.76:8080
```

**Variables disponibles:**
- `VITE_API_URL` - URL base de la API backend

> **Nota:** Las variables de entorno en Vite deben comenzar con `VITE_` para estar disponibles en el cliente.

## 🎯 Ejecutar el Proyecto

### Modo Desarrollo con Vite
Para iniciar el servidor de desarrollo:

```bash
npm run dev
```

Esto iniciará el servidor de desarrollo de Vite en `http://localhost:5173` con las siguientes características:
- ⚡ Hot Module Replacement (HMR)
- 🔄 Recarga automática al guardar cambios
- 📊 Proxy configurado para las llamadas a la API

### Construir para Producción
Para generar la build de producción:

```bash
npm run build
```

### Previsualizar Build de Producción
Para previsualizar la build de producción localmente:

```bash
npm run preview
```

### Linting
Para ejecutar el linter y revisar el código:

```bash
npm run lint
```

## 📁 Estructura del Proyecto

```
backoffice/
├── src/
│   ├── components/          # Componentes reutilizables
│   │   ├── DashboardLayout.tsx
│   │   └── ProtectedRoute.tsx
│   ├── contexts/           # Context API de React
│   │   └── AuthContext.tsx
│   ├── pages/              # Páginas de la aplicación
│   │   ├── DashboardPage/  # Panel principal
│   │   ├── LoginPage/      # Página de login
│   │   ├── RegisterPage/   # Página de registro
│   │   └── NotFoundPage.tsx
│   ├── services/           # Servicios de API
│   │   ├── api.ts          # Configuración de Axios
│   │   ├── authService.ts  # Servicios de autenticación
│   │   └── userService.ts  # Servicios de usuarios
│   ├── types/              # Definiciones de TypeScript
│   │   └── users.ts
│   └── App.tsx             # Componente principal
├── @/                      # Alias para componentes UI
│   └── components/ui/      # Componentes de shadcn/ui
├── public/                 # Archivos estáticos
└── package.json
```

## 🔑 Funcionalidades Principales

### Autenticación
- Login con email y contraseña
- Gestión de tokens JWT
- Redirección automática según estado de autenticación

### Dashboard de Usuarios
- Visualización de todos los usuarios registrados
- Cambio de roles (estudiante/docente)
- Bloqueo y desbloqueo de usuarios
- Interfaz responsive con tabla adaptativa

### Rutas Protegidas
- Control de acceso basado en autenticación
- Redirección automática a login si no está autenticado

## 🎨 Características de Vite

El proyecto aprovecha al máximo las capacidades de Vite:

- **Inicio Rápido**: Servidor de desarrollo ultra-rápido
- **HMR**: Hot Module Replacement para desarrollo eficiente
- **Optimización**: Build optimizado para producción
- **Plugins**: Integración con React y Tailwind CSS
- **Proxy**: Configuración de proxy para API backend

## 🌐 Variables de Entorno

El proyecto utiliza variables de entorno para la configuración. Crea un archivo `.env` en la raíz del proyecto:

```env
VITE_API_URL=http://35.223.247.76:8080
```

### Variables requeridas:
- `VITE_API_URL` - URL base de la API backend

### Notas importantes:
- Todas las variables de entorno en Vite deben comenzar con `VITE_` para estar disponibles en el frontend
- No incluir el archivo `.env` en el control de versiones (ya está en `.gitignore`)
- Para diferentes entornos (desarrollo, staging, producción), puedes crear archivos `.env.local`, `.env.development`, `.env.production`

## 🤝 Contribución

1. Fork del proyecto
2. Crear una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit de tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia ISC.

## 🚀 Scripts Disponibles

| Script | Descripción |
|--------|-------------|
| `npm run dev` | Inicia el servidor de desarrollo con Vite |
| `npm run build` | Construye la aplicación para producción |
| `npm run preview` | Previsualiza la build de producción |
| `npm run lint` | Ejecuta ESLint para revisar el código |
