import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import { useSelector } from 'react-redux'
import { selectBasketItems, selectBasketTotal } from '../redux/basketSlice'
import { ChevronDownIcon } from '@heroicons/react/solid'
import { useRouter } from 'next/router';
import Currency from 'react-currency-formatter';
import { Header, Button, CheckoutProduct } from '../components';
import { Stripe } from 'stripe'
import { fetchPostJSON } from '../utils/api-helpers';
import getStripe from '../utils/get-stripejs';


const Checkout = () => {
  const router = useRouter();

  const items = useSelector(selectBasketItems);
  const basketTotal = useSelector(selectBasketTotal);

  const [groupedItemsInBasket, setGroupedItemsInBasket] = useState(
    {} as { [key: string]: Product[] });
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    const groupedItems = items.reduce((results, item) => {
      (results[item._id] = results[item._id] || []).push(item)

      return results;
    }, {} as { [key: string]: Product[] } );

    setGroupedItemsInBasket(groupedItems);
  },[items]);

  const createCheckoutSession = async () => {
    setLoading(true);

    const checkoutSession: Stripe.Checkout.Session = await fetchPostJSON("/api/checkout_sessions", {
      items: items
    });

    // internal server error
    if((checkoutSession as any).statusCode === 500) {
      console.error((checkoutSession as any).message);
      return;
    }

    // redirect to checkout
    const stripe = await getStripe()
    const { error } = await stripe!.redirectToCheckout({
      sessionId: checkoutSession.id,
    });

    console.warn(error.message);

    setLoading(false);
  }

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
          <div className="mx-5 md:mx-8">
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
                  <p>FREE</p>
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
                    <Currency quantity={basketTotal} currency="PLN" />
                  </h4>
                </div>
              </div>
              <div className="my-14 space-y-4">
                <h4 className="text-xl font-semibold">
                  Przejdź do podsumowania zamówienia:
                </h4>
                <div className="flex flex-col gap-4 md:flex-row">
                  <div className="order-2 flex flex-1 flex-col items-center rounded-xl bg-gk-dark p-8 py-12 text-center">
                    <h4 className="mb-4 flex flex-col text-xl font-semibold">
                      <span>Płać na raty</span>
                      <span>z Apple Card</span>
                      <span>
                       136zł/msc z 0% OPR
                      </span>
                    </h4>
                    <Button title="Zapłać z Apple Card odłożone w czasie" />
                    <p className="mt-2 max-w-[240px] text-[13px]">
                    0 zł / do zapłaty dzisiaj, co obejmuje podatki obowiązujące w pełnej cenie, zaliczki, koszty wysyłki i podatki.
                    </p>
                  </div>
                  <div className="flex flex-1 flex-col text-center bg-gk-dark items-center space-y-8 rounded-xl p-8 py-12 md:order-2">
                    <h4 className="mb-4 flex flex-col text-xl font-semibold">
                      Zapłać w całości
                      <span>
                        <Currency quantity={basketTotal} currency="PLN" />
                      </span>
                    </h4>
                    <Button
                    noIcon
                    loading={loading}
                    title="Zapłać za zamówienie"
                    width="w-full"
                    onClick={createCheckoutSession} 
                    />
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