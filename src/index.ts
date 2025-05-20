import { https } from "firebase-functions";
import { apiTareas } from "./api/app";

export const api = https.onRequest(apiTareas);

export const hello = https.onRequest((req, res) => {
  res.send("Hello World!");
});
