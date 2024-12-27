import { Module, forwardRef } from '@nestjs/common';
import { ClassModule } from 'src/classes/class.module';
import { StudentService } from './student.service';
import { StudentController } from './student.controller';


@Module({
    
    imports: [ClassModule],
    controllers: [StudentController], 
    providers: [
         StudentService
        
    ], 
    exports: [StudentService], // Xuất ra để các module khác dùng
   
})
export class StudentModule { }