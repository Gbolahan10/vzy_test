import {
    IsObject,
    IsNotEmptyObject,
    IsDefined,
    IsEmail,
    IsString,
    IsAlphanumeric,
    ValidateNested,
    IsNumber,
    MaxLength,
    MinLength,
    IsEnum,
    IsDateString,
    IsBoolean,
    IsOptional
  } from 'class-validator';

  export class CreateUserDto {
    @IsEmail()
    public email: string;
  
    @IsString()
    public password: string;

    @IsString()
    public firstName: string;

    @IsString()
    public lastName: string;

    @IsString()
    public countryCode: string;

    @IsString()
    @MaxLength(11)
    public phoneNumber: string;
  }
  
  export class AuthUserDto {
    @IsEmail()
    public email: string;
  
    @IsString()
    public password: string;
  }
  
  export class UserDto {
  
    @IsString()
    public _id: string;

    @IsEmail()
    public email: string;
  
    @IsString()
    public password: string;

    @IsString()
    public firstName: string;

    @IsString()
    public lastName: string;

    @IsString()
    public countryCode: string;

    @IsString()
    public phoneNumber: string;

    @IsString()
    public address: string;

    @IsString()
    public status: string;
  }

  export class UpdateUserDto {
    @IsString()
    @IsOptional()
    public lastName: string;
  
    @IsString()
    @IsOptional()
    public firstName: string;
  
    @IsString()
    @IsOptional()
    public address: string;
  
    @IsString()
    @IsOptional()
    public countryCode: string;
  
    @IsString()
    @IsOptional()
    public phoneNumber: string;
  }