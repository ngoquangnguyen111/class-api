import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StudentModule } from './students/student.module';
import { ClassModule } from './classes/class.module';
import { APP_GUARD } from '@nestjs/core';
// import { RolesGuard } from './common/guards/roles/roles.guard';
import { StudentController } from './students/student.controller';
import { ClassesController } from './classes/class.controller';

@Module({
  imports: [StudentModule, ClassModule],
  controllers: [StudentController, ClassesController],
  providers: [
    AppService
  ],
})
export class AppModule { }
