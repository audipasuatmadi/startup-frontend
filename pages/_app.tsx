import '../styles/globals.css';
import { Provider } from 'react-redux';
import { useStore } from '../states/Store';
import Navbar from '../components/navbars/Navbar';
import { Store } from 'redux';
import { useRouter } from 'next/router';
import WindowProvider from '../components/wrappers/WindowProvider';

const FinalNavbar = ({ path }: { path: string }) =>
  path !== '/articles/new' && <Navbar />;

function MyApp({ Component, pageProps }) {
  const store: Store = useStore(pageProps.initialReduxState);
  const router = useRouter();

  return (
    <Provider store={store}>
      <WindowProvider>
        <FinalNavbar path={router.pathname} />
        <Component {...pageProps} />
      </WindowProvider>
    </Provider>
  );
}

export default MyApp;
