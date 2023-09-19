
import {connectMongoDB} from '@/lib/mongodb'
import { NextResponse } from "next/server";
import bcrypt from 'bcryptjs';
import User from "@/models/user";

export async function POST(req){
    try {
        const {firstName, lastName, email, password} = await req.json();
        // hash password to keep it secure
        const hashedPassword = await bcrypt.hash(password, 10);
        
        // console.log ('first Name :', firstName);
        // console.log ('last Name :', lastName);
        // console.log ('email :', email);
        // console.log ('password :', password);

        await connectMongoDB();
        await User.create({firstName, lastName, email, password: hashedPassword})

        return NextResponse.json(
            {
                message: 'user registred'
            },
            {
                status: 201
            });

    } catch(error) {
        return NextResponse.json(
            {
                message: 'error occusred while registering user!'
            },
            {
                status: 500
            }
        );
    }
}