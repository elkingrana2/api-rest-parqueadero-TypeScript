/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable prettier/prettier */
import { ExtractJwt, Strategy } from 'passport-jwt';

import config from '../../../configuration/config';

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.jwtSecret,
};

const jwtStrategy = new Strategy(options, (payload, done) => {
  done(null, payload);
});

export default jwtStrategy;
