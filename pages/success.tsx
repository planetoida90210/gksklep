import React,{ useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { useTheme } from 'next-themes';
import { useRouter } from 'next/router';
import Currency from 'react-currency-formatter';

import images from '../assets/app'
import { CheckIcon } from '@heroicons/react/solid';
import { Button } from '../components';
import { useMediaQuery } from 'react-responsive';
import { ChevronDownIcon, ChevronUpIcon, ShoppingCartIcon } from '@heroicons/react/outline';
import { GetServerSideProps } from 'next';
import { fetchLineItems } from '../utils/fetchLineItems';

interface Props {
  products: StripeProduct[]
}

const Success = ({products}: Props) => {
  const { theme, setTheme } = useTheme();
  const router = useRouter();
  const {session_id} = router.query;
  const [mounted, setMounted] = useState(false);
  const [showOrderSummary, setShowOrderSummary] = useState(false);
  const subtotal = products.reduce((acc, product) => acc + product.price.unit_amount / 100, 0);

  useEffect(() => {
    setMounted(true);
  }, [])

  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1024px)" });

  const showOrderSummaryCondition = isTabletOrMobile ? showOrderSummary : true;

  const handleShowOrderSummary = () => {
    setShowOrderSummary(prev => !prev)
  }

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
      <main className="grid grid-cols-1 lg:grid-cols-9">
        <section className="order-2 mx-auto max-w-xl pb-12 lg:mx-0 lg:max-w-none lg:col-span-5 lg:pr-16 lg:pt-16 xl:pl-16 2xl:pl-44">
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
          <div className="mx-4 divide-y dark:divide-gray-500 divide-gray-300 rounded-md border dark:border-gray-500 border-gray-300 p-4 lg:ml-14">
            <div className="space-y-2 pb-3">
              <p>Twoje zamówienie zostało potwierdzone.</p>
              <p className="text-sm dark:text-gray-300 text-gray-600">Twoje zamówienie zostało zaakceptowane, własnie je przygotowywujemy. Daj nam chwilkę - usiądź
                wygodnie i poczekaj na złożenie zamówienia przez sprzedawcę.
              </p>
            </div>
            <div className="pt-3 text-sm">
              <p className="font-medium dark:text-gray-300 text-gray-600">
                Zamówienie nr:
              </p>
              <p>GK#{session_id?.slice(-5)}</p>
            </div>
          </div>
          <div className="my-4 mx-4 space-y-2 rounded-md border dark:border-gray-500 border-gray-600 p-4 lg:ml-14">
            <p>Status zamówienia</p>
            <p className="text-sm dark:text-gray-300 text-gray-600">
              Potwierdzenie otrzymania zamówienia dostaniesz na maila lub SMS.
            </p>
          </div>
          <div className="mx-4 flex flex-col items-center justify-between text-sm lg:ml-14 lg:flex-row">
            <p className="hidden lg:inline">Potrzebujesz pomocy? Skontaktuj się z nami.</p>
            {mounted && (
            <Button
              title="Wróć do sklepu"
              onClick={() => router.push("/")}
              width={isTabletOrMobile ? "w-full" : undefined}
              padding="py-4"
            />
            )}
          </div>
        </section>
        {mounted && (
          <section className="overflow-y-auto border-y border-l dark:border-gray-500 border-gray-300 bg-[#35383C] lg:order-2 lg:col-span-4 lg:h-screen lg:border-y-0">
            <div className={`w-full ${showOrderSummaryCondition && "border-b"} dark:border-gray-500 border-gray-300 text-sm lg:hidden`}>
              <div className="mx-auto flex max-x-xl items-center justify-between px-4 py-6">
                <button
                  onClick={handleShowOrderSummary}
                  className="flex items-center space-x-2"
                >
                  <ShoppingCartIcon className="h-6 w-6"/>
                  <p>Pokaż podsumowanie zamówienia</p>
                  {showOrderSummaryCondition ? (
                    <ChevronUpIcon className="h-4 w-4"/>
                  ) : (
                    <ChevronDownIcon className="h-4 w-4"/>
                  )
                }
                </button>
                <p className="text-xl font-medium dark:text-white text-black">
                  <Currency quantity={subtotal} currency="PLN" />
                </p>
              </div>
            </div>
            {showOrderSummaryCondition && (
              <div className="mx-auto max-w-xl divide-y dark:border-gray-500 border-gray-300 px-4 py-4 lg:mx-0 lg:max-w-lg lg:px-10 lg:py-16">
                <div className="space-y-4 pb-4">
                  {products.map((product) => (
                    <div key={product.id} className="flex items-center space-x-4 text-sm font-medium">
                      <div className="relative flex h-16 w-16 items-center justify-center rounded-md border-2 dark:border-[#232425] border-gray-500 dark:bg-[#525655] text-xs dark:text-white text-gray-200">
                        <div className="relative h-11 w-11 animate-bounce rounded-md">
                          <Image src={images.logo} layout="fill" objectFit="contain"/>
                        </div>
                        <div className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-[gray] text-xs">
                          {product.quantity}
                        </div>
                      </div>
                      <p className="flex-1">{product.description}</p>
                      <Currency
                        quantity={product.price.unit_amount / 100}
                        currency={product.currency} 
                      />
                    </div>
                  ))}
                </div>
                <div className="space-y-1 py-4">
                  <div className="flex justify-between text-sm">
                    <p className="text-gray-300">Suma</p>
                    <p>
                      <Currency quantity={subtotal} currency="PLN"/>
                    </p>
                  </div>
                  <div className="flex justify-between text-sm">
                    <p className="text-gray-300">Rabat</p>
                    <p className="text-gray-300">-</p>
                  </div>
                  <div className="flex justify-between text-sm">
                    <p className="text-gray-300">Wysyłka</p>
                    <p className="font-medium">-</p>
                  </div>
                </div>
                <div className="flex justify-between pt-4">
                  <p>Suma łączna</p>
                  <p className="flex items-center gap-x-2 text-xs text-gray-300">
                    <span className="text-xl font-medium text-white">
                      <Currency quantity={subtotal} currency="PLN"/>
                    </span>
                  </p>
                </div>
              </div>
            )}
          </section>
        )}
      </main>
    </div>
  )
}

export default Success;

export const getServerSideProps: GetServerSideProps<Props> = async ({query}) => {
  const sessionId = query.session_id as string
  const products = await fetchLineItems(sessionId)

  return{
    props: {
      products,
    },
  };
};