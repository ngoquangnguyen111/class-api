import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StudentModule } from './students/student.module';
import { ClassModule } from './classes/class.module';
import { APP_GUARD } from '@nestjs/core';

import { StudentController } from './students/student.controller';
import { ClassesController } from './classes/class.controller';
import { RoleGuard } from './common/guards/roles/roles.guard';
@Module({
  imports: [StudentModule, ClassModule],
  controllers: [StudentController, ClassesController],
  providers: [
    AppService, { provide: APP_GUARD, useClass: RoleGuard }
  ],
})
export class AppModule { }
