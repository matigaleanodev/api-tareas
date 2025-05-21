import { onRequest } from "firebase-functions/https";
import { apiTareas } from "./api/app";

export const api = onRequest(apiTareas);

export const hello = onRequest((req, res) => {
  res.send("Hello World!");
});
