import 'swiper/swiper.min.css';
import '~/common/assets/boxicons-2.0.7/css/boxicons.min.css';
import '~/App.scss';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import RoutesPage from '~/config/RoutesPage';

import Header from '~/components/header/Header';
import Footer from '~/components/footer/Footer';
import Catalog from './pages/Catalog';
import Detail from './pages/Detail';
import Home from './pages/Home';

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/:category/search/:keyword" element={<Catalog />} />
                    <Route path="/:category/:id" element={<Detail />} />
                    <Route path="/:category/" element={<Catalog />} />
                    <Route path="/" element={<Home />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
