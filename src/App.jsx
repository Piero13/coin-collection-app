import { BrowserRouter } from 'react-router-dom';
import Router from './routes/Router';
import NavBar from './components/layout/NavBar';
import Banner from './components/layout/Banner';
import Footer from './components/layout/Footer';

function App() {
  return (
    <BrowserRouter>
      <Banner />
      <NavBar />
      <Router />
      <Footer />
    </BrowserRouter>
  );
}

export default App;