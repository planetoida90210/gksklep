import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { useTheme } from 'next-themes';
import { useRouter } from 'next/router';

import images from '../assets/app'
import { CheckIcon } from '@heroicons/react/solid';

const success = () => {
  const { theme, setTheme } = useTheme();
  const router = useRouter();
  const {session_id} = router.query;

  return (
    <div>
      <Head>
        <title>Dziękujemy za płatność! Galeria Koloru</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className="mx-auto max-w-xl">
        <Link href="/">
          <div className="relative ml-4 h-16 w-16 cursor-pointer transition lg:hidden">
            <Image
            src={images.logo} 
            className={theme === 'light' ? 'filter invert' : ''} 
            layout="fill" 
            objectFit="contain" 
            alt="logo"
            />
          </div>
        </Link>
      </header>
      <main className="">
        <section className="order-2 mx-auto max-w-xl pb-12 lg:mx-0 lg:max-w-none lg:pr-16 lg:pt-16 xl:pl-16 2xl:pl-44">
          <Link href="/">
            <div className="relative ml-14 hidden h-24 w-24 cursor-pointer transition lg:inline-flex">
              <Image
              src={images.logo}
              className={theme === 'light' ? 'filter invert' : ''} 
              layout="fill"
              objectFit="contain" 
              />
            </div>
          </Link>
          <div className="my-8 ml-4 flex space-x-4 lg:ml-14 xl:ml-0">
            <div className="flex h-11 w-11 items-center justify-center rounded-full border-2 dark:border-white border-black">
              <CheckIcon className="h-8 w-8"/>
            </div>
            <div>
              <p className="text-sm dark:text-gray-300 text-gray-600">Zamówienie #{session_id?.slice(-5)}</p>
              <h4 className="text-lg">
                Dziękujemy{" "}
                {/* {session ? session_id.user?.name?.split(" ")[0] : "Gość"} */}
              </h4>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default success