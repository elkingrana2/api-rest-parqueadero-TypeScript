/* eslint-disable prettier/prettier */
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Historial } from './historial.entitie';
import { Usuario } from './Usuario.entitie';
import { Vehiculo } from './vehiculo.entitie';

@Entity()
export class Parqueadero extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  direccion: string;

  @Column()
  capacidad: number;

  @Column()
  espacioDisponible: number;

  @ManyToOne(() => Usuario, (usuario) => usuario.parqueaderos)
  usuario: Usuario | null;

  @OneToMany(() => Vehiculo, (vehiculo) => vehiculo.parqueadero, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  vehiculos: Vehiculo[];

  @OneToMany(() => Historial, (historial) => historial.parqueadero)
  historial: Historial[];

  // Implementacion de Soft Delete
  @Column({ default: false, select: false })
  eliminado: boolean;

  // constructor() {
  //   super();
  //   //this.vehiculos = [];
  // }

  addVehiculo(vehiculo: Vehiculo): void {
    this.vehiculos.push(vehiculo);
    vehiculo.parqueadero = this;
  }
}
