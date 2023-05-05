/* eslint-disable @typescript-eslint/no-useless-constructor */
/* eslint-disable prettier/prettier */
/* eslint-disable simple-import-sort/imports */

//import sequelize from '../configuration/sequelize';
import { Usuario, Rol } from '../entities/Usuario.entitie';

import boom from '@hapi/boom';
//import { DataSource } from 'typeorm';

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
    const usuario = await Usuario.findOneBy({ id: idUsuario });
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
    const usuario = new Usuario();
    usuario.nombre = nombre;
    usuario.apellido = apellido;
    usuario.correo = correo;
    usuario.password = password;
    usuario.rol = Rol.socio;

    await usuario.save();

    return usuario;
  }

  async updateUsuario(idUsuario: number, usuario: Usuario): Promise<Usuario> {
    // busco el usaurio por id
    const usuarioExistente = await this.getUsuarioById(idUsuario);

    usuarioExistente.nombre = usuario.nombre;
    usuarioExistente.apellido = usuario.apellido;
    usuarioExistente.correo = usuario.correo;
    usuarioExistente.password = usuario.password;

    await usuarioExistente.save();

    return usuarioExistente;
  }

  async deleteUsuario(idUsuario: number): Promise<void> {
    const usuario = await this.getUsuarioById(idUsuario);
    await usuario.remove();
  }
}

export default UsuariosService;
