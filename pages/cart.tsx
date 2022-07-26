import Head from "next/head";
import CartItem from "../components/CartItem";
import { reactLocalStorage } from "reactjs-localstorage";
import { useState, useEffect } from "react";

const Cart = () => {
  const [cart, setCart] = useState<CartDTO>();
  useEffect(() => {
    const temp = reactLocalStorage.getObject("shopping_web_cart") as
      | CartDTO
      | undefined;
    setCart(temp);
  }, []);

  useEffect(() => {
    if (cart) reactLocalStorage.setObject("shopping_web_cart", cart);
  }, [cart]);

  const handleAdd = (index: number) => {
    return () => {
      if (!cart) return;
      var temp = [...cart.products];
      temp[index].qty += 1;
      setCart({ ...cart, products: temp });
    };
  };
  const handleSub = (index: number) => {
    return () => {
      if (!cart) return;
      var temp = [...cart.products];
      temp[index].qty -= 1;
      setCart({ ...cart, products: temp });
    };
  };
  const handleDel = (index: number) => {
    return () => {
      if (!cart) return;
      var temp = [...cart.products];
      temp.splice(index, 1);
      setCart({ ...cart, products: temp });
    };
  };

  return (
    <>
      <Head>
        <title>Cart Page</title>
      </Head>
      <div className="mt-block">
        <h2 className="text-uppercase">Shopping Cart</h2>
        <button
          onClick={() => {
            setCart({
              id: 1,
              products: [{ id: 1, price: 50, qty: 1 }],
            });
          }}
        >
          reset
        </button>
        <button
          onClick={() => {
            setCart(undefined);
          }}
        >
          clear
        </button>
        {cart && cart.products && (
          <table className="table my-3">
            <tbody>
              {cart.products.map((p, i) => (
                <CartItem
                  product={p}
                  key={p.id}
                  handleAdd={handleAdd(i)}
                  handleSub={handleSub(i)}
                  handleDel={handleDel(i)}
                />
              ))}
            </tbody>
          </table>
        )}
        {JSON.stringify(cart)}
      </div>

      {/* <div className="col-md-4 my-3 text-right text-uppercase text-secondary">
            <form>
              <h2>Shipping</h2>

              <label htmlFor="address">Address</label>
              <input type="text" name="address" id="address"
              className="form-control mb-2" value={address}
              onChange={e => setAddress(e.target.value)} />

              <label htmlFor="mobile">Mobile</label>
              <input type="text" name="mobile" id="mobile"
              className="form-control mb-2" value={mobile}
              onChange={e => setMobile(e.target.value)} />
            </form>

            <h3>Total: <span className="text-danger">${total}</span></h3>

            
            <Link href={auth.user ? '#!' : '/signin'}>
              <a className="btn btn-dark my-2" onClick={handlePayment}>Proceed with payment</a>
            </Link>
            
        </div> */}
    </>
  );
};

export default Cart;
