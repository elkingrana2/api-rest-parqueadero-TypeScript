/* eslint-disable prettier/prettier */
import { Rol } from '../../entities/Usuario.entitie';

export interface PayloadToken {
  rol: Rol;
  sub: number;
}
