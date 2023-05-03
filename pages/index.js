import Layout from '@/components/Layout';
import { useSession } from 'next-auth/react';
import Dashboard from './dashboard';

export default function Home() {
  const { data: session } = useSession();

  return (
    <Layout>
      <div className='text-primary flex '>
        <h2>
          Hello, <b>{session?.user?.name}</b>
        </h2>
        <br />
        
      </div>
    </Layout>
  );
}
