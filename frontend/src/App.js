import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import { HomeScreen } from './screens/HomeScreen';
import { ProductScreen } from './screens/ProductScreen';
import { CartScreen } from './screens/CartScreen';
import { ProductsScreen } from './screens/ProductsScreen';
import { PaymentScreen } from './screens/PaymentScreen';
import { PlaceorderScreen } from './screens/PlaceorderScreen';

function App() {
  return (
    <BrowserRouter>
    <div className="grid-container">
    <header className="header">
        <div className="brand">
            <Link to="/">Rachel</Link>
        </div>
        <div className="header-links">
            <a href="cart">Cart</a>
        </div>
    </header>
    <main className="main">
        <div className="content">
            <Route path="/placeorder" component={PlaceorderScreen} />
            <Route path="/payment" component={PaymentScreen} />
            <Route path="/products" component={ProductsScreen} />
            <Route path="/product/:id" component={ProductScreen} />
            <Route path="/cart/:id?" component={CartScreen} />
            <Route path="/" exact={true} component={HomeScreen} />
        </div>
    </main>
    <footer className="footer">
        All right reserved.
    </footer>
</div>
</BrowserRouter>
  );
}

export default App;
