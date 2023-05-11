/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-useless-constructor */
/* eslint-disable prettier/prettier */
/* eslint-disable simple-import-sort/imports */

//import sequelize from '../configuration/sequelize';
import { Usuario, Rol } from '../entities/Usuario.entitie';

import * as bcrypt from 'bcrypt';

import { Request } from 'express';

import boom from '@hapi/boom';
//import { DataSource } from 'typeorm';

import ParqueaderoService from './parqueadero.service';
import { Parqueadero } from '../entities/parqueadero.entitie';

const parqueaderoService = new ParqueaderoService();

class UsuariosService {
  // constructor() {
  //   super();
  //   //this.parqueaderos = [];
  // }

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

  async findUsuarioByCorreo(correo: string): Promise<Usuario | null> {
    // optener el password del usuario
    const usuario = await Usuario.findOne({
      where: { correo },
    });

    return usuario;
  }

  // buscar un usuario por id y rol
  async findUsuarioByIdAndRol(
    idUsuario: number,
    rol: Rol
  ): Promise<Usuario | null> {
    const usuario = await Usuario.findOne({
      where: { id: idUsuario, rol },
    });

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
    usuario.parqueaderos = [];

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
      where: { id: idParqueadero },
      relations: ['usuario'],
    });
    console.log(`Este es el parqueadero: `, parqueadero1);
    if (parqueadero1?.usuario !== null) {
      // el parqueadero ya está asociado a un usuario
      throw boom.badRequest('El parqueadero ya esta asignado a otro usuario', {
        idUsuario,
      });
    }

    parqueadero.usuario = usuario;
    await parqueadero.save();
    //parqueadero.vehiculos = [];

    //usuario.parqueaderos.push(parqueadero);
    //console.log(`Este es el usuario: `, usuario);
    //console.log(`parqueaderos del socio: `, usuario.parqueaderos.length);

    //usuario.addParqueadero(parqueadero);
    //console.log(`Este es el usuario: `, usuario);
    //console.log(`parqueaderos del socio: `, usuario.parqueaderos.length);
    //await usuario.save();
  }

  // Socio crea usuario con el rol de empleado
  async createUsuarioEmpleado(
    req: Request,
    usuario: Usuario
  ): Promise<Usuario> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access

    const user = req.user as Usuario;

    //const id = user.sub as number;

    const jefe = await this.getUsuarioById(user.id);
    console.log(`Este es el jefe logueado: `, jefe);

    const hash = await bcrypt.hash(usuario.password, 10);
    const usuarioNuevo = new Usuario();
    usuarioNuevo.nombre = usuario.nombre;
    usuarioNuevo.apellido = usuario.apellido;
    usuarioNuevo.correo = usuario.correo;
    usuarioNuevo.password = hash;
    usuarioNuevo.rol = Rol.empleado;
    usuarioNuevo.jefe = jefe;

    await usuarioNuevo.save();

    return usuarioNuevo;
  }
}

export default UsuariosService;
