import LoginForm from "@/components/LoginForm";
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'

export default async function Home() {
  const session = await getServerSession(authOptions);
  
  if(session) redirect('/pages/dashboard');

  return (
    <main>
      <LoginForm />
    </main>
  )
}
