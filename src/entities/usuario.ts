// /* eslint-disable prettier/prettier */
// import {
//   BaseEntity,
//   Column,
//   Entity,
//   JoinColumn,
//   ManyToOne,
//   PrimaryGeneratedColumn,
// } from 'typeorm';

// @Entity()
// export class Usuario extends BaseEntity {
//   @PrimaryGeneratedColumn()
//   id: number;

//   @Column()
//   nombre: string;

//   @Column()
//   apellido: string;

//   @Column({ unique: true })
//   correo: string;

//   @Column()
//   password: string;

//   @Column()
//   rol: string;

//   @ManyToOne(() => Usuario, (usuario) => usuario.id)
//   @JoinColumn({ name: 'jefe_id' })
//   jefe: Usuario;

//   @Column({ default: false })
//   eliminado: boolean;
// }
