import '../styles/globals.css'
import {createMuiTheme, ThemeProvider} from '@material-ui/core/styles'
import Navbar from '../components/navbars/Navbar'
import { Provider } from 'react-redux'
import { useStore } from '../states/Store'


const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#484848',
      main: '#212121',
      dark: '#000000'
    }
  }
})

function MyApp({ Component, pageProps }) {
  const store = useStore(pageProps.initialReduxState)

  return (
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <Navbar />
      <Component {...pageProps} />
    </Provider>
  </ThemeProvider>
  )
}

export default MyApp
