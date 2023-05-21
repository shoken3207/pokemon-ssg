import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const Home: NextPage = () => {
  const router = useRouter();
  useEffect(() => {
    router.push('/pokemonDetail/1');
  }, []);
  return <div></div>;
};

export default Home;
