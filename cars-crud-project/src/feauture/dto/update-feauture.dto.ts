import { PartialType } from '@nestjs/mapped-types';
import { CreateFeatureDto } from './create-feauture.dto';

export class UpdateFeatureDto extends PartialType(CreateFeatureDto) {}
