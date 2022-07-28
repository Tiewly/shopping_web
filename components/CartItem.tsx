import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { getProductById } from "../pages/api/product";
import styles from "/styles/Cart.module.css";
import Loading from "../components/Loading";

interface CartItemProps {
  product: ProductInCartDTO;
  handleAdd: Function;
  handleSub: Function;
  handleDel: Function;
}
const CartItem: React.FC<CartItemProps> = ({
  product,
  handleAdd,
  handleSub,
  handleDel,
}) => {
  const [data, setData] = useState<ProductDTO>();
  useEffect(() => {
    getProductById(product.id).then((d) => {
      if (d) setData(d);
    });
  }, [product.id]);

  return data ? (
    <table className="table my-1">
      <tbody>
        <tr className="d-flex">
          <td
            className="d-flex mx-0"
            style={{
              overflow: "hidden",
              justifyContent: "center",
            }}
          >
            <Image
              src={data.images[0]}
              alt={data.images[0]}
              className="img-thumbnail w-100"
              width={100}
              height={100}
            />
          </td>
          <td
            className="w-50 align-middle d-flex flex-direction-column justify-content-center"
            style={{
              flexDirection: "column",
            }}
          >
            <h5>
              <Link href={`/product/${data.id}`}>
                <a className="text-black">{data.title}</a>
              </Link>
            </h5>

            <h6 className="text-danger">฿{product.price}</h6>
          </td>
          <td className={styles.group}>
            <div>
              <button
                className="btn btn-outline-secondary"
                disabled={product.qty === 1 ? true : false}
                onClick={() => handleSub()}
              >
                {" "}
                -{" "}
              </button>
              <span className="px-3">{product.qty}</span>
              <button
                className="btn btn-outline-secondary"
                disabled={product.qty === data.stock ? true : false}
                onClick={() => handleAdd()}
              >
                {" "}
                +{" "}
              </button>
              <button
                className={styles.btn_del + " btn"}
                onClick={() => handleDel()}
              >
                {" "}
                X{" "}
              </button>
            </div>
            <div>
              <h6 className="text-danger mb-0 mt-2">
                Total: ฿{product.qty * product.price}
              </h6>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  ) : (
    <Loading />
  );
};

export default CartItem;
