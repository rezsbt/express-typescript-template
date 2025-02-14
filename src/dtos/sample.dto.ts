import { IsNotEmpty, IsOptional, IsString } from 'class-validator'

export class CreateUserDto {
  @IsString()
  @IsNotEmpty({ message: 'Sample title is required' })
  public title: string

  @IsOptional()
  @IsString()
  public description: string
}
