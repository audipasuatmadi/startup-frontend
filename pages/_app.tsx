import '../styles/globals.css'
import { Provider } from 'react-redux'
import { useStore } from '../states/Store'
import Navbar from '../components/navbars/Navbar'


function MyApp({ Component, pageProps }) {
  const store = useStore(pageProps.initialReduxState)

  return (
    <Provider store={store}>
      <Navbar />
      <Component {...pageProps} />
    </Provider>
  )

  
}

export default MyApp
