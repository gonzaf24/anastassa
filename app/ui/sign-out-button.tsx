
import { auth, signOut } from '@/auth';
import { Button } from '@nextui-org/react';

export default async function SignOutButton() {   

    const session = await auth() 

    if (session === null) {
      return null;
    }

    return (
        <form
        action={async () => {
          'use server';
          await signOut();
        }}
      >
        return (<p>Welcome {session?.user?.name}!</p>)
        <Button type='submit' className='w-full'>
          <div className="hidden md:block">Sign Out</div>
        </Button>
      </form>
    )
}   
