import { useGetAllProductsQuery } from "@/app/api/productApiSlice";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useState, useMemo, useEffect } from "react";

const AllProducts = () => {
  const { data: products, isLoading, isError } = useGetAllProductsQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  const navigate = useNavigate();
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);


  const uniqueBrands = useMemo(() => {
    if (!products) return [];
    const brands = products.map((p: any) => p.brand).filter(Boolean);
    return [...new Set(brands)];
  }, [products]);

  const filteredProducts = useMemo(() => {
    if (!products) return [];
    if (selectedBrands.length === 0) return products;
    return products.filter((p: any) => selectedBrands.includes(p.brand));
  }, [products, selectedBrands]);

  const handleBrandChange = (brand: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brand)
        ? prev.filter((b) => b !== brand)
        : [...prev, brand]
    );
  };

   useEffect(() => {
      document.title = " جميع المنتجات | نظام اداره مبيعات";
    }, []);

  if (isLoading) return <div className="w-full min-h-screen flex items-center justify-center text-blue-400 text-xl">جاري التحميل...</div>;
  if (isError) return <div className="w-full min-h-screen flex items-center justify-center text-red-400 text-xl">حدث خطأ أثناء جلب البيانات</div>;

  return (
    <div className="w-full p-4 min-h-screen">
      <h1 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent py-2">
        جميع المنتجات
      </h1>

      <div className="flex gap-6">
        <aside className="w-64 bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700">
          <h2 className="text-xl font-semibold mb-4 text-gray-100">فلترة حسب البراند</h2>
          <div className="space-y-3">
            {uniqueBrands.map((brand) => (
              <label key={brand as string} className="flex items-center gap-2 cursor-pointer hover:text-blue-400 transition-colors">
                <input
                  type="checkbox"
                  checked={selectedBrands.includes(brand as string)}
                  onChange={() => handleBrandChange(brand as string)}
                  className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
                />
                <span className="text-gray-200">{brand as string}</span>
              </label>
            ))}
          </div>
        </aside>

        <div className="grid grid-cols-1 text-right sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 flex-1">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product: any) => (
              <Card
                key={product._id}
                className="bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700 shadow-lg rounded-2xl p-4 flex flex-col justify-between min-h-[170px] hover:border-purple-500 hover:shadow-xl hover:shadow-purple-500/20 hover:scale-105 transition-all duration-300"
              >
                <h2 className="text-xl font-semibold text-gray-100 mb-2">{product.name}</h2>
                <p className="text-gray-200 mb-1">السعر: ${product.price}</p>
                <p className="text-gray-200 mb-1">المخزون: {product.stock}</p>
                <p className="text-gray-300 text-sm mt-auto">
                  التصنيف: <span className="font-medium text-gray-200">{product.category?.name}</span>
                </p>
                <p className="text-gray-300">البراند: {product.brand}</p>
                <Button
                  className="mt-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-md transition-all duration-300"
                  onClick={() => navigate(`/dashboard/products/${product._id}`)}
                >
                  عرض المنتج
                </Button>
              </Card>
            ))
          ) : (
            <p className="text-gray-400 text-lg col-span-full text-center">لا توجد منتجات مطابقة</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllProducts;
