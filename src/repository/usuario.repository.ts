/* eslint-disable prettier/prettier */

//import { Repository } from 'typeorm';

import boom from '@hapi/boom';

import { Rol, Usuario } from '../entities/Usuario.entitie';

class UsuarioRepository extends Usuario {
  async getUsuarios(): Promise<Usuario[]> {
    const usuario = await Usuario.find();

    return usuario;
  }

  async getUsuarioById(idUsuario: number): Promise<Usuario | null> {
    const usuario = await Usuario.findOne({
      where: { id: idUsuario },
      relations: ['jefe'],
    });

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
}

export default UsuarioRepository;
