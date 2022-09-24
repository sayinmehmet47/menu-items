import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ItemsService } from './items.service';
import { AuthGuard } from '@nestjs/passport';
import { Item } from './entities/item.entity';
import { Items } from './entities/items.entity';
import { PermissionsGuard } from 'src/authz/permissions.guard';
import { Permissions } from 'src/authz/permissions.decorator';

@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Get()
  async findAll(): Promise<Items> {
    return this.itemsService.findAll();
  }

  @Get(':id')
  async find(@Param('id') id: number): Promise<Item> {
    return this.itemsService.find(id);
  }

  @UseGuards(AuthGuard('jwt'), PermissionsGuard)
  @Post()
  @Permissions('create:items')
  create(@Body('item') item: Item) {
    this.itemsService.create(item);
  }

  @UseGuards(AuthGuard('jwt'), PermissionsGuard)
  @Put()
  @Permissions('update:items')
  update(@Body('item') item: Item) {
    this.itemsService.update(item);
  }

  @UseGuards(AuthGuard('jwt'), PermissionsGuard)
  @Delete(':id')
  @Permissions('delete:items')
  delete(@Param('id') id: number) {
    this.itemsService.delete(id);
  }
}
