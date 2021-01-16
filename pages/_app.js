import '../styles/globals.css'
import {createMuiTheme, ThemeProvider} from '@material-ui/core/styles'
import { yellow } from '@material-ui/core/colors'

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
  return (
  <ThemeProvider theme={theme}>
    <Component {...pageProps} />
  </ThemeProvider>
  )
}

export default MyApp
