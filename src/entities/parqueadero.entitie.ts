/* eslint-disable prettier/prettier */
import {
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
export class Parqueadero {
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
  usuario: Usuario;

  @OneToMany(() => Vehiculo, (vehiculo) => vehiculo.parqueadero, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  vehiculos: Vehiculo[];

  @OneToMany(() => Historial, (historial) => historial.parqueadero)
  historial: Historial[];

  // Implementacion de Soft Delete
  @Column({ default: false })
  eliminado: boolean;

  constructor(
    nombre: string,
    direccion: string,
    capacidad: number,
    usuario: Usuario
  ) {
    this.nombre = nombre;
    this.direccion = direccion;
    this.capacidad = capacidad;
    this.usuario = usuario;
  }

  addVehiculo(vehiculo: Vehiculo): void {
    this.vehiculos.push(vehiculo);
    vehiculo.parqueadero = this;
  }
}
