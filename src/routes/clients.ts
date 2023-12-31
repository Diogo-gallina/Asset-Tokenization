import { FastifyInstance } from "fastify";
import { z } from "zod";

import { randomUUID } from "node:crypto";
import { knex } from "../database";

export async function clientsRoutes(app: FastifyInstance){

    app.get('/', async () => {
        const clients = await knex('clients').select()

        return { clients }
    })

    app.get('/:id', async (request) => {
        const getClientsParamsSchema = z.object({
            id: z.string().uuid(),
        });

        const { id } = getClientsParamsSchema.parse(request.params);

        const client = await knex('clients')
            .where('id', id)
            .first()
        
        return { client }
    });

    app.post('/', async (request, reply) => {

        const createToken = z.object({
            name: z.string(),
            cpf: z.string(),
            balance: z.number()
        });
        
        const {
            name,
            cpf,
            balance,
        } = createToken.parse(request.body);

        await knex('clients').insert({
            id: randomUUID(),
            name,
            cpf,
            balance,
        });

        return reply.status(201).send();
    });


    app.delete('/:id', async (request, reply) => {
        const getClientsParamsSchema = z.object({
            id: z.string().uuid()
        });

        const { id } = getClientsParamsSchema.parse(request.params);

        await knex('clients')
            .where('id', id)
            .delete()

        return reply.status(204).send();
    })
}