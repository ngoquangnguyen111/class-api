import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
const configEnv = () => ({
    database: {
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        name: process.env.DB_NAME,
    },
});
@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: ['.env.development', '.env'],
            cache: true,
            load: [configEnv],
        }),
    ],
})
export class EnvConfigModule {}