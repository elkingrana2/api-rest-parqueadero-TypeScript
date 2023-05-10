// /* eslint-disable prettier/prettier */
// import * as bcrypt from 'bcrypt';
// import * as jwt from 'jsonwebtoken';

// import UsuariosService from '../../services/usuario.service';
// import { Rol, Usuario } from '../../entities/Usuario.entitie';
// import { PayloadToken } from '../interfaces/auth.interface';

// export class AuthService {
//   constructor(
//     private readonly usuarioService: UsuariosService = new UsuariosService(),
//     private readonly jwtInstance = jwt
//   ) {}

//   public async validateUser(username: string, password: string): Promise<any> {
//     const userByEmail = await this.usuarioService.findUsuarioByCorreo(username);

//     if (userByEmail) {
//       const isMatch = await bcrypt.compare(password, userByEmail.password);
//       isMatch && userByEmail;
//     }

//     return null;
//   }

//   sing(payload: jwt.JwtPayload, secret: any) {
//     return this.jwtInstance.sign(payload, secret);
//   }

//   public async generateJWT(
//     usuario: Usuario
//   ): Promise<{ accessToken: string; user: Usuario }> {
//     const userConsult = await this.usuarioService.findUsuarioByIdAndRol(
//       usuario.id,
//       usuario.rol
//     );

//     const payload: PayloadToken = {
//       rol: userConsult?.rol as Rol,
//       sub: userConsult?.id as number,
//     };

//     if (userConsult) {
//       usuario.password = 'Not Permision';
//     }

//     return {
//       accessToken: this.sing(payload, 'elkin@3000'),
//       usuario,
//     };
//   }
// }
