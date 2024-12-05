import {Home as HomeComponent} from '../components/Home';
import Image from 'next/image';
import uwuImg from '../images/uwu.gif';

export default async function Home({searchParams}: {searchParams: Promise<{ [key: string]: string | string[] | undefined }>}) {
  const { uwu } = await searchParams;

  return (
    <main
      className="flex min-h-screen flex-col items-center justify-between relative"
    >
      {uwu === 'true' &&
        <Image className="bg-img" src={uwuImg} alt="Uwu" />
      }
      <HomeComponent />
    </main>
  );
}
