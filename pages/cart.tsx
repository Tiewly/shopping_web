import Head from "next/head";
import CartItem from "../components/CartItem";
import { reactLocalStorage } from "reactjs-localstorage";
import React, { useState, useEffect } from "react";
import { useModal } from "../hooks/use-modal";
import ComfirmModal from "../components/ComfirmModal";
import Loading from "../components/Loading";
import styles from "/styles/Cart.module.css";

const Cart = () => {
  const [cart, setCart] = useState<CartDTO>();
  const [total, setTotal] = useState(0);
  const [showConfirmModal, closeComfirmModal, status] = useModal(false);
  const [loading, setLoading] = useState(false);

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

  const haddleOrder = () => {
    const temp = reactLocalStorage.getObject("shopping_web_cart") as CartDTO;
    reactLocalStorage.setObject("shopping_web_shipping", temp);
    reactLocalStorage.setObject("shopping_web_cart", { ...temp, products: [] });
    setCart({ ...temp, products: [] });
    setLoading(true);
    setTimeout(() => setLoading(false), 1000);
  };

  useEffect(() => {
    if (cart) {
      const getTotal = () => {
        const res = cart.products.reduce((prev, products) => {
          return prev + products.price * products.qty;
        }, 0);
        setTotal(res);
      };
      getTotal();
    }
  }, [cart]);

  return (
    <>
      <Head>
        <title>Cart Page</title>
      </Head>
      <div className="mt-block container-md">
        <div className="row d-flex justify-content-center">
          <div className="col-md-6 text-secondary table-responsive">
            <h2 className="text-uppercase">Shopping Cart</h2>
            {loading ? (
              <Loading />
            ) : (
              cart &&
              cart.products && (
                <>
                  {cart.products.map((p, i) => (
                    <CartItem
                      product={p}
                      key={p.id}
                      handleAdd={handleAdd(i)}
                      handleSub={handleSub(i)}
                      handleDel={handleDel(i)}
                    />
                  ))}
                </>
              )
            )}
          </div>
          <div
            className={
              styles.card_custumer +
              " col-md-4 my-3 text-right text-uppercase text-secondary"
            }
          >
            <form>
              <h2>Shipping & Payment</h2>
              <label htmlFor="name">Name</label>
              <input
                type="text"
                name="name"
                id="name"
                required
                className="form-control mb-2"
                placeholder="Your name"
              />
              <label htmlFor="mobile">Phone number</label>
              <input
                type="text"
                name="phone"
                id="phone"
                required
                className="form-control mb-2"
                placeholder="Your phone number"
                // onChange={onChangePhone}
              />
              <label htmlFor="address">Address</label>
              <input
                type="text"
                name="address"
                id="address"
                required
                className="form-control mb-2"
                placeholder="Your address"
                // onChange={onChangeAddress}
              />
              <h3 className="mt-3 mb-0">
                Cart Total: <span className="text-danger">${total}</span>
              </h3>
              <div className="mb-3">
                <i className="bi bi-cash-coin fs-5"></i>
                <span> cash on delivery only</span>
              </div>
              <button
                type="submit"
                className="btn btn-danger btn-lg w-100"
                onClick={() => {
                  showConfirmModal("Order confirmation?");
                }}
                // onClick={() => {
                // var data = reactLocalStorage.getObject(
                //   "shopping_web_customer"
                // ) as CustomerDTO;
                // if (data) {
                //   data.push({
                //     name: data.name,
                //     address: data.address,
                //     phone: data.phone,
                //   });
                // } else {
                //   data.push({
                //     name: " ",
                //     address: " ",
                //     phone: " ",
                //   });
                // }
                // reactLocalStorage.setObject("shopping_web_customer", data);
                // showConfirmModal("Order confirmation?");
                // console.log(customer);
                // }}
              >
                CHECKOUT NOW!
              </button>
            </form>
          </div>
        </div>
        {/* {JSON.stringify(cart)} */}
      </div>
      <ComfirmModal
        show={status.isOpen}
        hide={closeComfirmModal}
        handleOrder={haddleOrder}
        message={status.message}
      />
    </>
  );
};

export default Cart;
