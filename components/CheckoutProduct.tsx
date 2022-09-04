import { ChevronDownIcon } from '@heroicons/react/solid';
import Image from 'next/image';
import React from 'react'
import { urlFor } from '../sanity';

interface Props {
  items: Product[];
  id: string;
}

const CheckoutProduct = ({ items, id }: Props) => {
  return (
    <div>
      <div className="relative h-44 w-44">
        <Image 
        src={urlFor(items[0].image[0]).url()} 
        layout="fill" 
        objectFit="contain" 
        />
      </div>
      <div className="flex flex-1 items-end lg:items-center">
        <div className="flex-1 space-y-4">
          <div className="flex flex-col gap-x-8 text-xl lg:flex-row lg:text-2xl">
            <h4 className="font-semibold lg:w-96">{items[0].title}</h4>
            <p className="flex items-end gap-x-1 font-semibold">
              {items.length}
              <ChevronDownIcon className="w-6 h-6 text-blue-500" />
            </p>
          </div>
          <p className="flex cursor-pointer text-blue-500 hover:underline">
            Pokaż szczegóły produktu:
            <ChevronDownIcon className="w-6 h-6"/>
          </p>
        </div>
        <div>
          <h4>
            
          </h4>
        </div>
      </div>
    </div>
  )
}

export default CheckoutProduct