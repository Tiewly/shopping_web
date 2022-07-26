import axios from "axios";

export const getProduct = async () => {
  try {
    const res = await axios.get("https://dummyjson.com/products");
    return res.data.products as ProductDTO[];
  } catch {
    (error: any) => console.log(error);
  }
};

export const getProductById = async (id: string | number) => {
  try {
    const res = await axios.get(`https://dummyjson.com/products/${id}`);
    return res.data as ProductDTO;
  } catch {
    (error: any) => console.log(error);
  }
};
