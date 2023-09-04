/* eslint-disable prettier/prettier */
import {
  IsNotEmpty,
  IsPositive,
  IsNumber,
  IsString,
  IsOptional,
} from 'class-validator';
import { Exclude, Expose } from 'class-transformer';
import { ReportType } from 'src/data';
export class CreateReportDto {
  @IsNumber()
  @IsPositive()
  amount: number;

  @IsString()
  @IsNotEmpty()
  source: string;
}

export class UpdateReportDto {
  @IsOptional()
  @IsNumber()
  @IsPositive()
  amount: number;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  source: string;
}


export class ReportResponseDto {
  id: string;
  source: string;
  amount: number;

  @Expose({ name: 'created_at' })
  transformObject() {
    return this.created_at
  }

  @Exclude()
  created_at: Date;
  @Exclude()
  updated_At: Date;
  type: ReportType
  constructor(partial: Partial<ReportResponseDto>) {
    Object.assign(this, partial);
  }
}