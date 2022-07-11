import 'swiper/swiper.min.css';
import '~/common/assets/boxicons-2.0.7/css/boxicons.min.css';
import '~/App.scss';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import RoutesPage from '~/config/RoutesPage';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Header />
                <RoutesPage />
                <Footer />
            </BrowserRouter>
        </div>
    );
}

export default App;
