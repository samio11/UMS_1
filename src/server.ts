import { Server } from 'http';
import app from './app';
import mongoose from 'mongoose';
import config from './app/config';

let server: Server;

async function main() {
  try {
    await mongoose.connect(config.database as string);
    server = app.listen(config.port, () => {
      console.log(`server at:-${config.port}`);
    });
  } catch (err) {
    console.log(err);
  }
}

main();

// process.on('unhandledRejection', () => {
//   console.log(`Server is turning off bcz unhandled Rejection`);
//   if (server) {
//     server.close(() => {
//       process.exit(1);
//     });
//   }
//   process.exit(1);
// });

// process.on('uncaughtException', () => {
//   console.log(`Server is turning off bcz unhandled Exception`);
//   process.exit(1);
// });
