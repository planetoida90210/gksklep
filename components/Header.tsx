import Image from 'next/image';
import React from 'react';
import { useTheme } from 'next-themes';

//external imports
import images from '../assets/app'

const Header = () => {
  const { theme, setTheme } = useTheme();

  return (
    <header className="flexBetween">
      <div className="relative h-20 w-20">
        <Image src={images.logo} className={theme === 'light' ? 'filter invert' : ''} layout="fill" objectFit="contain" alt="logo"/>
      </div>
      <div className="flex flex-initial flex-row justify-end">
        <div className="flex items-center mr-2">
          <input
            type="checkbox"
            className="checkbox"
            id="checkbox"
            onChange={() => setTheme(theme === 'light' ? 'dark' : 'light')}
          />
          <label htmlFor="checkbox" className="flexBetween w-8 h-4 bg-black rounded-2xl p-1 relative label">
            <i className="fas fa-sun" />
            <i className="fas fa-moon" />
            <div className="w-3 h-3 absolute bg-white rounded-full ball" />
          </label>
        </div>
      </div>
    </header>
  )
}

export default Header