
import { auth, signOut } from '@/auth';
import { Button } from '@nextui-org/react';
import { FaRegSmile } from 'react-icons/fa';

export default async function Home() {
  const session = await auth();
  return (
    <div className="">
      <h3 className="text-2xl font-semibold">User session data:</h3>
      {session ? (
        <div>
          <pre>
            {JSON.stringify(session, null, 2)}
          </pre>
          <form action={async () => {
            'use server';
            await signOut();
          }}>
            <Button
              type='submit'
              color='primary'
              variant='bordered'
              startContent={<FaRegSmile size={20} />}
            >
              Sign Out
            </Button>
          </form>
        </div>
      ) : (
        <div>
          no user logged in
        </div>
      )}
    </div>
  );
}
