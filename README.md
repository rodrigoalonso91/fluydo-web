# Fluydo Web

Este es el repositorio para el sitio web de Fluydo S.A., importadores de marroquinería y accesorios de moda. El sitio está construido con Astro y estilizado con Tailwind CSS.

## 🚀 Entorno de Desarrollo

Sigue estos pasos para levantar el entorno de desarrollo en tu máquina local.

### 1. Instalar Dependencias

Abre una terminal en la raíz del proyecto y ejecuta el siguiente comando para instalar todas las dependencias necesarias.

```bash
npm install
```

### 2. Iniciar el Servidor de Desarrollo

Una vez instaladas las dependencias, ejecuta el siguiente comando para iniciar el servidor de desarrollo de Astro.

```bash
npm run dev
```

Por defecto, el sitio estará disponible en `http://localhost:4321`.

## 🐳 Entorno con Docker

Este proyecto incluye una configuración de Docker Compose para levantar un entorno de desarrollo completo con una base de datos PostgreSQL y un CMS Directus.

### 1. Iniciar los Servicios

Para iniciar todos los servicios en segundo plano, ejecuta el siguiente comando en la raíz del proyecto:

```bash
docker-compose up -d
```

### 2. Servicios Disponibles

-   **Directus**: El CMS estará disponible en `http://localhost:8055`.
    -   **Usuario**: `admin@example.com`
    -   **Contraseña**: `admin`
-   **PostgreSQL**: La base de datos estará disponible en el puerto `5432`.

## 💾 Base de Datos y CMS

El archivo `docker-compose.yml` define dos servicios principales:

-   **`db`**: Una instancia de `PostgreSQL 16` que sirve como base de datos para Directus. Los datos se persisten en el volumen `db-data`.
-   **`directus`**: Una instancia de `Directus`, un CMS de código abierto que se conecta a la base de datos PostgreSQL. Los archivos subidos y las extensiones se persisten en los volúmenes `directus_uploads` y `directus_extensions`.

## 🛠️ Tecnologías Utilizadas

-   **[Astro](https://astro.build/)**: El framework web para construir sitios rápidos y centrados en el contenido.
-   **[Tailwind CSS](https://tailwindcss.com/)**: Un framework de CSS "utility-first" para un diseño rápido y personalizado.
-   **[TypeScript](https://www.typescriptlang.org/)**: Un superconjunto de JavaScript que añade tipado estático.
-   **[Docker](https://www.docker.com/)**: Para la contenerización de la aplicación y sus servicios.
-   **[Directus](https://directus.io/)**: CMS de código abierto para gestionar el contenido.
-   **[PostgreSQL](https://www.postgresql.org/)**: Base de datos relacional de código abierto.

## 🧞 Comandos Útiles

-   `npm run build`: Compila el sitio para producción en el directorio `dist/`.
-   `npm run preview`: Sirve el sitio de producción localmente para previsualización.
-   `docker-compose down`: Detiene y elimina los contenedores definidos en `docker-compose.yml`.