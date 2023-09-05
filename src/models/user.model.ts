import { NextFunction } from "express";
import mongoose, { Schema, model } from "mongoose";
import bcrypt from "bcrypt"

const userSchema = new Schema({
    firstname: {
        type: String,
        require: [true, "name is required"],
        min: [4, "first name must be 4 character"],
    },
    lastname: {
        type: String,
        require: [true, "name is required"],
        min: [4, "last name must be 4 character"],
    },
    email: {
        type: String,
        require: [true, "email is required"],
        unique: true,
        validate: {
            validator: function (val: any) {
                return /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-]+)(\.[a-zA-Z]{2,5}){1,2}$/.test(val)
            },
            message: (props: any) => `${props.value} is not a valid email`

        }
    },
    aadhar_uid: {
        type: Number,
        min: 12,
        validate: {
            validator: function (val: any) {
                return /^\d{12}$/.test(val)
            },
            message: (props: any) => `${props.value} is not 12 digit`
        }
    },
    password: {
        type: String,
        min: 8,
        required: [true, "please provide a password"]
    },
    phone: {
        type: Number,
        require: [true, "Number is required"],
        validate: {
            validator: function (val: any) {
                return /^\d{10}$/.test(val)
            }
        }
    },
    booked_tickets: [{ type: Schema.Types.ObjectId, ref: "ticket" }]

},
    {
        timestamps: true
    }
)

export interface IUser extends mongoose.Document {
    firstname: string;
    lastname: string;
    email: string;
    aadhar_uid: string;
    phone: number;
    password: string;
    isPasswordValid: (password: string) => Promise<Error | boolean>,
    booked_tickets: string[]
}

userSchema.pre<IUser>('save', async function (next: NextFunction) {
    if (!this.isModified('password')) return next()

    const hashedPassword = await bcrypt.hash(this.password, 10);
    this.password = hashedPassword
    next()
})

userSchema.methods.isPasswordValid = async function (password: IUser['password']): Promise<Error | boolean> {
    return await bcrypt.compare(password, this.password)
}
const User = model('user', userSchema)

export default User