/* eslint-disable prettier/prettier */
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Parqueadero } from './parqueadero.entitie';
import { Vehiculo } from './vehiculo.entitie';

@Entity()
export class Historial extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'fecha_ingreso' })
  fechaIngreso: Date;

  @Column({ name: 'fecha_salida' })
  fechaSalida: Date;

  @Column({ name: 'duracion_segundos', nullable: true })
  duracionSegundos: number;

  @ManyToOne(() => Vehiculo, (vehiculo) => vehiculo.historial, {
    eager: true,
  })
  @JoinColumn({ name: 'placa_vehiculo', referencedColumnName: 'placa' })
  vehiculo: Vehiculo;

  @ManyToOne(() => Parqueadero, (parqueadero) => parqueadero.historial)
  @JoinColumn([{ name: 'parqueadero_id', referencedColumnName: 'id' }])
  parqueadero: Parqueadero;

  // constructor(
  //   id: number,
  //   fechaIngreso: Date,
  //   fechaSalida: Date,
  //   duracionSegundos: number,
  //   vehiculo: Vehiculo,
  //   parqueadero: Parqueadero
  // ) {
  //   this.id = id;
  //   this.fechaIngreso = fechaIngreso;
  //   this.fechaSalida = fechaSalida;
  //   this.duracionSegundos = duracionSegundos;
  //   this.vehiculo = vehiculo;
  //   this.parqueadero = parqueadero;
  // }
}
