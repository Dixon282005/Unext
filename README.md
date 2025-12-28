```markdown
# 🚀 Unext

![Project Status](https://img.shields.io/badge/Status-In%20Development-orange?style=flat-square)
![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)
![Supabase](https://img.shields.io/badge/Supabase-Auth%20%26%20DB-green?style=flat-square&logo=supabase)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38bdf8?style=flat-square&logo=tailwind-css)

> **Conectando el talento joven con el futuro industrial de Venezuela.**

**Unext** es una plataforma moderna de networking profesional diseñada para cerrar la brecha entre estudiantes/egresados y las empresas venezolanas. Facilita la búsqueda de pasantías y primeros empleos mediante un sistema inteligente de perfiles y vacantes.

---

## 📸 Vistazo Rápido

_(Aquí puedes agregar capturas de pantalla de tu dashboard en el futuro)_
![Dashboard Preview](https://via.placeholder.com/1200x600/1a1a1a/ffffff?text=Dashboard+Preview+Coming+Soon)

---

## ✨ Características Principales

### 🔐 Autenticación y Seguridad

- Sistema robusto de **Login y Registro** vía Supabase Auth.
- Validación de formularios segura.
- Gestión de sesiones y protección de rutas (Middleware).

### 👥 Sistema Multi-Rol

La plataforma adapta la experiencia según el tipo de usuario:

- **Talento (Estudiantes):** Búsqueda de empleo, gestión de perfil, carga de CV.
- **Empresas:** Publicación de vacantes, gestión de candidatos, dashboard de métricas.

### 📊 Dashboard Inteligente

- **Visualización de Datos:** Gráficas interactivas con `Recharts` (Postulaciones, Vistas, Rendimiento).
- **Modo Oscuro/Claro:** Interfaz adaptativa con persistencia de tema.
- **Navegación Modular:** Sidebar y Header dinámicos y responsivos.

---

## 🛠️ Tech Stack

Este proyecto utiliza las tecnologías más modernas del ecosistema React:

| Categoría    | Tecnología                                    | Uso                                       |
| ------------ | --------------------------------------------- | ----------------------------------------- |
| **Core**     | [Next.js 15](https://nextjs.org/)             | App Router, Server Actions, SSR.          |
| **Lenguaje** | [TypeScript](https://www.typescriptlang.org/) | Tipado estático y seguridad de código.    |
| **Backend**  | [Supabase](https://supabase.com/)             | Base de datos PostgreSQL, Auth y Storage. |
| **Estilos**  | [Tailwind CSS](https://tailwindcss.com/)      | Diseño utility-first rápido y responsivo. |
| **UI Kit**   | [Lucide React](https://lucide.dev/)           | Iconografía moderna y ligera.             |
| **Gráficos** | [Recharts](https://recharts.org/)             | Visualización de datos para el dashboard. |

---

## 📂 Arquitectura del Proyecto

El proyecto sigue una arquitectura basada en **Features (Vertical Slice)** para asegurar escalabilidad y mantenimiento:
```

src/
├── app/ # Rutas y Layouts (Next.js App Router)
├── components/ # Componentes UI globales (Botones, Inputs)
├── features/ # Módulos de Negocio
│ ├── auth/ # Lógica de Autenticación
│ ├── dashboard/ # Componentes y lógica del Dashboard
│ ├── jobs/ # Gestión de Vacantes (CRUD)
│ └── ...
├── lib/ # Utilidades y configuración de Supabase
└── types/ # Definiciones de tipos globales

````

---

## 🚀 Instalación y Uso

Sigue estos pasos para correr el proyecto localmente:

1. **Clonar el repositorio:**
   ```bash
   git clone [https://github.com/tu-usuario/unext.git](https://github.com/tu-usuario/unext.git)
   cd unext

````

2. **Instalar dependencias:**

```bash
npm install
# o si usas pnpm (recomendado)
pnpm install

```

3. **Configurar Variables de Entorno:**
   Crea un archivo `.env.local` en la raíz y agrega tus credenciales de Supabase:

```env
NEXT_PUBLIC_SUPABASE_URL=tu_url_de_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_anon_key_de_supabase

```

4. **Correr el servidor de desarrollo:**

```bash
npm run dev

```

5. **¡Listo!** Abre [http://localhost:3000](https://www.google.com/search?q=http://localhost:3000) en tu navegador.

---

## 🗺️ Roadmap

- [x] Autenticación (Login/Register)
- [x] Base de Datos (Perfiles y Roles)
- [x] Dashboard UI (Responsive & Dark Mode)
- [ ] CRUD de Vacantes (Crear, Editar, Eliminar)
- [ ] Perfil de Usuario Editable
- [ ] Aplicación a vacantes en tiempo real

---

## 🤝 Contribución

Este es un proyecto privado actualmente en desarrollo. Sin embargo, el feedback es bienvenido.

---

Hecho con ❤️ desde **Venezuela**.

```

### 💡 Tips para que se vea aún mejor:

1.  **Screenshots:** En cuanto tengas el Dashboard con datos reales o la pantalla de Login terminada, toma una captura, guárdala en una carpeta `public/screenshots` y actualiza la línea de la imagen en el README. Eso aumenta el valor visual un 100%.
2.  **Repo:** Si vas a subir esto a GitHub, asegúrate de que la descripción corta del repositorio (la que sale a la derecha en GitHub) diga: *"Plataforma de conexión profesional para Venezuela construida con Next.js 15 y Supabase"*.

```
