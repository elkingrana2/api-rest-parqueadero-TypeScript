// /* eslint-disable prettier/prettier */
// import boom from '@hapi/boom';
// import * as bcrypt from 'bcrypt';
// import { Strategy } from 'passport-local';

// import UsuariosService from '../../../services/usuario.service';

// const service = new UsuariosService();

// const LocalStrategy = new Strategy(
//   {
//     usernameField: 'email',
//     passwordField: 'password',
//   },
//   async (correo: string, password: string, done: any) => {
//     try {
//       const user = await service.findUsuarioByCorreo(correo);
//       if (!user) {
//         done(boom.unauthorized(), false);

//         return;
//       }
//       const isMatch = await bcrypt.compare(password, user.password);
//       if (!isMatch) {
//         done(boom.unauthorized(), false);

//         return;
//       }
//       done(null, user);
//     } catch (error) {
//       done(error, false);
//     }
//   }
// );

// export default LocalStrategy;

// // export default class LocalStrategy extends Strategy {
// //   constructor() {
// //     super(
// //       { usernameField: 'correo', passwordField: 'password' },
// //       async (correo: string, password: string, done) => {
// //         try {
// //           const user = await service.findUsuarioByCorreo(correo);
// //           if (!user) {
// //             done(boom.unauthorized(), false);

// //             return;
// //           }
// //           const isMatch = await bcrypt.compare(password, user.password);
// //           if (!isMatch) {
// //             done(boom.unauthorized(), false);

// //             return;
// //           }
// //           done(null, user);
// //         } catch (error) {
// //           done(error, false);
// //         }
// //       }
// //     );
// //   }
// // }
