import mongoose from 'mongoose';
declare const User: mongoose.Model<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    status: "EXPIRED" | "PAID";
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    countryCode: string;
    phoneNumber: string;
    address?: string;
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    status: "EXPIRED" | "PAID";
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    countryCode: string;
    phoneNumber: string;
    address?: string;
}> & {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    status: "EXPIRED" | "PAID";
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    countryCode: string;
    phoneNumber: string;
    address?: string;
} & {
    _id: mongoose.Types.ObjectId;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
    toObject: {
        virtuals: true;
    };
    toJSON: {
        virtuals: true;
    };
}, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    status: "EXPIRED" | "PAID";
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    countryCode: string;
    phoneNumber: string;
    address?: string;
}, mongoose.Document<unknown, {}, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    status: "EXPIRED" | "PAID";
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    countryCode: string;
    phoneNumber: string;
    address?: string;
}> & {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    status: "EXPIRED" | "PAID";
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    countryCode: string;
    phoneNumber: string;
    address?: string;
} & {
    _id: mongoose.Types.ObjectId;
}>>;
export default User;
