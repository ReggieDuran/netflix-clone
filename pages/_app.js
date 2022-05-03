import 'styles/globals.css'
import requests from './../requests'
import Header from 'components/common/Header'
import Banner from 'components/Banner/Banner'
import Row from 'components/Row/Row'

const MyApp = ({ Component, pageProps }) => {
  return (
    <>
      <Header />
      <Banner />
      <Row 
        title="NETFLIX ORIGINALS" 
        fetchUrl={requests.fetchNetflixOriginals}
        isLargeRow
      />
      <Row title="Trending Now" fetchUrl={requests.fetchTrending} />
      <Row title="Top Rated" fetchUrl={requests.fetchTopRated} />
      <Row title="Action Movies" fetchUrl={requests.fetchActionMovies} />
      <Row title="Comedy Movies" fetchUrl={requests.fetchComedyMovies} />
      <Row title="Horror Movies" fetchUrl={requests.fetchHorrorMovies} />
      <Row title="Romance Movies" fetchUrl={requests.fetchRomanceMovies} />
      <Row title="DOcumentaries" fetchUrl={requests.fetchDocumentaries} />
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
