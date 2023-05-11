/* eslint-disable prettier/prettier */
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';

import { Historial } from './historial.entitie';
import { Parqueadero } from './parqueadero.entitie';

@Entity()
export class Vehiculo extends BaseEntity {
  @PrimaryColumn({ name: 'placa', length: 6 })
  placa: string;

  @Column({ name: 'modelo' })
  modelo: string;

  @Column({ name: 'color' })
  color: string;

  @Column({ name: 'fecha_ingreso', type: 'timestamp', nullable: true })
  fechaIngreso: Date | null;

  @Column({ name: 'fecha_salida', type: 'timestamp', nullable: true })
  fechaSalida: Date | null;

  @ManyToOne((type) => Parqueadero, (parqueadero) => parqueadero.vehiculos)
  parqueadero: Parqueadero | null;

  @OneToMany((type) => Historial, (historial) => historial.vehiculo, {
    cascade: true,
  })
  historial: Historial[];

  addHistorial(historial: Historial): void {
    this.historial.push(historial);
    historial.vehiculo = this;
  }
}
