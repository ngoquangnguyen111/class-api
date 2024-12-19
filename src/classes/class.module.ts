import { Module, forwardRef } from '@nestjs/common';
import { ClassesController } from './class.controller';
import { ClassesService } from './class.service';
import { StudentService } from 'src/students/student.service';
import { StudentModule } from 'src/students/student.module';
// import { TypeOrmModule } from '@nestjs/typeorm'; 
// import { Class } from './class.entity'; 

@Module({
    imports: [
       
    ],
    controllers: [ClassesController],
    providers: [ClassesService], // Inject ClassService và StudentService vào providers
    exports: [ClassesService], // Xuất ra để các module khác dùng
    
})
export class ClassModule { }