type CartDTO = {
  id: number;
  products: ProductInCartDTO[];
};

type ProductInCartDTO = {
  id: number;
  price: number;
  qty: number;
};
