import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import PrivateRoute from './utils/PrivateRoute'
import { AuthProvider } from './context/AuthContext'
import './App.css'
import { HomePage , CategoriesPage} from "./pages";
import { Header , SearchBar } from './components';

import {visagePage_head , levrePage_head , yeuxPage_head } from './assets'
import LoginPage from './pages/Login/LoginPage'
import SignUpPage from './pages/SignUp/SignUpPage';
import ProfilePage from './pages/Profile/ProfilePage';

import CartPage from './pages/cart/CartPage';
import PaymentPage from './pages/Payment/PaymentPage';



import BoutiquePage from './pages/Boutique/BoutiquePage';
import ProductDetailsPage from './pages/Product/ProductDetailsPage';
import OrderDetailsPage from './pages/cart/OrederDetailsPage';


function App() {
  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <SearchBar/>
          <Header/>
          <Routes>
            <Route exact path='/' element={<HomePage /> }></Route>
            <Route path="/boutique" element={<BoutiquePage />} />

            {/* <Route path="/product/:productId" element={<ProductPage />} /> */}

            <Route path="/levre" element={<CategoriesPage categorie="levres" image={levrePage_head} title ='LÈVRES'/>} />
            <Route path="/yeux" element={<CategoriesPage categorie="yeux" image={yeuxPage_head} title ='YEUX'/>} />
            <Route path="/visage" element={<CategoriesPage categorie="visage" image={visagePage_head} title ='VISAGE'/>} />

            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/profile" element={<ProfilePage />} />

            <Route path="/cart" element={<CartPage />} />
            <Route path="/payment" element={<PrivateRoute> <PaymentPage /></PrivateRoute>} />
            {/* definir la route pour la product details */}
            <Route path="/product/:id" element={<ProductDetailsPage/>} />
            <Route path="/order-details" element={<OrderDetailsPage />} />


          </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
