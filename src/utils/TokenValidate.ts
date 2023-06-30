import { knex } from "../database";
import { randomUUID } from "crypto";

export async function checkClientId(clientId: string) {
  try {
    const validateClientId = await knex('clients')
      .where('id', clientId)
      .first();

    if (validateClientId) {
      console.log('The value exists in the table.');
    } else {
      console.log('The value does not exist in the table.');
    }
  } catch (error) {
    console.error('Error checking value:', error);
  }
}

export async function checkTokenId(tokenId: string) {
  try {
    const validateTokenId = await knex('tokens')
      .where('id', tokenId)
      .first();

    if (validateTokenId) {
      console.log('The value exists in the table.');
    } else {
      console.log('The value does not exist in the table.');
    }
  } catch (error) {
    console.error('Error checking value:', error);
  }
}

export async function updateBalance(clientId: string, newBalance: number) {
  try {
    await knex('clients')
      .where('id', clientId)
      .update({ balance: newBalance });

    console.log('Balance updated:', newBalance);
  } catch (error) {
    console.error('Error updating balance:', error);
  }
}

export async function updateToken(tokenId: string, newQuantity: number, newValue: number) {
  try {
    await knex('tokens')
      .where('id', tokenId)
      .update({ 'quantity': newQuantity, 'value': newValue });

    console.log('Token updated:', tokenId);
  } catch (error) {
    console.error('Error updating token:', error);
  }
}

export async function insertTransaction(clientId: string, tokenId: string, quantity: number, value: number) {
  try {
    await knex('tokens_purchase').insert({
      id: randomUUID(),
      client_id: clientId,
      token_id: tokenId,
      quantity,
      value
    });

    console.log('Transaction inserted');
  } catch (error) {
    console.error('Error inserting transaction:', error);
  }
}
