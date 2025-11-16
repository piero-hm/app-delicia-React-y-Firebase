# 🥐

Mini proyecto de e-commerce para una panadería/pastelería ficticia llamada "Delicia". La aplicación permite a los usuarios explorar productos, gestionar un carrito de compras y autenticarse. También incluye un panel de administración para la gestión de productos.

## 📋 Características Principales

- **Catálogo de Productos:** Visualización de todos los productos disponibles.
- **Carrito de Compras:** Funcionalidad para agregar, eliminar y ver productos en el carrito.
- **Autenticación de Usuarios:** Registro e inicio de sesión para clientes.
- **Panel de Administración:** Interfaz protegida para que los administradores puedan crear, editar y eliminar productos (CRUD).
- **Enrutamiento:** Navegación fluida entre las diferentes páginas de la aplicación.

## 🛠️ Tecnologías Utilizadas

- **Frontend:** [React](https://react.dev/)
- **Bundler:** [Vite](https://vitejs.dev/)
- **Enrutamiento:** [React Router](https://reactrouter.com/)
- **Backend y Base de Datos:** [Firebase](https://firebase.google.com/) (Firestore y Authentication)
- **Linting:** [ESLint](https://eslint.org/)

## 🚀 Cómo Empezar

Sigue estos pasos para tener una copia del proyecto corriendo localmente.

1.  **Clonar el repositorio**
    ```bash
    git clone https://github.com/piero-hm/app-delicia-test.git
    cd app-delicia-test
    ```

2.  **Instalar dependencias**
    ```bash
    npm install
    ```

3.  **Configurar Variables de Entorno**
    - Crea un archivo `.env.local` en la raíz del proyecto.
    - Añade tus credenciales de configuración de Firebase como se muestra a continuación:
      ```env
      VITE_API_KEY=tu_api_key
      VITE_AUTH_DOMAIN=tu_auth_domain
      VITE_PROJECT_ID=tu_project_id
      VITE_STORAGE_BUCKET=tu_storage_bucket
      VITE_MESSAGING_SENDER_ID=tu_messaging_sender_id
      VITE_APP_ID=tu_app_id
      ```

4.  **Iniciar el servidor de desarrollo**
    ```bash
    npm run dev
    ```
    La aplicación estará disponible en `http://localhost:5173` (o el puerto que indique Vite).

## 📜 Scripts Disponibles

- `npm run dev`: Inicia la aplicación en modo de desarrollo.
- `npm run build`: Compila la aplicación para producción.
- `npm run lint`: Analiza el código en busca de errores de estilo y calidad.
- `npm run preview`: Sirve la build de producción de forma local para previsualización.
