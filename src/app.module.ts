import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthzModule } from './authz/authz.module';
import { ItemsModule } from './items/items.module';

@Module({
  imports: [AuthzModule, ItemsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
