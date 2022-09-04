import { ChevronDownIcon } from '@heroicons/react/solid';
import Image from 'next/image';
import React from 'react'
import { urlFor } from '../sanity';
import  Currency from 'react-currency-formatter';
import { removeFromBasket } from '../redux/basketSlice';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';


interface Props {
  items: Product[];
  id: string;
}

const CheckoutProduct = ({ items, id }: Props) => {
  const dispatch = useDispatch();

  const removeItemFromBasket = () => {
    dispatch(removeFromBasket({ id }));

    toast.error(`${items[0].title} usunięto z koszyka.`, {
      position: "bottom-center"
    })
  }

  return (
    <div className="flex flex-col gap-x-4 border-b border-gray-600 pb-5 lg:flex-row lg:items-center">
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
        <div className="flex flex-col items-end space-y-4">
          <h4 className="text-xl font-semibold lg:text-2xl">
            <Currency
            quantity={items.reduce((total,item) => total + item.price, 0)}
            currency="PLN" 
            />
          </h4>
          <button
          onClick={removeItemFromBasket}
          className="text-blue-500 hover:underline"
          >
            Usuń
          </button>
        </div>
      </div>
    </div>
  )
}

export default CheckoutProduct