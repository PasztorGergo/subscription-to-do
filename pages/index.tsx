import Tasks from '@/components/ui/Tasks';
import { useUser } from '@supabase/supabase-auth-helpers/react';
import { NextPage } from 'next';
import Head from 'next/head';
import { supabase } from '../utils/supabase-client';
import { useState, useEffect } from 'react';

const Home: NextPage = () => {
  const { user } = useUser();

  return (
    <>
      <Head>
        <title>Sub-to-do</title>
      </Head>
      {user ? <Tasks /> : 'Please login'}
    </>
  );
};

export default Home;
