import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FeatureService } from './feauture.service';
import { CreateFeatureDto } from './dto/create-feauture.dto';
import { UpdateFeatureDto } from './dto/update-feauture.dto';

@Controller('feature')
export class FeatureController {
  constructor(private readonly featureService: FeatureService) {}

  @Post()
  create(@Body() createFeatureDto: CreateFeatureDto) {
    return this.featureService.create(createFeatureDto);
  }

  @Get()
  findAll() {
    return this.featureService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.featureService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFeatureDto: UpdateFeatureDto) {
    return this.featureService.update(id, updateFeatureDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.featureService.remove(id);
  }
}
