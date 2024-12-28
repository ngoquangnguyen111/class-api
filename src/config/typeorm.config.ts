import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { join } from 'path';
import { config } from 'dotenv';

// Load .env file
config();

// Khởi tạo ConfigService
const configService = new ConfigService();

// Export cấu hình TypeORM
export default new DataSource({
    type: 'postgres',
    host: configService.getOrThrow('DB_HOST'),
    port: Number(configService.getOrThrow('DB_PORT')),
    username: configService.getOrThrow('DB_USERNAME'),
    password: configService.getOrThrow('DB_PASSWORD'),
    database: configService.getOrThrow('DB_DATABASE'),
    entities: [join(__dirname, '..', '**', '*.entity.{ts,js}')],
    migrations: [join(__dirname, '..', 'migrations', '*.{ts,js}')],
    synchronize: false, // Không bật trong môi trường production
    migrationsTableName: 'migrations', // Tên bảng lưu trạng thái migration
});