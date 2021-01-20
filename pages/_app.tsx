import '../styles/globals.css'
import { Provider } from 'react-redux'
import { useStore } from '../states/Store'
import { useEffect } from 'react'


function MyApp({ Component, pageProps }) {
  const store = useStore(pageProps.initialReduxState)

  useEffect(() => {
        // Remove the server-side injected CSS.
      const jssStyles = document.querySelector('#jss-server-side');
      if (jssStyles) {
        jssStyles.parentElement.removeChild(jssStyles);
      }
    
  }, [])

  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  )

  
}

export default MyApp
