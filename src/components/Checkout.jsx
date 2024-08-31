import { useContext } from "react";
import Modal from "./UI/Modal";
import CartContext from "../store/CartContext";
import { currencyFormatter } from "../util/formatting";
import Input from "./Input";
import Button from "./UI/Button";
import UserProgressContext from "../store/UserProgressContext";
import useHttp from "../hooks/useHttp";
import Error from "./Error";

const requestConfig = {
    method: 'POST',
    headers: {
        'Content-Type':'application/json'
    }
};

export default function Checkout() {
    const cartCtx=useContext(CartContext);
    const userProgressCtx=useContext(UserProgressContext);
    
   const {data, isLoading:isSending, error, sendRequest, clearData}= useHttp('http://localhost:3000/orders',requestConfig);

    const cartTotal = cartCtx.items.reduce((totalPrice,item)=>totalPrice+item.quantity*item.price,0)

    function handleClose() {
        userProgressCtx.hideCheckout();
    }

    function handleFinish() {
        userProgressCtx.hideCheckout();
        cartCtx.clearCart();
        clearData();
    }

    function handleSubmit(event) {
        event.preventDefault();

        const fd = new FormData(event.target);
        const customerData = Object.fromEntries(fd.entries());

        sendRequest(JSON.stringify({
            order: {
                items: cartCtx.items,
                customer: customerData
            }
        }));

    }

    let actions = (
        <>
         <Button type="button" onClick={handleClose} textOnly>Zatvori</Button>
         <Button>Kupi</Button>
        </>
    );
   
    if(isSending) {
        actions = <span>Slanje podataka o narudžbi...</span>
    }

    if(data && !error) {
        return <Modal open={userProgressCtx.progress==='checkout'} onClose={handleFinish}>
            <h2>Hvala!</h2>
            <p>Vaša narudžba je uspješna</p>
            <p>Naša ekipa će Vas uskoro kontaktirati za više detalja...</p>
        <p className="actions">
            <Button onClick={handleClose}>Uredu</Button>
        </p>
        
        </Modal>
    }
    
    return(
        <Modal onClose={handleClose} open={userProgressCtx.progress==='checkout'}>
            <form onSubmit={handleSubmit}>
                <h2>Plaćanje</h2>
                <p>Ukupni iznos: {currencyFormatter.format(cartTotal)} </p>
            

            <Input label="Ime i Prezime" type="text" id="name"/>
            <Input label="Email Adresa" type="email" id="email"/>
            <Input label="Ulica" type="text" id="street"/>
            <div className="control-row">
            <Input label="Poštanski Broj" type="text" id="postal-code"/>
            <Input label="Grad" type="text" id="city"/>
            </div>
            {error && <Error title="Greška pri slanju narudžbe..." message={error}/>}
            <p className="modal-actions">
               {actions}
            </p>
            </form>
        </Modal>
    );
}