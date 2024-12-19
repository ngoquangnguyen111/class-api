import { Module, forwardRef } from '@nestjs/common';
import { ClassModule } from 'src/classes/class.module';
import { StudentService } from './student.service';
import { StudentController } from './student.controller';
import { ClassesService } from 'src/classes/class.service';
// import { ParseUUIDPipe } from './pipes/parse-uuid.pipe'; 
// import { AuthModule } from '../auth/auth.module'; 
// import { RolesModule } from '../roles/roles.module'; 
@Module({
    //   imports: [AuthModule, RolesModule], // Import các module phụ thuộc nếu có
    imports: [ClassModule],
    controllers: [StudentController], // Controller quản lý các yêu cầu liên quan đến Student
    providers: [
         StudentService
        // ParseUUIDPipe,  // Đăng ký custom pipe nếu cần thiết
    ], // Các provider, services sử dụng trong module
    exports: [StudentService], // Xuất ra để các module khác dùng
   
})
export class StudentModule { }