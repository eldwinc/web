//configures chakra and wraps everything in Providers
import { ThemeProvider, CSSReset } from '@chakra-ui/core'
import { createClient, Provider } from "urql";
const client= createClient({
  url:'http://localhost:4000/graphql',
  fetchOptions:{
    credentials:'include' //this configuration lets u send cookies to the browser
  }
});
import theme from '../theme'

function MyApp({ Component, pageProps }:any) { //bc we're using typescript strict, we need to be more explicit, thus we needa define Component & frens' ppties as any
  return (
    <Provider value={client}>
      <ThemeProvider theme={theme}> 
          <CSSReset />
          <Component {...pageProps} />
      </ThemeProvider>
    </Provider>
  ) //ripping out ColorModeProvider fixed the random colorMode changes from light to dark
}

export default MyApp
