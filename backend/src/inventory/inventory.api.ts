import { Elysia } from "elysia";

export const inventoryApi = new Elysia({ prefix: "/inventory" })

  // GET /inventory
  .get("/", () => {
    return {
      status: "ok",
      data: [],
      message: "Inventario obtenido correctamente"
    };
  })

  // POST /inventory
  .post("/", ({ body }) => {
    return {
      status: "ok",
      message: "Producto agregado",
      producto: body
    };
  });
