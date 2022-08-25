import Tasks from '@/components/ui/Tasks';
import { useUser } from '@supabase/supabase-auth-helpers/react';
import { NextPage } from 'next';
import Head from 'next/head';
import { supabase } from '../utils/supabase-client';
import { useState, useEffect } from 'react';

const Home: NextPage = () => {
  const { user } = useUser();
  const [tasks, setTasks] = useState<Array<any>>([]);

  useEffect(() => {
    const subscription = supabase
      .from('tasks')
      .on('*', (e) => setTasks(e.new))
      .subscribe();

    return () => {
      supabase.removeSubscription(subscription);
    };
  }, []);

  return (
    <>
      <Head>
        <title>Sub-to-do</title>
      </Head>
      {user ? <Tasks tasks={tasks} /> : 'Please login'}
    </>
  );
};

export default Home;
