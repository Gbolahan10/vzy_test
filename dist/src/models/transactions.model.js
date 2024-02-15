"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const mongoose_1 = tslib_1.__importDefault(require("mongoose"));
const TransactionSchema = new mongoose_1.default.Schema({
    user_id: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'User',
    },
    transaction_data: {
        type: Object,
        required: true,
    },
}, {
    timestamps: true,
    toObject: {
        virtuals: true,
    },
    toJSON: {
        virtuals: true,
    },
});
const Transaction = mongoose_1.default.model('Transaction', TransactionSchema);
exports.default = Transaction;
//# sourceMappingURL=transactions.model.js.map