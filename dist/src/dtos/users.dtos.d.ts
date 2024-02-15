export declare class CreateUserDto {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    countryCode: string;
    phoneNumber: string;
}
export declare class AuthUserDto {
    email: string;
    password: string;
}
export declare class UserDto {
    _id: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    countryCode: string;
    phoneNumber: string;
    address: string;
    status: string;
}
export declare class UpdateUserDto {
    lastName: string;
    firstName: string;
    address: string;
    countryCode: string;
    phoneNumber: string;
}
