'use client'
// import Image from 'next/image'
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import Link from 'next/link';

export default function RegisterForm() {
    const [firstName, setfirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleSubmit = async(e) => {
        e.preventDefault();

        if(!firstName || !email || !password){
            setError('Please Fill the required Fields');
            return;
        }

        try {
            const resUserExists = await fetch('/api/userExists', {
                method: 'POST',
                headers: {
                    'content-type':'application/json'
                },
                body: JSON.stringify({
                    email
                })
            })

            const {user} = await resUserExists.json();
            if(user) {
                setError('User already exists');
                return;
            }

            const res = await fetch('/api/register', {
                method: 'POST',
                headers: {
                    'content-type':'application/json'
                },
                body: JSON.stringify({
                    firstName, lastName, email, password
                })
            });

            if(res.ok){
                const form = e.target;
                form.reset();
                router.push('/');
            } else {
                console.log('User registration failed!')
            }
            
        } catch (error) {
            console.log('error during registration!', error)
        }
    }


  return (
    <div className='f-width register-container'>
        <div className="min-w-screen min-h-screen bg-gray-900 flex items-center justify-center px-5 py-5">
            <div className="bg-gray-100 text-gray-500 rounded-3xl shadow-xl w-full overflow-hidden" >
                <div className="md:flex w-full">
                    <div className="hidden md:block w-1/2 bg-indigo-500 py-10 px-10">
                        <h1 className='font-big text-bold text-white text-center align-center'>Right side Image</h1>
                    </div>
                    <div className="w-full md:w-1/2 py-10 px-5 md:px-10">
                        <div className="text-center mb-10">
                            <h1 className="font-bold text-3xl text-gray-900">REGISTER</h1>
                            <p>Enter your information to register</p>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="flex -mx-3">
                                <div className="w-1/2 px-3 mb-5">
                                    <label className="text-xs font-semibold px-1">First name</label>
                                    <div className="flex">
                                        <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"><i className="mdi mdi-account-outline text-gray-400 text-lg"></i></div>
                                        <input 
                                        onChange={(e) => setfirstName(e.target.value)}
                                        type="text" 
                                        className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500" 
                                        placeholder="First Name"
                                        required />
                                    </div>
                                </div>
                                <div className="w-1/2 px-3 mb-5">
                                    <label className="text-xs font-semibold px-1">Last name</label>
                                    <div className="flex">
                                        <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"><i className="mdi mdi-account-outline text-gray-400 text-lg"></i></div>
                                        <input 
                                        onChange={(e) => setLastName(e.target.value)}
                                        type="text" 
                                        className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500" 
                                        placeholder="Last Name" />
                                    </div>
                                </div>
                            </div>
                            <div className="flex -mx-3">
                                <div className="w-full px-3 mb-5">
                                    <label className="text-xs font-semibold px-1">Email</label>
                                    <div className="flex">
                                        <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"><i className="mdi mdi-email-outline text-gray-400 text-lg"></i></div>
                                        <input 
                                        onChange={(e) => setEmail(e.target.value)}
                                        type="email" 
                                        className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500" 
                                        placeholder="johnsmith@example.com"
                                        required />
                                    </div>
                                </div>
                            </div>
                            <div className="flex -mx-3">
                                <div className="w-full px-3 mb-12">
                                    <label className="text-xs font-semibold px-1">Password</label>
                                    <div className="flex">
                                        <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"><i className="mdi mdi-lock-outline text-gray-400 text-lg"></i></div>
                                        <input 
                                        onChange={(e) => setPassword(e.target.value)}
                                        type="password" 
                                        className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500" 
                                        placeholder="************"
                                        required />
                                    </div>
                                </div>
                            </div>
                            <div className="flex -mx-3">
                                <div className="w-full px-3 mb-5">
                                    <button className="block w-full max-w-xs mx-auto bg-indigo-500 hover:bg-indigo-700 focus:bg-indigo-700 text-white rounded-lg px-3 py-3 font-semibold">REGISTER NOW</button>
                                </div>
                            </div>
                            <div className="flex -mx-3">
                                <div className="w-full px-3 mb-5">
                                   <p>Already have an account 
                                        <Link className='text-[#f00]-500 font-bold underline' href="/"> Login</Link> 
                                    </p>
                                </div>
                            </div>
                            {error && (
                                <div className='bg-[#f00] p-4 my-2 text-white'>
                                    {error}
                                </div>
                            )}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
