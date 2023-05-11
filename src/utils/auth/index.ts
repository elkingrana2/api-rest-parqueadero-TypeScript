/* eslint-disable prettier/prettier */
import passport from 'passport';

import jwtStrategy from './strategies/jwt.strategy';
//import LocalStrategy from './strategies/local.strategy';

//passport.use(LocalStrategy);
passport.use(jwtStrategy);

//export default passport;
