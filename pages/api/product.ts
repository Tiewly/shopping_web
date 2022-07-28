import axios from "axios";

export const getProduct = async () => {
  try {
    const res = await axios.get(process.env.NEXT_PUBLIC_API_URL + "/products");
    return res.data.products as ProductDTO[];
  } catch {
    (error: any) => console.log(error);
  }
};

export const getProductById = async (id: string | number) => {
  try {
    const res = await axios.get(
      process.env.NEXT_PUBLIC_API_URL + `/products/${id}`
    );
    return res.data as ProductDTO;
  } catch {
    (error: any) => console.log(error);
  }
};
