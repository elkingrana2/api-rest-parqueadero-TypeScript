/* eslint-disable prettier/prettier */
/* eslint-disable no-console */
import 'reflect-metadata';

import app from './app';
import { AppDataSource } from './configuration/db';
// Connect to database
async function main() {
  try {
    await AppDataSource.initialize();
    console.log('Database connected');
  } catch (error) {
    console.log(error);
  }
}
void main();

/**
 * Start Express server.
 */
const server = app.listen(app.get('port'), () => {
  console.log(
    '  App is running at http://localhost:%d in %s mode',
    app.get('port'),
    app.get('env')
  );
  console.log('  Press CTRL-C to stop\n');
});

export default server;
