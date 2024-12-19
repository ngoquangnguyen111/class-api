import { BadRequestException, ConflictException, forwardRef, Inject, Injectable, NotFoundException, Scope } from '@nestjs/common';
import { CreateClassDto } from './dto/create-class.dto';
import { Class } from './entities/class.entity';
import { v4 as uuidv4 } from 'uuid';
import { UpdateClassDto } from './dto/update-class.dto';
import { StudentService } from 'src/students/student.service';
import { find } from 'rxjs';

@Injectable( { scope: Scope.DEFAULT })
export class ClassesService {
    public classes: Class[] = [];

    
    create(createClassDto: CreateClassDto) {

        const existingClass = this.findByClassName(createClassDto.className);

        if (existingClass) {
            throw new ConflictException(
                'Class name must be unique'
            );
        }


        const newClass = {
            id: uuidv4(),
            className: createClassDto.className,
            numStudent: 0
        };
        this.classes.push(newClass);
        return newClass;
    }
    increaseStudentByClassName(name: string): void {
        
        const classIndex = this.classes.findIndex((classItem) => classItem.className === name );
        if(classIndex === -1){
            throw new NotFoundException(`Class not found`);
        }
        this.classes[classIndex].numStudent++;
    }

    deCreaseStudentByClassName(name: string): void {
        const classIndex = this.classes.findIndex(
            (classItem) => classItem.className === name,
        );
        if(classIndex === -1){
            throw new NotFoundException(`Class not found`);
        }
        this.classes[classIndex].numStudent--;
    }
    findByClassName(name: string): Class {
        
        return this.classes.find(
            (classItem) => classItem.className === name,
        );
    }
    findById(id: string): Class {
        const foundClass = this.classes.find((classItem) => classItem.id === id);
        if (!foundClass) {
            throw new NotFoundException(`Class with ID ${id} not found`);
        }
        return foundClass;
    }
    updateClass(id: string, updateClassDto: UpdateClassDto): Class {

        const classExists = this.classes.some(
            (classItem) => classItem.className === updateClassDto.className,
        );

        if (classExists) {
            throw new ConflictException(`Class name '${updateClassDto.className}' already exists`);
        }

        const classToUpdate = this.findById(id);
        classToUpdate.className = updateClassDto.className;
        return classToUpdate;
    }
    deleteClass(classId: string): string {
        const classToDelete = this.classes.find((classItem) => classItem.id === classId);

        if (!classToDelete) {
            throw new NotFoundException('Class not found');
        }


        

        if (classToDelete.numStudent > 0) {
            throw new BadRequestException('Cannot delete class with students');
        }


        this.classes = this.classes.filter((classItem) => classItem.id !== classId);
        return `Class with ID ${classId} has been deleted`;
    }
    getAll(): Class[]{
        return this.classes;
    }
}