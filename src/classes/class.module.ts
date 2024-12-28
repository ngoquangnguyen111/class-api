import { Module } from '@nestjs/common';
import { ClassesController } from './class.controller';
import { ClassesService } from './class.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Class } from './entities/class.entity';
import { StudentModule } from 'src/students/student.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Class]), // Kết nối entity "Class" với TypeORM
    StudentModule, // Import StudentModule để quản lý quan hệ với Student
  ],
  controllers: [ClassesController],
  providers: [ClassesService],
  exports: [ClassesService],
})
export class ClassModule {}