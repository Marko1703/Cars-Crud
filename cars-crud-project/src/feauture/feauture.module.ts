import { Global, Module } from '@nestjs/common';
import { FeatureService } from './feauture.service';
import { FeatureController } from './feauture.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FeatureEntity } from './entities/feauture.entity';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([FeatureEntity])],
  controllers: [FeatureController],
  providers: [FeatureService],
})
export class FeautureModule {}
