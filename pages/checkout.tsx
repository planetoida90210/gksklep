import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import { useSelector } from 'react-redux'
import { selectBasketItems, selectBasketTotal } from '../redux/basketSlice'
import { ChevronDownIcon } from '@heroicons/react/solid'
import { useRouter } from 'next/router';
import Currency from 'react-currency-formatter';
// import Stripe from 'stripe';
import { Header, Button, CheckoutProduct } from '../components';
// import { fetchPostJSON } from '../utils/api-helpers';
// import getStripe from '../utils/get-stripejs';


const Checkout = () => {
  const router = useRouter();

  const items = useSelector(selectBasketItems);
  const basketTotal = useSelector(selectBasketTotal);

  const [groupedItemsInBasket, setGroupedItemsInBasket] = useState(
    {} as { [key: string]: Product[] });


  useEffect(() => {
    const groupedItems = items.reduce((results, item) => {
      (results[item._id] = results[item._id] || []).push(item)

      return results;
    }, {} as { [key: string]: Product[] } );

    setGroupedItemsInBasket(groupedItems);
  },[items]);


  return (
    <div className="min-h-screen overflow-hidden dark:bg-[#0f0f12] bg-[#E7ECEE]">
      <Head>
        <title>Galeria Koloru - Marszałkowska 140</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className="mx-auto max-w-5xl pb-24">
        <div className="px-5">
          <h1 className="my-4 text-3xl font-semibold lg:text-4xl">
            {items.length > 0 ? "Przejżyj swój koszyk" : "Twój koszyk jest pusty."}
          </h1>

          {items.length === 0 && (
            <Button 
            title="Kontynuuj zakupy"
            onClick={() => router.push("/")}
            />
          )}
        </div>

        {items.length > 0 && (
          <div>
            {Object.entries(groupedItemsInBasket).map(([key, items]) => (
              <CheckoutProduct key={key} items={items} id={key}/>
            ))}
            <div className="my-12 mt-6 ml-auto mx-w-3xl">
              <div className="divide-y divide-gray-600">
                <div className="pb-4">
                 <div className="flex justify-between">
                  <p>Podsumowanie zamówienia</p>
                  <p>
                    <Currency quantity={basketTotal} currency="PLN" />
                  </p>
                 </div>
                 <div className="flex justify-between">
                  <p>Wysyłka</p>
                  <p>15 zł</p>
                 </div>
                 <div className="flex justify-between">
                  <div className="flex flex-col gap-x-1 lg:flex-row">
                    <p className="flex cursor-pointer items-end text-blue-500 hover:underline">
                      Wprowadź dane wysyłki
                      <ChevronDownIcon className="h-6 w-6" />
                    </p>
                  </div>
                  <p>PLN</p>
                 </div>
                </div>
                <div className="flex justify-between pt-4 text-xl font-semibold">
                  <h4>Suma</h4>
                  <h4>
                    <Currency quantity={basketTotal + 15} currency="PLN" />
                  </h4>
                </div>
              </div>
              <div className="my-14 space-y-4">
                <h4 className="text-xl font-semibold">
                  Przejdź do podsumowania zamówienia:
                </h4>
                <div className="flex flex-col gap-4 md:flex-row">
                  <div className="order-2 flex flex-1 flex-col items-center roudend-xl bg-gk-dark p-8 py-12 text-center">
                    <h4 className="mb-4 flex flex-col text-xl font-semibold">
                      <span>Płać na raty</span>
                      <span>z Apple Card</span>
                      <span>
                       136zł/msc z 0% OPR
                      </span>
                    </h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

export default Checkout