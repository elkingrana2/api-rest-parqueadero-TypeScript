/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable no-console */
/* eslint-disable prettier/prettier */
import axios, { AxiosError } from 'axios';

interface ApiResponse<T> {
  data: T | null;
  error: AxiosError | null;
}

interface ResponseData {
  // Definir la estructura de datos de la respuesta
  email: string;
  mensaje: string;
  placa: string;
  idParqueadero: number;
  // ...
}

export async function post(
  url: string,
  body: unknown
): Promise<Response | void> {
  try {
    const response = await axios.post(url, body);
    //console.log(`Esta es la respuesta: `, response);
    //console.log(`Esta es la data de la respuesta: `, response.data);

    return response.data;
  } catch (error) {
    console.log(error);
  }
}
