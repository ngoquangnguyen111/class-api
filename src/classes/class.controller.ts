import { 
  Controller, 
  Post, 
  Body, 
  Put, 
  Param, 
  ParseUUIDPipe, 
  Get, 
  Delete, 
  UsePipes, 
  ValidationPipe 
} from '@nestjs/common';
import { ClassesService } from './class.service';
import { CreateClassDto } from './dto/create-class.dto';
import { UpdateClassDto } from './dto/update-class.dto';
import { Class } from './entities/class.entity';
import { Roles } from 'src/common/decorators/roles/roles.decorator';
import { Role } from 'src/common/enums/role.enum';

@Controller('classes')
export class ClassesController {
  constructor(private readonly classesService: ClassesService) {}

  @Post()
  @Roles(Role.Admin, Role.Principal)
  @UsePipes(ValidationPipe)
  async create(@Body() createClassDto: CreateClassDto): Promise<Class> {
    return await this.classesService.create(createClassDto);
  }

  @Put(':id')
  @Roles(Role.Admin, Role.Principal)
  @UsePipes(ValidationPipe)
  async updateClass(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateClassDto: UpdateClassDto,
  ): Promise<Class> {
    return await this.classesService.updateClass(id, updateClassDto);
  }

  @Get(':id')
  @Roles(Role.Admin, Role.Principal, Role.Teacher)
  async getClassById(@Param('id', ParseUUIDPipe) id: string): Promise<Class> {
    return await this.classesService.findById(id);
  }

  @Post('/search-by-name')
  @Roles(Role.Admin, Role.Principal, Role.Teacher)
  async findClassByClassName(@Body('className') className: string): Promise<Class[]> {
    return await this.classesService.searchByClassName(className);
  }

  @Delete(':id')
  @Roles(Role.Admin, Role.Principal)
  async deleteClass(@Param('id', ParseUUIDPipe) classId: string): Promise<string> {
    return await this.classesService.deleteClass(classId);
  }

  @Get()
  @Roles(Role.Admin, Role.Principal, Role.Teacher)
  async getAll(): Promise<Class[]> {
    return await this.classesService.getAll();
  }
}