import "reflect-metadata";
import './database/connection'
import express from "express";
import { routes } from "./routes";

const app = express();

app.use(express.json());
app.use(routes);

app.listen(3000, () => console.log("Server is runnig in port 3000"));