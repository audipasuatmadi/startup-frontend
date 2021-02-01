import '../styles/globals.css'
import { Provider } from 'react-redux'
import { useStore } from '../states/Store'
import Navbar from '../components/navbars/Navbar'
import { Store } from 'redux'

function MyApp({ Component, pageProps }) {
  const store: Store = useStore(pageProps.initialReduxState)
  

  return (
    <Provider store={store}>
      <Navbar />
      <Component {...pageProps} />
    </Provider>
  )

  
}

export default MyApp
