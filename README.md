# Asset-Tokenization
🪙 Asset token market simulation system


## Functional Requirements

- It must be possible to register a token.
- It must be possible to list all tokens.
- It must be possible to search for a token by ID.
- It must be possible to delete a token by ID if necessary.
- It must be possible to add new tokens.
- It must be possible to register a client.
- It must be possible to list all clients.
- It must be possible to search for a client by ID.
- It must be possible to delete a client by ID if necessary.
- A client should be able to purchase a token.
- It must be possible to view the transactions with the purchased tokens, the quantity that was purchased, and the value of each transaction.


## Business Rules

- For each transaction made, a percentage of 0.4% should be added to the purchase of the next token.
- Every token should be initialized with random initial values and quantities, with values ranging from 0 to 200,000 and quantities ranging from 0 to 500.


## Development

To run the code in development mode, you need to have the following technologies installed:

- Node.js
- TypeScript
- Fastify
- Knex
- Sqlite
- Zod

### Follow these steps:

- Clone the repository.
- Install the dependencies using npm install.
- Run the TypeScript compiler in watch mode using npm run dev.
- And the server will already be running
- Use some tool to make requests and visualize them like postman and insomnia


## 🤝 Contributors
We want to thank the following people who contributed to this project:

Diogo-gallina: https://github.com/Diogo-gallina
