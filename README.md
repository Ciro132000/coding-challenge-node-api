# Node API

API desarrollada con Node.js, Express, TypeScript, Prisma y PostgreSQL. La aplicación expone estadísticas a partir de una matriz dada e incluye autenticación para generar tokens JWT usados por la capa de autorización.

## Requisitos

- [Node.js](https://nodejs.org/en/) 22.x o superior
- [npm](https://www.npmjs.com/)
- PostgreSQL
- Docker, solo si se desea ejecutar el servicio contenerizado

## Variables de entorno

Crear un archivo `.env` en la raíz del proyecto. Si existe una plantilla `.env.example`, copiarla como base:

```bash
cp .env.example .env
```

Completar los valores requeridos:

```env
PORT=3001
CORS_ORIGIN=http://localhost:3000
SEED_JWT=tu_secreto_para_jwt
DATABASE_URL=postgresql://usuario:password@localhost:5432/nombre_db?schema=public
```

| Variable | Descripción | Ejemplo |
| --- | --- | --- |
| `PORT` | Puerto donde se levanta la API. | `3001` |
| `CORS_ORIGIN` | Origen permitido para CORS. | `http://localhost:3000` |
| `SEED_JWT` | Secreto usado para firmar y validar tokens JWT. | `tu_secreto_para_jwt` |
| `DATABASE_URL` | Cadena de conexión de PostgreSQL usada por Prisma. | `postgresql://usuario:password@localhost:5432/nombre_db?schema=public` |

## Instalación y ejecución local

Instalar dependencias:

```bash
npm install
```

Generar el cliente de Prisma y sincronizar la base de datos:

```bash
npx prisma generate
npx prisma db push
```

Levantar el servidor en modo desarrollo:

```bash
npm run dev
```

La API quedará disponible en el puerto definido por `PORT`, por defecto `3001`.

## Scripts disponibles

```bash
npm run dev
```

Levanta el servidor en modo desarrollo con recarga automática usando `tsx watch`.

```bash
npm run build
```

Compila TypeScript y genera la carpeta `dist`.

```bash
npm start
```

Ejecuta la versión compilada desde `dist/server.js`.

```bash
npm run test
```

Ejecuta la suite de pruebas unitarias con Jest.

## Pruebas

Ejecutar todas las pruebas:

```bash
npm run test
```

Las pruebas cubren utilidades de matrices, servicios de estadísticas, configuración JWT y componentes de soporte.

## Docker

Construir la imagen:

```bash
docker build -t node-api .
```

Ejecutar el contenedor:

```bash
docker run -p 8080:8080 --env-file .env node-api
```

Asegúrate de que `DATABASE_URL` apunte a una base de datos accesible desde el contenedor. En desarrollo local con Docker puede ser necesario usar `host.docker.internal` para alcanzar el PostgreSQL del host.

El `Dockerfile` usa una construcción multi-stage: primero instala dependencias, genera Prisma y compila TypeScript; luego crea una imagen final con dependencias de producción y los archivos compilados.

## Arquitectura y patrón usado

El proyecto está estructurado con principios de Clean Architecture y Domain-Driven Design. Esta arquitectura divide responsabilidades en capas:

- `domain`: lógica de negocio central, entidades, DTOs, errores e interfaces.
- `infrastucture`: implementaciones concretas de interfaces del dominio, como datasources, repositorios y mappers.
- `presentation`: punto de entrada HTTP, rutas, controladores y middlewares.
- `data`: configuración de persistencia y conexión a PostgreSQL.
- `services`: servicios de aplicación, como cálculo de estadísticas.
- `config`: adaptadores y configuración transversal, como JWT, bcrypt, logger y variables de entorno.
- `utils`: utilidades y validadores compartidos.

Este enfoque permite que el código sea testeable, desacoplado y fácil de mantener.

## Estructura del proyecto

```text
src/
  app.ts                         Configuración principal de Express
  server.ts                      Punto de entrada del servidor
  config/                        Configuración transversal
  data/postgres/                 Conexión con PostgreSQL
  domain/                        Entidades, DTOs, errores e interfaces
  infrastucture/                 Implementaciones de datasources y repositorios
  presentation/                  Rutas, controladores y middlewares HTTP
  services/                      Servicios de aplicación
  utils/                         Utilidades y validadores
prisma/
  schema.prisma                  Modelo de datos de Prisma
  migrations/                    Migraciones de base de datos
```

## Convenciones de código

- Lenguaje principal: TypeScript.
- Variables y funciones: `camelCase`, por ejemplo `errorMiddleware`, `startServer`.
- Clases, interfaces y tipos: `PascalCase`, por ejemplo `ServerApp`, `PostgresDatabase`, `UserEntity`.
- Constantes de entorno: `UPPER_SNAKE_CASE`, por ejemplo `DATABASE_URL`, `SEED_JWT`.
- Archivos: nombres descriptivos en minúsculas, separados por punto cuando expresan responsabilidad, por ejemplo `error.middleware.ts` y `statistics.service.ts`.
- Tipado fuerte: uso intensivo de TypeScript para prevenir errores en tiempo de ejecución.
- Comentarios: documentación JSDoc en español para módulos, clases o funciones donde aporta contexto.
