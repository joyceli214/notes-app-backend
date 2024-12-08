import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateNoteDto {
  @IsNotEmpty()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  content?: string;
}
