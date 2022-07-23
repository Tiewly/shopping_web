export const getMockData = () => {
  const baseName = ["กางเกงขายาว", "กางเกงขาสั้น", "เสื้อ", "เสื้อกล้าม"];
  const color = ["แดง", "เขียว", "ฟ้า", "เหลือง"];
  const size = ["ss", "s", "m", "l", "xl", "xxl"];
  const price = [200, 150, 180, 100];
  var ans: ProductDTO[] = [];
  baseName.map((b, i) =>
    color.map((c) =>
      size.map((s, j) =>
        ans.push({
          name: `${b}สี${c}(${s})`,
          price: price[i] + j * 10,
        })
      )
    )
  );
  return ans;
};
