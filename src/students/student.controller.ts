import { Controller, Get, Post, Body, Param, Put, Delete, ParseUUIDPipe, ValidationPipe } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { SearchStudentDto } from './dto/search-student.dto';
import { GetByClassNameDto } from './dto/get-by-classname.dto';
import { StudentService } from './student.service';
import { Roles } from 'src/common/decorators/roles/roles.decorator';
import { Role } from 'src/common/enums/role.enum';

@Controller('students')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Post()
  @Roles(Role.Admin, Role.Teacher)
  async create(@Body(ValidationPipe) createStudentDto: CreateStudentDto) {
    return await this.studentService.create(createStudentDto);
  }

  @Get()
  @Roles(Role.Admin, Role.Teacher, Role.Principal)
  async getAll() {
    return await this.studentService.getAll();
  }

  @Get(':id')
  @Roles(Role.Admin, Role.Teacher, Role.Principal)
  async getStudentById(@Param('id', ParseUUIDPipe) id: string) {
    return await this.studentService.getById(id);
  }

  @Post('/search-by-name')
  @Roles(Role.Admin, Role.Teacher, Role.Principal)
  async getByName(@Body(ValidationPipe) searchStudentDto: SearchStudentDto) {
    return await this.studentService.getByName(searchStudentDto);
  }

  @Put(':id')
  @Roles(Role.Admin, Role.Teacher)
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body(ValidationPipe) updateStudentDto: UpdateStudentDto,
  ) {
    return await this.studentService.update(id, updateStudentDto);
  }

  @Post('/class')
  @Roles(Role.Admin, Role.Teacher, Role.Principal)
  async getByClassName(@Body(ValidationPipe) getByClassNameDto: GetByClassNameDto) {
    return await this.studentService.getByClassName(getByClassNameDto);
  }

  @Delete(':id')
  @Roles(Role.Admin, Role.Teacher)
  async deleteStudentById(@Param('id', ParseUUIDPipe) id: string) {
    return await this.studentService.deleteById(id);
  }
}