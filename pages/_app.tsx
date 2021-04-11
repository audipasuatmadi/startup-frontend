import '../styles/globals.css';
import { Provider } from 'react-redux';
import { useStore } from '../states/Store';
import Navbar from '../components/navbars/Navbar';
import { Store } from 'redux';
import { useRouter } from 'next/router';

const FinalNavbar = ({ path }: { path: string }) =>
  path !== '/articles/new' && <Navbar />;

function MyApp({ Component, pageProps }) {
  const store: Store = useStore(pageProps.initialReduxState);
  const router = useRouter();

  return (
    <Provider store={store}>
      <FinalNavbar path={router.pathname} />
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
