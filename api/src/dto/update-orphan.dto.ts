import { PartialType } from '@nestjs/mapped-types';
import { CreateOrphanDto } from './create-orphan.dto';
export class UpdateOrphanDto extends PartialType(CreateOrphanDto) {}
