import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ManufacturerService } from './manufacturer.service';
import { CreateManufacturerDto } from './dto/create-manufacturer.dto';
import { UpdateManufacturerDto } from './dto/update-manufacturer.dto';

@Controller('manufacturer')
export class ManufacturerController {
  constructor(private readonly manufacturerService: ManufacturerService) {}

  @Post()
  create(@Body() createManufacturerDto: CreateManufacturerDto) {
    return this.manufacturerService.createManufacturer(createManufacturerDto);
  }

  @Get()
  getAll() {
    return this.manufacturerService.getAllManufacturers();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.manufacturerService.getManufacturerById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateManufacturerDto: UpdateManufacturerDto) {
    return this.manufacturerService.updateManufacturer(id, updateManufacturerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.manufacturerService.removeManufacturer(id);
  }
}
