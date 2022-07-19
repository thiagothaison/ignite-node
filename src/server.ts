import express from "express";

import { categoryRoutes } from "~/cars/routes/category.routes";

const app = express();

app.use(express.json());

app.use("/categories", categoryRoutes);

app.listen(3333, () => console.log("Server is running 🔥"));
