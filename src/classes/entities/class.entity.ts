import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Student } from 'src/students/entities/student.entity';

@Entity('classes') // Tên bảng trong cơ sở dữ liệu
export class Class {
  @PrimaryGeneratedColumn('uuid') // Tự động tạo UUID cho cột id
  id: string;

  @Column({ type: 'varchar', length: 255 }) // Tên lớp, độ dài tối đa là 255 ký tự
  className: string;

  @Column({ type: 'int', default: 0 }) // Số lượng học sinh, mặc định là 0
  numStudent: number;

  @OneToMany(() => Student, (student) => student.class, { cascade: true }) 
  students: Student[];
}