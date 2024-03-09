import { PartialType } from '@nestjs/mapped-types';
import { CreateOrphanageDto } from './create-orphanage.dto';
export class UpdateOrphanageDto extends PartialType(CreateOrphanageDto) {}
