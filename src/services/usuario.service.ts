/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-useless-constructor */
/* eslint-disable prettier/prettier */
/* eslint-disable simple-import-sort/imports */

//import sequelize from '../configuration/sequelize';
import { Usuario, Rol } from '../entities/Usuario.entitie';

import bcrypt from 'bcrypt';

import boom from '@hapi/boom';
//import { DataSource } from 'typeorm';

import ParqueaderoService from './parqueadero.service';
import { Parqueadero } from '../entities/parqueadero.entitie';

const parqueaderoService = new ParqueaderoService();

class UsuariosService {
  constructor() {
    //this.usuarios = [];
    //this.find();
  }

  async getUsuarios(): Promise<Usuario[]> {
    const usuario = Usuario.find();

    return usuario;
  }

  async getUsuarioById(idUsuario: number): Promise<Usuario> {
    const usuario = await Usuario.findOne({
      where: { id: idUsuario },
      relations: ['jefe'],
    });
    //const usuario = await Usuario.findOneBy({ id: idUsuario });
    if (!usuario) {
      throw boom.notFound('Usuario no encontrado', { idUsuario });
    }

    return usuario;
  }

  async createUsuario(
    nombre: string,
    apellido: string,
    correo: string,
    password: string
  ): Promise<Usuario> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    const hash = await bcrypt.hash(password, 10);
    const usuario = new Usuario();
    usuario.nombre = nombre;
    usuario.apellido = apellido;
    usuario.correo = correo;
    usuario.password = hash;
    usuario.rol = Rol.socio;

    await usuario.save();

    return usuario;
  }

  async updateUsuario(idUsuario: number, usuario: Usuario): Promise<Usuario> {
    // busco el usaurio por id
    const usuarioExistente = await this.getUsuarioById(idUsuario);

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
    const hash = await bcrypt.hash(usuario.password, 10);

    usuarioExistente.nombre = usuario.nombre;
    usuarioExistente.apellido = usuario.apellido;
    usuarioExistente.correo = usuario.correo;
    usuarioExistente.password = hash;

    await usuarioExistente.save();

    return usuarioExistente;
  }

  async deleteUsuario(idUsuario: number): Promise<void> {
    const usuario = await this.getUsuarioById(idUsuario);
    await usuario.remove();
  }

  async agregarParqueaderoSocio(
    idUsuario: number,
    idParqueadero: number
  ): Promise<Usuario | void> {
    const usuario = await this.getUsuarioById(idUsuario);
    const parqueadero = await parqueaderoService.getParqueaderoById(
      idParqueadero
    );

    if (usuario.rol !== Rol.socio) {
      throw boom.badRequest(
        'El usuario no es un socio, no se le puede asignar un parqueadero',
        { idUsuario }
      );
    }

    // // verificar si ese parqueadero ya esta asignado al usuario
    // if (parqueadero.usuario === usuario) {
    //   throw boom.badRequest('El parqueadero ya esta asignado al usuario', {
    //     idUsuario,
    //   });
    // }

    // //verificar si el parqueadero ya esta asignado a otro usuario
    // if (parqueadero.usuario != null) {
    //   throw boom.badRequest('El parqueadero ya esta asignado a otro usuario', {
    //     idUsuario,
    //   });
    // }

    const parqueadero1 = await Parqueadero.findOne({
      where: { id: 1 },
      relations: ['usuario'],
    });
    if (parqueadero1) {
      // el parqueadero ya está asociado a un usuario
      throw boom.badRequest('El parqueadero ya esta asignado a otro usuario', {
        idUsuario,
      });
    }

    parqueadero.usuario = usuario;
    await parqueadero.save();
  }
}

export default UsuariosService;
