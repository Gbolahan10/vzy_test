import mongoose from 'mongoose';
declare const Transaction: mongoose.Model<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    transaction_data: any;
    user_id?: mongoose.Types.ObjectId;
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    transaction_data: any;
    user_id?: mongoose.Types.ObjectId;
}> & {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    transaction_data: any;
    user_id?: mongoose.Types.ObjectId;
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
    transaction_data: any;
    user_id?: mongoose.Types.ObjectId;
}, mongoose.Document<unknown, {}, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    transaction_data: any;
    user_id?: mongoose.Types.ObjectId;
}> & {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    transaction_data: any;
    user_id?: mongoose.Types.ObjectId;
} & {
    _id: mongoose.Types.ObjectId;
}>>;
export default Transaction;
