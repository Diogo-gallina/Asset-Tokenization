import { FastifyInstance } from "fastify";
import { knex } from "../database";
import { z } from "zod";
import { randomUUID } from "crypto";

export async function tokensRoutes(app: FastifyInstance){

    app.get('/', async () => {
        const tokens = await knex('tokens').select()

        return { tokens }
    })

    app.get('/:id', async (request) => {
        const getTokensParamsSchema = z.object({
            id: z.string().uuid(),
        });

        const { id } = getTokensParamsSchema.parse(request.params);

        const token = await knex('tokens')
            .where('id', id)
            .first()
        
        return { token }
    });

//

    app.post('/', async (request, reply) => {

        const createToken = z.object({
            name: z.string()
        });
        
        const {
            name
        } = createToken.parse(request.body);

        const randomValue = (Math.random() * 200000).toFixed(2);
        const randomValueNumber = parseFloat(randomValue);

        const randomQuantity = Math.floor(Math.random() * 200000) + 1;

        await knex('tokens').insert({
            id: randomUUID(),
            name,
            value: randomValueNumber,
            quantity: randomQuantity
            
          });
        
        return reply.status(201).send();

    });



    app.patch('/', async (request, reply) => {

    });

//

    app.delete('/:id', async (request, reply) => {
        const getTokensParamsSchema = z.object({
            id: z.string().uuid()
        });

        const { id } = getTokensParamsSchema.parse(request.params);

        await knex('tokens')
            .where('id', id)
            .delete()

        return reply.status(201).send();
    })
}