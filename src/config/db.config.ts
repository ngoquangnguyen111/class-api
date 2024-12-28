import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Class } from 'src/classes/entities/class.entity';
import { Student } from 'src/students/entities/student.entity';
@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            inject: [ConfigService],
            useFactory: async (config: ConfigService) => ({
                type: 'postgres',
                host: config.get('DB_HOST'),
                port: Number(config.get('DB_PORT')),
                username: config.get('DB_USERNAME'),
                password: config.get('DB_PASSWORD'),
                entities: [Student, Class],
                database: config.get('DB_DATABASE'),
                retryAttempts: 3,
                autoLoadEntities: true,
                migrationsRun: true,
                synchronize: false,
            }),
        }),
    ],
})
export class DBConfigModule {}