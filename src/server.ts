/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable prettier/prettier */
/* eslint-disable no-console */
import 'reflect-metadata';

import * as bcrypt from 'bcrypt';

import app from './app';
import { AppDataSource } from './configuration/db';
import { Rol, Usuario } from './entities/Usuario.entitie';
// Connect to database
async function main() {
  try {
    await AppDataSource.initialize();
    console.log('Database connected');

    const usuario = new Usuario();
    const pass = 'admin';

    const admin = await Usuario.findOne({
      where: { correo: 'admin@mail.com' },
    });

    if (!admin) {
      const hash = await bcrypt.hash(pass, 10);
      usuario.correo = 'admin@mail.com';
      //usuario.password = 'admin';
      usuario.password = hash;
      usuario.rol = Rol.admin;
      usuario.nombre = 'admin';
      usuario.apellido = 'admin';
      await usuario.save();
    }
  } catch (error) {
    console.log(error);
  }
}
void main();

/**
 * Start Express server.
 */
const server = app.listen(app.get('port'), () => {
  console.log(
    '  App is running at http://localhost:%d in %s mode',
    app.get('port'),
    app.get('env')
  );
  console.log('  Press CTRL-C to stop\n');
});

export default server;
