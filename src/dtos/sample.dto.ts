import { IsNotEmpty, IsOptional, IsString } from 'class-validator'

export class CreateSampleDto {
  @IsString()
  @IsNotEmpty({ message: 'Sample title is required' })
  public title: string

  @IsOptional()
  @IsString()
  public description: string
}

export class UpdateSampleDto {
  @IsString()
  @IsNotEmpty({ message: 'Sample title is required' })
  public title: string

  @IsOptional()
  @IsString()
  public description: string
}
