import "reflect-metadata";
import express from "express";
import { routes } from "./routes";

import './database/connection'


const app = express();

app.use(express.json());

app.use(routes);

app.listen(3000, () => console.log("Server is running"));
