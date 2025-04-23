export const findProductsByIdUtility = (products, id) => {
  return products.find(
    (product) => product.product.toString() === id.toString()
  );
};
