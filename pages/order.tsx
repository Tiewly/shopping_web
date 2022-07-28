import Head from "next/head";
import OrderItem from "../components/OrderItem";
import { reactLocalStorage } from "reactjs-localstorage";
import { useState, useEffect } from "react";
import styles from "/styles/Cart.module.css";
import { Button, Card } from "react-bootstrap";
import Link from "next/link";

const Order = () => {
  const [order, setOrder] = useState<CartDTO>();
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const temp = reactLocalStorage.getObject("shopping_web_shipping") as
      | CartDTO
      | undefined;
    setOrder(temp);
  }, []);

  useEffect(() => {
    if (order) reactLocalStorage.setObject("shopping_web_shipping", order);
  }, [order]);

  useEffect(() => {
    if (order) {
      const getTotal = () => {
        const res = order.products.reduce((prev, products) => {
          return prev + products.price * products.qty;
        }, 0);
        setTotal(res);
      };
      getTotal();
    }
  }, [order]);
  return (
    <>
      <Head>
        <title>Order Page</title>
      </Head>
      <div className="mt-block container-md">
        <div className="row d-flex justify-content-center">
          <div className="col-md-6 text-secondary table-responsive">
            <h2 className="text-uppercase">Your Order</h2>
            {order && order.products && (
              <>
                {order.products.map((p) => (
                  <OrderItem product={p} key={p.id} />
                ))}
              </>
            )}
          </div>
          <div
            className={
              styles.card_custumer + " col-md-4 my-3 text-right text-secondary"
            }
          >
            <h2>Order Status</h2>
            <h6 className="text-uppercase">Name: Name</h6>
            <h6 className="text-uppercase">Mobile: Mobile</h6>
            <h6 className="text-uppercase">Address: Address</h6>
            <h3 className="my-3">
              Cart Total: <span className="text-danger">${total}</span>
            </h3>
            <Card>
              <Card.Body style={{ textAlign: "center" }}>
                <Card.Title>We have received the order</Card.Title>
                <Card.Text>Thank you for ordering with us</Card.Text>
                <Link href="/">
                  <Button className="w-100 text-uppercase" variant="danger">
                    Continue shopping
                  </Button>
                </Link>
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>
      {/* สินค้าในออเดอร์= {JSON.stringify(order)} */}
    </>
  );
};

export default Order;
