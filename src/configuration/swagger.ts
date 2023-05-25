/* eslint-disable prettier/prettier */
import swaggerJSDoc, { OAS3Definition, OAS3Options } from 'swagger-jsdoc';

const swaggerDefinition: OAS3Definition = {
  openapi: '3.0.0',
  info: {
    title: 'Parqueaderos3mil',
    version: '1.0.0',
    description: 'API rest para el control de parqueaderos',
  },
  servers: [
    {
      url: 'http://localhost:3000',
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
      },
    },
    schemas: {
      usuario: {
        type: 'object',
        required: ['nombre', 'apellido', 'correo', 'password'],
        properties: {
          nombre: {
            type: 'string',
            example: 'Elkin',
          },
          apellido: {
            type: 'string',
            example: 'Granados',
          },
          correo: {
            type: 'string',
            example: 'mail@mail.com',
          },
          password: {
            type: 'string',
            example: '123456',
          },
        },
      },
    },
  },
};

const swaggerOptions: OAS3Options = {
  swaggerDefinition,
  apis: ['./src/routes/*.ts'],
};

export default swaggerJSDoc(swaggerOptions);

// /* eslint-disable prettier/prettier */
// import { Router } from 'express';
// import swaggerUi from 'swagger-ui-express';

// import specs from '../configuration/swagger.config';

// const router = Router();

// router.use('/', swaggerUi.serve)
// router.get('/', swaggerUi.setup(specs));

// export default router;
