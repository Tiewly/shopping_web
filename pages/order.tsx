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
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    const name = reactLocalStorage.get("username") as string;
    const phone = reactLocalStorage.get("phone") as string;
    const address = reactLocalStorage.get("address") as string;

    setName(name);
    setPhone(phone);
    setAddress(address);
  }, []);

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
            <div className="my-3">
              <div className={styles.text_contact}>
                <h6>Name : </h6>
                <h6 className="text-info">{name}</h6>
              </div>
              <div className={styles.text_contact}>
                <h6>Phone Number : </h6>
                <h6 className="text-info">{phone}</h6>
              </div>
              <div className={styles.text_contact}>
                <h6>Address : </h6>
                <h6 className="text-info">{address}</h6>
              </div>
            </div>
            <h3 className="mb-3">
              Cart Total: <span className="text-danger">${total}</span>
            </h3>
            <Card>
              <Card.Body style={{ textAlign: "center" }}>
                <Card.Title>We have received the order</Card.Title>
                <Card.Text>Thank you for ordering with us</Card.Text>
              </Card.Body>
            </Card>
            <Link href="/">
              <Button className="w-100 text-uppercase my-3" variant="danger">
                Continue shopping
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Order;
