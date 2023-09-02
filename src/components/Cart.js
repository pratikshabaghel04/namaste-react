import { useDispatch, useSelector } from "react-redux";
import ItemList from "./ItemList";
import { clearCart } from "../../pages/cartSlice";


const Cart = () => {
    const cartItems = useSelector((store) => store.cart.items)
    console.log(cartItems);

    const dispatch = useDispatch();

    const handlleClearCart = () => {
        dispatch(clearCart());
    }

    return (
        <div className=" text-center m-4 p-4 ">
            <h1 className="text-2xl font-bold">cart</h1>
            <div className="m-6/12 m-auto">
                <button className=" p-2 m-2  bg-black rounded-lg text-white"
                onClick={handlleClearCart}>Clear Cart</button>
                <ItemList items={cartItems}/>
            </div>
        </div>
    )
};
export default Cart;