# API de Tareas

API REST desarrollada con Express y Firebase que permite gestionar tareas por usuario autenticado. Incluye endpoints para autenticación por email, y gestión completa de tareas protegidas por token.

## Requisitos

Asegurate de tener instalado lo siguiente:

[![Node.js](https://img.shields.io/badge/Node.js-v22.x-brightgreen)](https://nodejs.org/)
[![Firebase CLI](https://img.shields.io/badge/Firebase%20CLI-v14.x-yellow)](https://firebase.google.com/docs/cli)
[![Firestore](https://img.shields.io/badge/Firestore-Emulador%20o%20Producción-orange)](https://firebase.google.com/docs/firestore)
[![Auth](https://img.shields.io/badge/Firebase%20Auth-Custom%20Token-blue)](https://firebase.google.com/docs/auth)

Además, necesitas tener configurado previamente el archivo `firebase.json` y `.firebaserc` en el proyecto para poder hacer deploy.

## Instalación

1. Cloná el repositorio en tu máquina local:

   ```bash
   git clone https://github.com/matigaleanodev/api-tareas
   cd api-tareas/functions
   ```

2. Instalá las dependencias:

   ```bash
   npm install
   ```

3. Configurá las variables de entorno en un archivo `.env` dentro de `functions/`:

   ```env
   PROJECT_ID=mi-proyecto-firebase
   CLIENT_EMAIL=client_email
   PRIVATE_KEY=private_key
   ```

   Datos provenientes del archivo `serviceAccountKey.json` descargado desde Firebase Console.

4. Para desarrollo local, podés correr:

   ```bash
   npm run serve
   ```

   Esto iniciará la función emulada localmente. Las funciones deben probarse utilizando la URL generada por el emulador de Firebase, por ejemplo:

   ```bash
   +  functions[us-central1-api]: http function initialized (http://localhost:5001/mi-proyecto/us-central1/api)
   +  functions[us-central1-hello]: http function initialized (http://localhost:5001/mi-proyecto/us-central1/hello)
   ```

   Se puede ingresar a la consola del emulador en `http://localhost:4000`.

5. Para desplegar a Firebase Functions:

   ```bash
   firebase deploy --only functions
   ```

## Endpoints

Todos los endpoints están protegidos mediante token JWT personalizado de Firebase.

### `POST /auth`

Autentica un usuario por email. Si no existe, devuelve error con `needsConfirmation`.

**Body:**

```json
{
  "email": "ejemplo@correo.com"
}
```

**Respuestas:**

- `200 OK`: Devuelve el token si el usuario existe.
- `404 Not Found`: Devuelve `{ message, needsConfirmation: true }` si el usuario no existe.
- `400 Bad Request`: Si falta el email.

---

### `POST /auth/confirm`

Confirma el registro de un usuario y devuelve su token.

**Body:**

```json
{
  "email": "ejemplo@correo.com"
}
```

---

### `GET /tasks`

Devuelve las tareas del usuario autenticado.

**Headers:**

```http
Authorization: Bearer <token>
```

---

### `POST /tasks`

Crea una nueva tarea.

**Body:**

```json
{
  "title": "Mi nueva tarea",
  "description": "esta es una nueva tarea"
}
```

---

### `PUT /tasks/:id`

Actualiza una tarea existente.

---

### `DELETE /tasks/:id`

Elimina una tarea.

---

## Funcionalidades

- ✅ Autenticación por email sin contraseña (custom token).
- ✅ Creación, listado, edición y eliminación de tareas.
- ✅ Protección por usuario (cada uno accede solo a sus tareas).
- ✅ Desplegado en Firebase Cloud Functions.

## Despliegue

```bash
firebase deploy --only functions
```

---

> Proyecto creado por [Matias Galeano](https://github.com/matigaleanodev) 🚀
