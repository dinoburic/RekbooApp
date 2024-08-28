import { useContext } from 'react';
import logo from '../assets/logo.png'
import Button from './UI/Button.jsx';
import CartContext from '../store/CartContext.jsx';
import UserProgressContext from '../store/UserProgressContext.jsx';

export default function Header() {
   const cartCtx= useContext(CartContext);
   const userProgressCtx = useContext(UserProgressContext);
   
   const totalCartItems = cartCtx.items.reduce((totalNumberOfItems, item)=>{
    return totalNumberOfItems+item.quantity;
   },0);

   function handleShowCart() {
    userProgressCtx.showCart();
   }
    
   return(
        <header id="main-header">
            <div id="title">
                <img src={logo} alt='Rekboo logo' />
            </div>
            <nav>
                <Button onClick={handleShowCart} textOnly>Cart ({totalCartItems})</Button>
            </nav>
        </header>
    );
}