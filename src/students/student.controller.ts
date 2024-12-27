import { Controller, Get, Post, Body, Param, UseGuards, Put, Delete, Query } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { StudentService } from './student.service';
// import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from 'src/common/decorators/roles/roles.decorator';
import { Role } from 'src/common/enums/role.enum';
import { UpdateStudentDto } from './dto/update-student.dto';
import { Student } from './entities/student.entity';
import { SearchStudentDto } from './dto/search-student.dto';
import { ParseUUIDPipe } from '@nestjs/common';
import { GetByClassNameDto } from './dto/get-by-classname.dto';
import { ValidationPipe } from '@nestjs/common';

@Controller('students')
export class StudentController {
  constructor(private readonly studentService: StudentService) { }

  @Post()
  // @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin, Role.Teacher)
  create(@Body(ValidationPipe) createStudentDto: CreateStudentDto) {
    return this.studentService.create(createStudentDto);
  }

  @Get()
  // @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin, Role.Teacher, Role.Principal)
  getAll() {
    return this.studentService.getAll();
  }

  @Get(':id')
  @Roles(Role.Admin, Role.Teacher, Role.Principal)
  getStudentById(@Param('id', ParseUUIDPipe) id: string): Student {
    return this.studentService.getById(id);
  }
  @Post('/search-by-name')
  // @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin, Role.Teacher, Role.Principal)
  getByName(@Body(ValidationPipe) SearchStudentDto: SearchStudentDto) {
    return this.studentService.getByName(SearchStudentDto);
  }

  @Put(':id')
  // @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin, Role.Teacher)
  update(@Param('id') id: string, @Body(new ValidationPipe()) updateStudentDto: UpdateStudentDto) {
    return this.studentService.update(id, updateStudentDto);
  }

  @Post('/class')
  // @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin, Role.Teacher, Role.Principal)
  getByClassName(@Body(ValidationPipe) getByClassNameDto: GetByClassNameDto) {
    return this.studentService.getByClassName(getByClassNameDto);
  }

  @Delete(':id')
  @Roles(Role.Admin, Role.Teacher)
  deleteStudentById(@Param('id', ParseUUIDPipe) id: string): void {
    this.studentService.deleteById(id);
  }
}