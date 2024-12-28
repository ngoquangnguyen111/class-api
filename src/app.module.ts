import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StudentModule } from './students/student.module';
import { ClassModule } from './classes/class.module';
import { APP_GUARD, Reflector } from '@nestjs/core';

import { StudentController } from './students/student.controller';
import { ClassesController } from './classes/class.controller';
import { RoleGuard } from './common/guards/roles/roles.guard';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { DBConfigModule } from './config/db.config';
import { EnvConfigModule } from './config/env.config';
import dataSourceConfig from './config/typeorm.config';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
    }),
    DBConfigModule, // Chứa cấu hình DB
    EnvConfigModule, // Chứa cấu hình môi trường
    TypeOrmModule.forRoot(dataSourceConfig.options), // Sử dụng DataSource đã cấu hình
    StudentModule, // Module Student
    ClassModule, // Module Class
  ],
  controllers: [StudentController, ClassesController],
  providers: [
    AppService, 
    Reflector,
    { provide: APP_GUARD, useClass: RoleGuard }
  ],
})
export class AppModule { }
