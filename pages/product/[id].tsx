import Head from "next/head";
import React, { useState } from "react";
import Link from "next/link";
import { getProductById } from "../api/product";
import Image from "next/image";
import { useRouter } from "next/router";
import { reactLocalStorage } from "reactjs-localstorage";
import Loading from "../../components/Loading";

const DetailProduct = () => {
  const router = useRouter();
  const { id } = router.query;
  const [data, setData] = React.useState<ProductDTO>();
  React.useEffect(() => {
    if (id) getProductById(id.toString()).then((d) => setData(d));
  }, [id]);
  return (
    <>
      <Head>
        <title>Detail Product</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* <p>Post: {JSON.stringify(data)}</p> */}
      <div className="mt-block container-md">
        {data ? (
          <div key={data.id} className="row d-flex flex-wrap mx-2">
            <div
              className="col-lg-6 d-flex justify-content-center"
              style={{ border: "1px solid #eaeaea", borderRadius: "10px" }}
            >
              <Image
                src={data.images[0]}
                alt="product img"
                width={350}
                height={320}
              />
            </div>
            <div className="col-lg-6 mt-3">
              <h3 className="card-title text-uppercase mb-2">{data.title}</h3>
              <div className="d-flex justify-content-between align-items-center">
                <h5 className="text-danger mt-1">฿{data.price}</h5>
                {/* <p className="text-danger mb-0 mx-2">In stock: {data.stock}</p> */}
              </div>
              <p>{data.description}</p>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis
                quas earum quod culpa quae totam fugit, debitis, ipsa cum labore
                doloribus dolores quaerat, minima reprehenderit porro
                consequatur quibusdam error! Quod.
              </p>
              <Link href="/cart">
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => {
                    var temp = reactLocalStorage.getObject(
                      "shopping_web_cart"
                    ) as CartDTO;
                    if (temp.products) {
                      temp.products.push({
                        id: data.id,
                        price: data.price,
                        qty: 1,
                      });
                    } else {
                      temp = {
                        id: 1,
                        products: [
                          {
                            id: data.id,
                            price: data.price,
                            qty: 1,
                          },
                        ],
                      };
                    }
                    reactLocalStorage.setObject("shopping_web_cart", temp);
                  }}
                >
                  Add to cart
                </button>
              </Link>
            </div>
          </div>
        ) : (
          <Loading />
        )}
      </div>
    </>
  );
};

export default DetailProduct;
