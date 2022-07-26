import React, { useState, useEffect } from "react";
import Link from "next/link";
// import { decrease, increase } from "../store/Actions";
import Image from "next/image";
import { getProductById } from "../pages/api/product";
import { reactLocalStorage } from "reactjs-localstorage";

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
    <tr>
      <td style={{ width: "100px", overflow: "hidden" }}>
        <Image
          src={data.images[0]}
          alt={data.images[0]}
          className="img-thumbnail w-100"
          style={{ minWidth: "80px", height: "80px" }}
          width={50}
          height={50}
        />
      </td>

      <td style={{ minWidth: "200px" }} className="w-50 align-middle">
        <h5 className="text-capitalize text-secondary">
          <Link href={`/product/${data.id}`}>
            <a>{data.title}</a>
          </Link>
        </h5>

        <h6 className="text-danger">${product.qty * product.price}</h6>
        {data.stock > 0 ? (
          <p className="mb-1 text-danger">In Stock: {data.stock}</p>
        ) : (
          <p className="mb-1 text-danger">Out Stock</p>
        )}
      </td>

      <td className="align-middle" style={{ minWidth: "150px" }}>
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
          className="btn btn-outline-secondary"
          onClick={() => handleDel()}
        >
          {" "}
          x{" "}
        </button>
      </td>

      <td
        className="align-middle"
        style={{ minWidth: "50px", cursor: "pointer" }}
      >
        <i
          className="far fa-trash-alt text-danger"
          aria-hidden="true"
          style={{ fontSize: "18px" }}
          data-toggle="modal"
          data-target="#exampleModal"
        ></i>
      </td>
    </tr>
  ) : (
    <tr>
      <td>Loading</td>
    </tr>
  );
};

export default CartItem;
