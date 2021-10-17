import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'pguser',
  password: 'pgpassword',
  database: 'pguser',
  //classes de objetos - igual ao schema do Prisma.
  entities: [__dirname + '/../**/*.entitie.{js, ts'], //os '*' significam que ele pode pegar as entities em qualquer diretório, e qualquer arquivo que tiver .entity.js ou .ts ele reconhece como uma entitie.
  synchronize: true, //funciona como a migration do Prisma.
};
