// /* eslint-disable prettier/prettier */
// import { Usuario } from '../../entities/Usuario.entitie';

// import { AuthService } from '../services/auth.service';

// import { Strategy as LocalStrategy, VerifyFunction } from 'passport-local';
// import { PassPortUse } from '../utils/passport.use';

// const authService: AuthService = new AuthService();

// export class LoginStrategy {
//   async validate(
//     username: string,
//     password: string,
//     done: any
//   ): Promise<Usuario> {
//     const usuario = await authService.validateUser(username, password);
//     if (!usuario) {
//       return done(null, false, { message: 'Usuario o contraseña incorrecta' });
//     }
//     return done(null, usuario);
//   }

//   get use() {
//     return PassPortUse<LocalStrategy, Object, VerifyFunction>(
//       'login',
//       LocalStrategy,
//       {
//         usernameField: 'correo',
//         passwordField: 'password',
//       },
//       this.validate
//     );
//   }
// }
