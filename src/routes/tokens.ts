import { FastifyInstance } from "fastify";
import { z } from "zod";
import { randomUUID } from "node:crypto";

import { Token } from "../models/Token";
import { knex } from "../database";

export async function tokensRoutes(app: FastifyInstance) {
  app.get("/", async () => {
    const tokens = await knex("tokens").select();

    return { tokens };
  });

  app.get("/:id", async (request) => {
    const getTokensParamsSchema = z.object({
      id: z.string().uuid(),
    });

    const { id } = getTokensParamsSchema.parse(request.params);

    const token = await knex("tokens").where("id", id).first();

    return { token };
  });

  app.post("/", async (request, reply) => {
    const getTokensParamsSchema = z.object({
      name: z.string(),
    });

    const { name } = getTokensParamsSchema.parse(request.body);

    await knex("tokens").insert({
      id: randomUUID(),
      name,
      value: Token.InitialRandomValue(),
      quantity: Token.InitialRandomQuantity(),
    });

    return reply.status(201).send();
  });

  app.delete("/:id", async (request, reply) => {
    const getTokensParamsSchema = z.object({
      id: z.string().uuid(),
    });

    const { id } = getTokensParamsSchema.parse(request.params);

    await knex("tokens").where("id", id).delete();

    return reply.status(204).send();
  });
}
