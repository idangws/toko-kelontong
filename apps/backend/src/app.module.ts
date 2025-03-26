import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { CategoryModule } from './category/category.module';
import { ProductsModule } from './product/product.module';
import { UploadModule } from './upload/upload.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST || 'localhost',
      port: +(process.env.DATABASE_PORT || 0) || 5432,
      username: process.env.DATABASE_USERNAME || 'admin_toko',
      password: process.env.DATABASE_PASSWORD || 'password_toko',
      database: process.env.DATABASE_NAME || 'toko',
      autoLoadEntities: true,
      synchronize: true,
    }),
    CategoryModule,
    UsersModule,
    ProductsModule,
    AuthModule,
    UploadModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
