import { useContext } from "react";
import Modal from "./UI/Modal";
import CartContext from "../store/CartContext";
import { currencyFormatter } from "../util/formatting";
import Button from "./UI/Button";
import UserProgressContext from "../store/UserProgressContext";
import CartItem from "./CartItem";

export default function Cart() {
    const cartCtx = useContext(CartContext);
    const userProgressCtx = useContext(UserProgressContext);

    const cartTotal = cartCtx.items.reduce((totalPrice,item)=>totalPrice+item.quantity*item.price,0)

    function handleCloseCart() {
        userProgressCtx.hideCart();
    }

    function handleGoToCheckout() {
        userProgressCtx.showCheckout();
    }

    return(
        <Modal className="cart" onClose={userProgressCtx.ctx === 'cart'?handleCloseCart:null} open={userProgressCtx.progress === 'cart'}>
            <h2>Vaša korpa</h2>
            <ul>
                {cartCtx.items.map((item) => <CartItem key={item.id} name={item.name} quantity={item.quantity} price={item.price} onIncrease={()=>cartCtx.addItem(item)} onDecrease={()=>cartCtx.removeItem(item.id)} />)}
            </ul>
            <p className="cart-total">{currencyFormatter.format(cartTotal)}</p>
            <p className="modal-actions">
                <Button onClick={handleCloseCart} textOnly>Zatvori</Button>
                {cartCtx.items.length >0 && (<Button onClick={handleGoToCheckout}>Idi na Plaćanje</Button>)}
            </p>
        </Modal>
    );
  
}