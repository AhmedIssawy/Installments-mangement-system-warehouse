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

  if (isLoading) return <div className="text-center text-blue-600">جاري التحميل...</div>;
  if (isError) return <div className="text-center text-red-600">حدث خطأ أثناء جلب البيانات</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-semibold text-center text-gray-800 mb-8">
        جميع المنتجات
      </h1>

      <div className="flex gap-6">
        <aside className="w-64">
          <h2 className="text-xl font-semibold mb-4">فلترة حسب البراند</h2>
          <div className="space-y-2">
            {uniqueBrands.map((brand) => (
              <label key={brand as string} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={selectedBrands.includes(brand as string)}
                  onChange={() => handleBrandChange(brand as string)}
                />
                <span className="text-gray-700">{brand as string}</span>
              </label>
            ))}
          </div>
        </aside>

        <div className="grid grid-cols-1 text-right sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 flex-1">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product: any) => (
              <Card
                key={product._id}
                className="bg-white border shadow-md rounded-2xl p-4 flex flex-col justify-between min-h-[170px] hover:shadow-xl transition-all"
              >
                <h2 className="text-xl font-semibold text-gray-800 mb-2">{product.name}</h2>
                <p className="text-gray-600 mb-1">السعر: ${product.price}</p>
                <p className="text-gray-600 mb-1">المخزون: {product.stock}</p>
                <p className="text-gray-500 text-sm mt-auto">
                  التصنيف: <span className="font-medium text-gray-700">{product.category?.name}</span>
                </p>
                <p>البراند: {product.brand}</p>
                <Button
                  className="mt-4 bg-blue-600 hover:bg-blue-700 text-white"
                  onClick={() => navigate(`/products/${product._id}`)}
                >
                  عرض المنتج
                </Button>
              </Card>
            ))
          ) : (
            <p className="text-gray-500 col-span-full text-center">لا توجد منتجات مطابقة</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllProducts;
