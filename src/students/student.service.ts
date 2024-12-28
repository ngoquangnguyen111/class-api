import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { SearchStudentDto } from './dto/search-student.dto';
import { GetByClassNameDto } from './dto/get-by-classname.dto';
import { Student } from './entities/student.entity';
import { ClassesService } from 'src/classes/class.service';
import { Not } from 'typeorm';

@Injectable()
export class StudentService {
    constructor(
        @InjectRepository(Student)
        private readonly studentRepository: Repository<Student>,
        private readonly classService: ClassesService,
    ) {}

    async create(createStudentDto: CreateStudentDto): Promise<Student> {
        const { name, className } = createStudentDto;

        const existingStudent = await this.studentRepository.findOne({ where: { name } });
        if (existingStudent) {
            throw new BadRequestException('Student name must be unique');
        }

        const classEntity = await this.classService.findByClassName(className);
        if (!classEntity) {
            throw new NotFoundException(`Class with name ${className} not found`);
        }

        this.classService.increaseStudentByClassName(className);

        const newStudent = this.studentRepository.create({
            id: uuidv4(),
            name,
            classId: classEntity.id,
        });

        return this.studentRepository.save(newStudent);
    }

    async update(id: string, updateStudentDto: UpdateStudentDto): Promise<Student> {
        const student = await this.studentRepository.findOne({ where: { id } });

        if (!student) {
            throw new NotFoundException('Student not found');
        }

        const { name, className } = updateStudentDto;

        if (name) {
            const existingStudent = await this.studentRepository.findOne({ where: { name, id: Not(id) } });
            if (existingStudent) {
                throw new BadRequestException('Student name must be unique');
            }
        }

        if (className) {
            const oldClassName = student.classId; // Assuming classId contains the class name
            this.classService.decreaseStudentByClassName(oldClassName);
            this.classService.increaseStudentByClassName(className);

            const classEntity = await this.classService.findByClassName(className);
            student.classId = classEntity.id;
        }

        student.name = name ?? student.name;

        return this.studentRepository.save(student);
    }

    async getAll(): Promise<Student[]> {
        return this.studentRepository.find();
    }

    async getById(id: string): Promise<Student> {
        const student = await this.studentRepository.findOne({ where: { id } });
        if (!student) {
            throw new NotFoundException(`Student with ID ${id} not found.`);
        }
        return student;
    }

    async getByName(searchStudentDto: SearchStudentDto): Promise<Student[]> {
        const { name } = searchStudentDto;
        const students = await this.studentRepository.find({ where: { name: Like(`%${name}%`) } });
        if (students.length === 0) {
            throw new NotFoundException(`No students found with the name ${name}`);
        }
        return students;
    }

    async deleteById(id: string): Promise<void> {
        const student = await this.studentRepository.findOne({ where: { id } });
        if (!student) {
            throw new NotFoundException(`Student with ID ${id} not found`);
        }

        this.classService.decreaseStudentByClassName(student.classId);

        await this.studentRepository.delete(id);
    }

    async getByClassName(getByClassNameDto: GetByClassNameDto): Promise<Student[]> {
        const { className } = getByClassNameDto;
        const students = await this.studentRepository.find({ where: { classId: className } });
        if (students.length === 0) {
            throw new NotFoundException(`No students found in class ${className}`);
        }
        return students;
    }
}