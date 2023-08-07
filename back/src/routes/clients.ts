import { Router } from "express";
import { createClient, deleteClient, readAllClient, updateClient } from "../controllers/clients";
import validateData from "../middlewares/validateData";
import { clientSchemaPart, clientSchemaReq } from "../schemas/clients";

const clientRoutes: Router = Router();

clientRoutes.post("", validateData(clientSchemaReq), createClient);
clientRoutes.get("", readAllClient);
clientRoutes.patch("/:id", validateData(clientSchemaPart), updateClient);
clientRoutes.delete("/:id", deleteClient);

export default clientRoutes;