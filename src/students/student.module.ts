import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClassModule } from 'src/classes/class.module';
import { StudentService } from './student.service';
import { StudentController } from './student.controller';
import { Student } from './entities/student.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Student]), // Kết nối entity Student
    forwardRef(() => ClassModule), // Đảm bảo xử lý mối quan hệ vòng lặp nếu có
  ],
  controllers: [StudentController],
  providers: [StudentService],
  exports: [StudentService], // Xuất để các module khác sử dụng
})
export class StudentModule {}