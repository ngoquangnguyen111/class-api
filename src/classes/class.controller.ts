import { Controller, Post, Body, Put, Param, ParseUUIDPipe, NotFoundException, ConflictException, Get, Delete, UseGuards } from '@nestjs/common';
import { ClassesService } from './class.service';
import { CreateClassDto } from './dto/create-class.dto';
import { UpdateClassDto } from './dto/update-class.dto';
import { Class } from './entities/class.entity';

import { ValidationPipe } from '@nestjs/common';
import { Roles } from 'src/common/decorators/roles/roles.decorator';
import { Role } from 'src/common/enums/role.enum';
// import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('classes')
export class ClassesController {
  constructor(private readonly classesService: ClassesService) { }



  @Post()
  // @Roles(Role.Admin, Role.Principal)
  create(@Body(ValidationPipe) createClassDto: CreateClassDto) {
    return this.classesService.create(createClassDto);
  }

  @Put(':id')
  // @Roles(Role.Admin, Role.Principal)
  updateClass(
    @Param('id', ParseUUIDPipe) id: string,
    @Body(ValidationPipe) updateClassDto: UpdateClassDto,
  ) {
    return this.classesService.updateClass(id, updateClassDto);
  }

  @Get(':id')
  // @Roles(Role.Admin, Role.Principal, Role.Teacher)
  getClassById(@Param('id', ParseUUIDPipe) id: string): Class {
    return this.classesService.findById(id);
  }
  // @Post('/search-by-name') // for test only
  // findClassByClassName(@Body() className: string) {
  //   return this.classesService.findByClassName(className);
  // }
  @Delete(':id')
  // @Roles(Role.Admin, Role.Principal)
  deleteClass(@Param('id', ParseUUIDPipe) classId: string): string {
    return this.classesService.deleteClass(classId);
  }
  @Get()
  // @Roles(Role.Admin, Role.Principal, Role.Teacher)
  getAll(): Class[] {
    return this.classesService.getAll();
  }
}