# Node API Challenge - Interseguros

Este es el repositorio para el reto técnico de Interseguros, construido con Node.js, Express, TypeScript y Prisma (PostgreSQL). Sigue principios de arquitectura limpia para mantener el código escalable, mantenible y testeable. La aplicación principalmente expone estadisticas a partir de una matriz dada, adicional al al reto implementa una logica de authenticación para generar un JWT para la capa de authenticación.

## 🚀 Requisitos Previos

Antes de comenzar, asegúrate de tener instalado lo siguiente en tu sistema:
- [Node.js](https://nodejs.org/en/) (Versión 22.x o superior)
- [npm](https://www.npmjs.com/) (Gestor de paquetes de Node)
- PostgreSQL (Base de datos relacional)

## 🛠️ Instalación y Configuración

Sigue estos pasos para levantar el proyecto en tu entorno local:

1. **Clonar el repositorio:**
   Si aún no lo has hecho, clona este repositorio en tu máquina local.

2. **Instalar las dependencias:**
   Ejecuta el siguiente comando en la raíz del proyecto para descargar e instalar todas las dependencias necesarias:
   ```bash
   npm install
   ```

3. **Configurar las variables de entorno:**
   En la raíz del proyecto encontrarás un archivo llamado `.env.example`. Este archivo sirve como plantilla para las variables de entorno requeridas.
   - Crea una copia de este archivo y renómbralo a `.env`.
   - Abre el archivo `.env` y reemplaza los valores vacíos con la configuración correspondiente a tu entorno:
     ```env
     PORT=3100
     CORS_ORIGIN=http://localhost:3000
     SEED_JWT=tu_secreto_para_jwt
     DATABASE_URL=postgresql://usuario:password@localhost:5432/nombre_db?schema=public
     ```

4. **Levantar la base de datos (Prisma):**
   Como el proyecto utiliza Prisma como ORM, es necesario sincronizar la base de datos y generar el cliente:
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Iniciar el servidor en modo desarrollo:**
   Ejecuta el siguiente comando para correr el servidor con recarga en caliente (hot-reload):
   ```bash
   npm run dev
   ```
   El servidor debería estar corriendo en el puerto especificado (por defecto `3100`).

## 🏗️ Arquitectura y Patrones de Diseño

El proyecto está estructurado utilizando los principios de **Clean Architecture** y **Domain-Driven Design (DDD)**. Esta arquitectura se divide en capas con responsabilidades únicas:

- **Domain:** Contiene la lógica de negocio central (entidades, casos de uso, interfaces). No depende de ninguna otra capa.
- **Infrastructure:** Implementa las interfaces definidas en el dominio (ej. repositorios que se conectan a Prisma).
- **Presentation:** Punto de entrada de las peticiones (controladores, rutas, middlewares). Gestiona la interacción con el cliente y delega la lógica a los servicios o casos de uso.
- **Data / Services:** Gestión de la conexión a la base de datos (Postgres) y servicios externos.

Este enfoque permite que el código sea altamente testeable, desacoplado y fácil de mantener.

## 📝 Convenciones de Código

Para mantener la legibilidad y consistencia del código, se han seguido las siguientes prácticas de codificación:

- **Variables y Funciones:** Se utiliza `camelCase` (ej. `errorMiddleware`, `startServer`).
- **Clases e Interfaces:** Se utiliza `PascalCase` (ej. `ServerApp`, `PostgresDatabase`).
- **Archivos:** Se utiliza `kebab-case` para los nombres de archivo y un sufijo descriptivo (ej. `error.middleware.ts`, `server.ts`).
- **Tipado Fuerte:** Uso intensivo de TypeScript para prevenir errores en tiempo de ejecución.
- **Comentarios y Documentación:** El código está documentado usando el formato JSDoc en español para facilitar su comprensión.

## 🧪 Pruebas

Para ejecutar la suite de pruebas unitarias (utilizando Jest), ejecuta:
```bash
npm run test
```

## 📦 Producción

Para construir y correr la versión optimizada para producción:
```bash
npm run build
npm run start
```

## 🐳 Docker

El proyecto incluye un `Dockerfile` multiplataforma (usando construcciones multi-etapa o multi-stage builds) para crear una imagen Docker ligera y lista para producción.

Para levantar el proyecto utilizando Docker:

1. **Construir la imagen:**
   Ejecuta el siguiente comando en la raíz del proyecto para construir la imagen Docker. Esto ejecutará la instalación de dependencias, la generación de Prisma y la compilación de TypeScript:
   ```bash
   docker build -t interseguros-node-api .
   ```

2. **Ejecutar el contenedor:**
   Una vez construida la imagen, levanta un contenedor mapeando el puerto expuesto (`8080` por defecto en la imagen) y pasando tus variables de entorno (asegúrate de que `DATABASE_URL` apunte a una base de datos accesible desde el contenedor):
   ```bash
   docker run -p 8080:8080 --env-file .env interseguros-node-api
   ```
   *Nota:* Puedes usar el archivo `.env` que configuraste previamente, pero asegúrate de ajustar las URLs si los servicios están en otras redes u otros contenedores (por ejemplo, usando `host.docker.internal` para alcanzar el localhost del host).
