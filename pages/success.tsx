import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { useTheme } from 'next-themes';

import images from '../assets/app'

const success = () => {
  const { theme, setTheme } = useTheme();
  return (
    <div>
      <Head>
        <title>Dziękujemy za płatność! Galeria Koloru</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header>
        <Link href="/">
          <div className="relative ml-4 h-16 w-8 cursor-pointer transition lg:hidden">
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
    </div>
  )
}

export default success