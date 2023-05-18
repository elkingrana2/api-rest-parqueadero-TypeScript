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

  @Column({ name: 'fecha_ingreso', type: 'timestamp', nullable: true })
  fechaIngreso?: Date | null;

  @Column({ name: 'fecha_salida', type: 'timestamp', nullable: true })
  fechaSalida?: Date | null;

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
}
