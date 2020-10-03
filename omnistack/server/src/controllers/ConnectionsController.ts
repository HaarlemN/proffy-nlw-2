import { Request, Response } from 'express';
import knex from '../database/connection';

class ConnectionsController {
  async index(request: Request, response: Response) {
    const connections = await knex('connections').count('* as total');

    const { total } = connections[0];

    return response.json({ total });
  }
  
  async store(request: Request, response: Response) {
    const { user_id } = request.body;

    await knex('connections').insert({
      user_id,
    })

    return response.status(201).send();
  }
}

export default ConnectionsController;
