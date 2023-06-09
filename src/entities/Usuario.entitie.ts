/* eslint-disable no-use-before-define */
/* eslint-disable prettier/prettier */
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Parqueadero } from './parqueadero.entitie';

export enum Rol {
  admin = 'ADMIN',
  socio = 'SOCIO',
  empleado = 'EMPLEADO',
}

@Entity()
export class Usuario extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  apellido: string;

  @Column({ unique: true })
  correo: string;

  @Column()
  password: string;

  @Column()
  rol: Rol;

  @OneToMany(() => Parqueadero, (parqueadero) => parqueadero.usuario, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  parqueaderos: Parqueadero[];

  @ManyToOne(() => Usuario, (usuario) => usuario.empleados)
  @JoinColumn([{ name: 'jefe_id', referencedColumnName: 'id' }])
  jefe: Usuario;

  @OneToMany(() => Usuario, (usuario) => usuario.jefe)
  empleados: Usuario[];

  @Column({ default: false, select: false })
  eliminado: boolean;

  // constructor() {
  //   super();
  //   this.parqueaderos = [];
  // }

  getParqueaderos(): Parqueadero[] {
    return this.parqueaderos;
  }

  addParqueadero(parqueadero: Parqueadero): void {
    this.parqueaderos.push(parqueadero);
    parqueadero.usuario = this;
  }
}
