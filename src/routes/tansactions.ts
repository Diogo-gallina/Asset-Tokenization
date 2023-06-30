import { FastifyInstance } from "fastify";
import { knex } from "../database";
import { z } from "zod";
import { checkClientId, checkTokenId, updateBalance, updateToken, insertTransaction } from "../utils/TokenValidate";
import { randomUUID } from "crypto";

export async function transactionsRoutes(app: FastifyInstance) {

  app.get('/', async () => {
    const transaction = await knex('tokens_purchase').select()

    return { transaction }
  })

  app.post("/", async (request, reply) => {
    const createToken = z.object({
      client_id: z.string().uuid(),
      token_id: z.string().uuid(),
      quantity: z.number(),
      value: z.number().default(0)
    });

    const { client_id, token_id, quantity, value } = createToken.parse(request.body);

    await checkClientId(client_id);
    await checkTokenId(token_id);

    const balanceClient = await knex('clients')
      .select('balance')
      .where('id', client_id)
      .first()

      const tokenData = await knex('tokens')
      .select('value', 'quantity')
      .where('id', token_id)
      .first()

    let balance = balanceClient?.balance;
    let valueToken = tokenData?.value;
    let quantityToken = tokenData?.quantity;

    let totalPurchaseValue: number = 0;
   
    try {
      if (
        valueToken !== undefined &&
        balance !== undefined &&
        quantityToken !== undefined &&
        quantityToken >= quantity
      ) {
        for (let i = 0; i < quantity; i++) {
          const tokenDataUpdate = await knex('tokens')
            .select('value', 'quantity')
            .where('id', token_id)
            .first()

          let valueTokenIncrement = tokenDataUpdate?.value;

          const newTokenId = randomUUID();


          if ( valueToken> balance) {
            console.log('insufficient funds.');
            return reply.status(400).send('Insufficient funds.');
          } else {
            console.log('sufficient funds!');

            const updatedBalance = balance - totalPurchaseValue;
            quantityToken -= 1;
            let updateValueToken: number = valueTokenIncrement !== undefined ? valueTokenIncrement * 1.004 : 0;

            await knex('tokens')
              .where('id', token_id)
              .update({
                
                'quantity': quantityToken
              })

            console.log(updatedBalance);

            await updateBalance(client_id, parseFloat(updatedBalance.toFixed(2)));
            await updateToken(token_id, quantityToken, parseFloat(updateValueToken.toFixed(2)));
            await insertTransaction(client_id, newTokenId, 1,parseFloat(updateValueToken.toFixed(2)));
          }
        }
      } else {
        console.log('Invalid data received.');
        return reply.status(400).send('Invalid data received.');
      }
    } catch (error) {
      console.error('Error:', error);
      return reply.status(500).send('Internal Server Error');
    }

    return reply.status(201).send();
  });

  app.delete("/", async (request, reply) => {

    await knex('tokens_purchase').delete();

    return reply.status(201).send();
  });

}
