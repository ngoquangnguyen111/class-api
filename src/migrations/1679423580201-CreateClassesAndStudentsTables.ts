import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateClassesAndStudentsTables1679423580201 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        // Tạo bảng classes
        await queryRunner.query(`
            CREATE TABLE classes (
                id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                className VARCHAR(255) NOT NULL,
                createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);

        // Tạo bảng students
        await queryRunner.query(`
            CREATE TABLE students (
                id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                name VARCHAR(255) NOT NULL,
                className VARCHAR(255) NOT NULL,
                createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                CONSTRAINT fk_class_name FOREIGN KEY (className) REFERENCES classes(className) ON DELETE CASCADE
            );
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Xóa bảng students
        await queryRunner.query(`
            DROP TABLE IF EXISTS students;
        `);

        // Xóa bảng classes
        await queryRunner.query(`
            DROP TABLE IF EXISTS classes;
        `);
    }
}