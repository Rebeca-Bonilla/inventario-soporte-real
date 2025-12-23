import { Elysia } from "elysia";
import { inventoryApi } from "./src/inventory/inventory.api";

const app = new Elysia()
  .use(inventoryApi)
  .get("/", () => ({
    status: "ok",
    message: "Backend Inventario funcionando 🚀",
  }))
  .listen(3000);

console.log("🟢 Backend corriendo en http://localhost:3000");
