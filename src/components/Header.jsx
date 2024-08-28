import { useContext } from 'react';
import logo from '../assets/logo.png'
import Button from './UI/Button.jsx';
import CartContext from '../store/CartContext.jsx';

export default function Header() {
   const cartCtx= useContext(CartContext);
   const totalCartItems = cartCtx.items.reduce((totalNumberOfItems, item)=>{
    return totalNumberOfItems+item.quantity;
   },0);
    return(
        <header id="main-header">
            <div id="title">
                <img src={logo} alt='Rekboo logo' />
            </div>
            <nav>
                <Button textOnly>Cart ({totalCartItems})</Button>
            </nav>
        </header>
    );
}