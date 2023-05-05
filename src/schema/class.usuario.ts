/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable prettier/prettier */
const date = new Date();

date.getHours();
date.getTime();

class Usuario {
  nombre: String;
  apellido: String;
  correo: String;
  password: String;

  constructor(
    nombre: String,
    apellido: String,
    correo: String,
    password: String
  ) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.correo = correo;
    this.password = password;
  }
}
