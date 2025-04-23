// function addInstallments(customer, productId, productPrice) {
//   const targetProduct = customer.products.find(
//     (p) => p.product.toString() === productId
//   );

//   if (!targetProduct) return;

//   const total = targetProduct.installments.reduce((sum, val) => sum + val, 0);
//   targetProduct.paid = total >= productPrice;
// }

// export { addInstallments };
