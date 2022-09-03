import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { ThemeProvider } from 'next-themes';
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import Script from 'next/script';

const MyApp = ({ Component, pageProps }: AppProps) => (
  <Provider store={store}>
    <ThemeProvider attribute="class">
      <div className="dark:bg-gk-dark bg-white min-h-screen">
        <Component {...pageProps} />
      </div>
      <Script src="https://kit.fontawesome.com/99c5f6502c.js" crossOrigin="anonymous" />
    </ThemeProvider>
  </Provider>
)

export default MyApp
