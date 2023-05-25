/* eslint-disable prettier/prettier */
const options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Parqueaderos3mil',
      version: '1.0.0',
      description: 'API rest para el control de parqueaderos',
    },
    servers: [
      {
        url: 'http://localhost:3000', // Cambia la URL base según tu configuración
      },
    ],
  },
  apis: ['../routes/*.ts'], // Ruta de tus archivos de definición de rutas
};

module.exports = options;
