'use client';

import React from 'react'
import { useSession } from "next-auth/react";
import {signOut} from 'next-auth/react'

export default function UserInfo() {
  const { data: session } = useSession();
  console.log('session data', session);
  return (
    <div className='container mx-auto width-[600px]'>
        <ul className='py-12'>
            <li className='mb-8'><h3 className='py-2 px-4 bg-yellow-500 font-bold'>User Information</h3></li>
            <li><strong>Username: </strong>{session?.user?.firstname}</li>
            <li><strong>Email: </strong>{session?.user?.email}</li>
            <li><button 
            onClick={() => signOut()}
            className='mt-4 rounded bg-blue-500 py-4 px-8 color-white-500'>
              Logout
            </button></li>
        </ul>
    </div>
  )
}
