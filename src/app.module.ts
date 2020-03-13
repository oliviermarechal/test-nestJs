import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import { TodosModule } from './todos/app/todos.module';
import { UsersModule } from './users/app/users.module';
import { AuthModule } from './auth/app/auth.module';
import { CustomersModule } from './customers/app/customers.module';

@Module({
  imports: [
      TypeOrmModule.forRoot({
        type: 'postgres',
        host: 'nest_postgres',
        port: 5432,
        username: 'postgres',
        password: 'nest',
        database: 'nest',
        entities: [ __dirname+"/**/entities/*{.ts,.js}", __dirname+"/**/domain/entities/*{.ts,.js}"],
        synchronize: true,
      }),
      TodosModule,
      UsersModule,
      AuthModule,
      CustomersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
