import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Class } from 'src/classes/entities/class.entity';

@Entity('students') // Tên bảng trong cơ sở dữ liệu
export class Student {
  @PrimaryGeneratedColumn('uuid') // Tự động tạo UUID cho cột id
  id: string;

  @Column({ type: 'varchar', length: 50 }) // Tên học sinh, độ dài tối đa là 255 ký tự
  name: string;

  @ManyToOne(() => Class, (classEntity) => classEntity.students, { onDelete: 'CASCADE' }) 
  @JoinColumn({ name: 'classId' }) // Đặt tên cho cột khóa ngoại
  class: Class;

  @Column({ type: 'uuid' }) // Khóa ngoại liên kết đến class id
  classId: string;
}