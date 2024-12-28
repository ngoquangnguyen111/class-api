import { 
    BadRequestException, 
    ConflictException, 
    Injectable, 
    NotFoundException, 
  } from '@nestjs/common';
  import { InjectRepository } from '@nestjs/typeorm';
  import { Repository } from 'typeorm';
  import { CreateClassDto } from './dto/create-class.dto';
  import { UpdateClassDto } from './dto/update-class.dto';
  import { Class } from './entities/class.entity';
  
  @Injectable()
  export class ClassesService {
    constructor(
      @InjectRepository(Class) 
      private readonly classRepository: Repository<Class>,
    ) {}
  
    async create(createClassDto: CreateClassDto): Promise<Class> {
      const existingClass = await this.classRepository.findOne({
        where: { className: createClassDto.className },
      });
  
      if (existingClass) {
        throw new ConflictException('Class name must be unique');
      }
  
      const newClass = this.classRepository.create({
        className: createClassDto.className,
        numStudent: 0,
      });
  
      return await this.classRepository.save(newClass);
    }
  
    async increaseStudentByClassName(name: string): Promise<void> {
      const classEntity = await this.classRepository.findOne({
        where: { className: name },
      });
  
      if (!classEntity) {
        throw new NotFoundException(`Class not found`);
      }
  
      classEntity.numStudent++;
      await this.classRepository.save(classEntity);
    }
  
    async decreaseStudentByClassName(name: string): Promise<void> {
      const classEntity = await this.classRepository.findOne({
        where: { className: name },
      });
  
      if (!classEntity) {
        throw new NotFoundException(`Class not found`);
      }
  
      classEntity.numStudent--;
      await this.classRepository.save(classEntity);
    }
  
    async findByClassName(name: string): Promise<Class> {
      const classEntity = await this.classRepository.findOne({
        where: { className: name },
      });
  
      if (!classEntity) {
        throw new NotFoundException(`Class not found`);
      }
  
      return classEntity;
    }
  
    async searchByClassName(name: string): Promise<Class[]> {
      const classes = await this.classRepository.find({
        where: { className: name },
      });
  
      if (classes.length === 0) {
        throw new NotFoundException(`No classes found with the name ${name}`);
      }
  
      return classes;
    }
  
    async findById(id: string): Promise<Class> {
      const classEntity = await this.classRepository.findOne({ where: { id } });
  
      if (!classEntity) {
        throw new NotFoundException(`Class with ID ${id} not found`);
      }
  
      return classEntity;
    }
  
    async updateClass(id: string, updateClassDto: UpdateClassDto): Promise<Class> {
      const classExists = await this.classRepository.findOne({
        where: { className: updateClassDto.className },
      });
  
      if (classExists && classExists.id !== id) {
        throw new ConflictException(`Class name '${updateClassDto.className}' already exists`);
      }
  
      const classToUpdate = await this.findById(id);
      classToUpdate.className = updateClassDto.className;
  
      return await this.classRepository.save(classToUpdate);
    }
  
    async deleteClass(classId: string): Promise<string> {
      const classToDelete = await this.classRepository.findOne({ where: { id: classId } });
  
      if (!classToDelete) {
        throw new NotFoundException('Class not found');
      }
  
      if (classToDelete.numStudent > 0) {
        throw new BadRequestException('Cannot delete class with students');
      }
  
      await this.classRepository.remove(classToDelete);
      return `Class with ID ${classId} has been deleted`;
    }
  
    async getAll(): Promise<Class[]> {
      return await this.classRepository.find();
    }
  }
  