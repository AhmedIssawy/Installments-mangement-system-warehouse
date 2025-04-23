import { useEffect, useState } from "react";
import { useGetAllCategoriesQuery } from "@/app/api/categoryApiSlice";
import { useGetAllProductsQuery } from "@/app/api/productApiSlice";
import { useBuyProductMutation } from "@/app/api/customerApiSlice";
import { useNavigate, useParams } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const CustomerBuying = () => {
  const navigate = useNavigate();
  const { id: customerId } = useParams();
  const { data: products = [] } = useGetAllProductsQuery();
  const { data: categories = [] } = useGetAllCategoriesQuery();
  const [buyProduct] = useBuyProductMutation();

  // State to store selected product ID
  const [selectedProductId, setSelectedProductId] = useState<string>("");

  // State to store installments for each product
  const [installments, setInstallments] = useState<{ [key: string]: number }>({});

   useEffect(() => {
      document.title = " شراء منتج لعميل | نظام اداره مبيعات";
    }, []);

  const handleBuy = async (event: React.FormEvent) => {
    event.preventDefault();

    // Get the installment value for the selected product
    const installment = String(installments[selectedProductId]) || 0;

    try {
      console.log({ customerId, selectedProductId, installment });

      // Call the buyProduct mutation here
      await buyProduct({
        customerId,
        productId: selectedProductId,
        installment,
      }).unwrap();
      // Optionally navigate to the customer page or another location
      navigate(`/customers/${customerId}`);
    } catch (error) {
      console.error(error);
    }
  };

  const handleInstallmentChange = (productId: string, value: string) => {
    const parsed = parseFloat(value);
    setInstallments((prev) => ({
      ...prev,
      [productId]: isNaN(parsed) ? 0 : parsed,
    }));
  };

  return (
    <form onSubmit={handleBuy} className="container mx-auto p-4 text-right">
      <h1 className="text-2xl font-bold mb-6 text-center">شراء منتج</h1>

      {categories.map((category: any) => {
        const filteredProducts = products.filter(
          (product: any) => product.category?._id === category._id
        );

        if (filteredProducts.length === 0) return null;

        return (
          <div key={category._id} className="mb-8">
            <h2 className="text-xl font-semibold mb-4">{category.name}</h2>

            <div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
              dir="rtl"
            >
              {filteredProducts.map((product: any) => (
                <Card
                  key={product._id}
                  className="p-4 rounded-xl shadow-md space-y-3 text-right"
                >
                  <h3 className="text-lg font-bold text-gray-800">
                    {product.name}
                  </h3>
                  <p className="text-gray-600">السعر: {product.price} جنيه</p>
                  <p className="text-gray-600">المخزون: {product.stock}</p>

                  <div>
                    <label className="block mb-1">دفعه أولى</label>
                    <Input
                      type="number"
                      min="0"
                      value={installments[product._id] || ""}
                      onChange={(e) =>
                        handleInstallmentChange(product._id, e.target.value)
                      }
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                    disabled={product.stock === 0}
                    onClick={() => setSelectedProductId(product._id)} // Store selected product ID when clicked
                  >
                    {product.stock === 0 ? "غير متاح" : "شراء"}
                  </Button>
                </Card>
              ))}
            </div>
          </div>
        );
      })}
    </form>
  );
};

export default CustomerBuying;
