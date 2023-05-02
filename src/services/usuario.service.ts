/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable unused-imports/no-unused-imports */
/* eslint-disable @typescript-eslint/no-useless-constructor */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable padding-line-between-statements */
/* eslint-disable simple-import-sort/imports */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable prettier/prettier */
import { QueryResult } from 'pg';
import { pool } from '../database';

import getConnection from '../configuration/postgres';

class UsuariosService {
  constructor() {
    //this.usuarios = [];
    //this.find();
  }

  create(data: any) {
    const newUsuario = {};
  }

  async find() {
    const client = await getConnection();
    const response: QueryResult = await client.query('SELECT * FROM usuario');
    return response.rows;
  }

  findOne() {}

  update() {}

  delete() {}
}

export default UsuariosService;
