import express from "express";

import { categoryRoutes, specificationRoutes } from "./routes";

const app = express();

app.use(express.json());

app.use("/categories", categoryRoutes);
app.use("/specifications", specificationRoutes);

app.listen(3333, () => console.log("Server is running 🔥"));
