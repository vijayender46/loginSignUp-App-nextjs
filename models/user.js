import mongoose, { Schema, models } from 'mongoose'

const userSchema = new Schema (
    {
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String
        },
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },        
    },
    {
        timestamps: true
    }
   
);

const User = models.User || mongoose.model('User', userSchema);
export default User;

