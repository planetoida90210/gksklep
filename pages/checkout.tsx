import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import { useSelector } from 'react-redux'
import { selectBasketItems } from '../redux/basketSlice'
import { ChevronDownIcon } from '@heroicons/react/solid'
import { useRouter } from 'next/router';
// import Currency from 'react-currency-formatter';
// import Stripe from 'stripe';
import { Header, Button, CheckoutProduct } from '../components';
// import { fetchPostJSON } from '../utils/api-helpers';
// import getStripe from '../utils/get-stripejs';


const Checkout = () => {
  const router = useRouter();
  const items = useSelector(selectBasketItems);
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
    <div>
      <Head>
        <title>Galeria Koloru - Marszałkowska 140</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main>
        <div>
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
          </div>
        )}
      </main>
    </div>
  )
}

export default Checkout