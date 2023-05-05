/* eslint-disable prettier/prettier */
import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm';

import { Historial } from './historial.entitie';
import { Parqueadero } from './parqueadero.entitie';

@Entity()
export class Vehiculo {
  @PrimaryColumn({ name: 'placa', length: 6 })
  placa: string;

  @Column({ name: 'modelo' })
  modelo: string;

  @Column({ name: 'color' })
  color: string;

  @Column({ name: 'fecha_ingreso', type: 'timestamp' })
  fechaIngreso: Date;

  @Column({ name: 'fecha_salida', type: 'timestamp', nullable: true })
  fechaSalida?: Date;

  @ManyToOne((type) => Parqueadero, (parqueadero) => parqueadero.vehiculos)
  parqueadero: Parqueadero;

  @OneToMany((type) => Historial, (historial) => historial.vehiculo, {
    cascade: true,
  })
  historial: Historial[];

  constructor(placa: string, modelo: string, color: string) {
    this.placa = placa;
    this.modelo = modelo;
    this.color = color;
  }
}
