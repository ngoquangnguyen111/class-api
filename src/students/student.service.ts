import { Injectable, NotFoundException, BadRequestException, Inject, forwardRef } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { Student } from './entities/student.entity';
import { SearchStudentDto } from './dto/search-student.dto';
import { GetByClassNameDto } from './dto/get-by-classname.dto';
import { ClassesService } from 'src/classes/class.service';

@Injectable()
export class StudentService {
    private students: Student[] = [];
    constructor(
        private readonly classService: ClassesService,
    ) { }

    create(createStudentDto: CreateStudentDto) {
        const { name, className } = createStudentDto;


        if (this.students.some(student => student.name === name)) {
            throw new BadRequestException('Student name must be unique');
        }
        this.classService.increaseStudentByClassName(createStudentDto.className);
        const newStudent = {
            id: uuidv4(),
            name,
            className,
        };

        this.students.push(newStudent);
        
        return newStudent;
    }
    update(id: string, updateStudentDto: UpdateStudentDto) {
        const studentIndex = this.students.findIndex(
            (student) => student.id === id,
        );

        if (studentIndex === -1) {
            throw new NotFoundException('Student not found');
        }

        const { name, className } = updateStudentDto;


        if (
            name &&
            this.students.some(
                (student) => student.name === name && student.id !== id,
            )
        ) {
            throw new BadRequestException('Student name must be unique');
        }
        
        this.classService.deCreaseStudentByClassName(this.students[studentIndex].className);
        this.classService.increaseStudentByClassName(className);
        
        this.students[studentIndex] = {
            ...this.students[studentIndex],
            ...updateStudentDto,
        };

        return this.students[studentIndex];
    }
    getAll() {
        return this.students;
    }

    getById(id: string): Student {
        const student = this.students.find(student => student.id === id);
        if (!student) {
            throw new NotFoundException(`Student with ID ${id} not found.`);
        }
        return student;
    }
    getByName(SearchStudentDto: SearchStudentDto): Student[] {
        const { name } = SearchStudentDto;
        const studentsByName = this.students.filter(student => student.name.includes(name));
        if (studentsByName.length === 0) {
            throw new NotFoundException(`No students found with the name ${name}`);
        }
        return studentsByName;
    }
    deleteById(id: string): void {
        const index = this.students.findIndex(student => student.id === id);
        
        if (index === -1) {
            throw new NotFoundException(`Student with ID ${id} not found`);
        }
        this.classService.deCreaseStudentByClassName(this.students[index].className);

        this.students.splice(index, 1);
    }
    getByClassName(GetByClassNameDto: GetByClassNameDto): Student[] {
        const { className } = GetByClassNameDto;
        const studentsInClass = this.students.filter(student => student.className === className);
        if (studentsInClass.length === 0) {
            throw new NotFoundException(`No students found in class ${className}`);
        }
        return studentsInClass;
    }
}