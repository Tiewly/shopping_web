import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { getProductById } from "../pages/api/product";
import Loading from "../components/Loading";

interface CartItemProps {
  product: ProductInCartDTO;
}
const OrderItem: React.FC<CartItemProps> = ({ product }) => {
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
            <h6 className="">
              ฿{product.price} x {product.qty}
            </h6>
            <h6 className="text-danger">
              Total: ฿{product.qty * product.price}
            </h6>
          </td>
          <td
            className="d-flex justify-content-center align-items-center"
            style={{ flexDirection: "column" }}
          >
            <i className="bi bi bi-bag-check-fill fs-3 text-success"></i>
            Order preparation
          </td>
        </tr>
      </tbody>
    </table>
  ) : (
    <Loading />
  );
};

export default OrderItem;
