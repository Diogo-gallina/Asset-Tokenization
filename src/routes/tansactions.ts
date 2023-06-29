import { FastifyInstance } from "fastify";
import { knex } from "../database";
import { z } from "zod";
import { randomUUID } from "crypto";

export async function transactionsRoutes(app: FastifyInstance){

    app.post("/", async (request, reply) => {
        const createToken = z.object({
          client_id: z.string().uuid(),
          token_id: z.string().uuid(),
          quantity: z.number()
        });
    
        const { client_id, token_id, quantity } = createToken.parse(request.body);
    
        await knex('tokens_purchase').insert({
            id: randomUUID(),
            client_id,
            token_id
        });
    
        return reply.status(201).send();
      });

}