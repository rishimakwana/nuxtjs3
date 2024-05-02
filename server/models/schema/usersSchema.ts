import mongoose from 'mongoose';
const { Schema } = mongoose;

const users = new Schema({
    affiliateBalance: { type: Number, default: 0 },
    affiliateWithdraw: { type: Number, default: 0 },
    name: String,
    username: String,
    phone: String,
    formulirNumber: String,
    profile_picture: String,
    email: { type: String, unique: true, required: true, dropDups: true },
    password: String,
    monthly_volume: String,
    language: { type: String, default: 'id' },
    theme: { type: String, default: 'light' },
    is_active: Boolean,

    balance: { type: Number, default: 0 },
    forgot_password: Object,
    role: { type: String, default: 'user' },
    role_id: { type: Schema.Types.ObjectId, ref: 'Role' },
    isVerifiedEmail: { type: Boolean, default: true },
    isVerifiedPhone: { type: Boolean, default: true },
}, {
    collection: 'users',
    timestamps: true
})

export default users