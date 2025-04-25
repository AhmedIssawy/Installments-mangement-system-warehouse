import { useGetProductByCategoryIdQuery } from "@/app/api/productApiSlice";
import { useGetCategoryByIdQuery } from "@/app/api/categoryApiSlice";
import { useParams, useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";

const CategoryProducts = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, isLoading, isError } = useGetProductByCategoryIdQuery(id, {
    refetchOnMountOrArgChange: true,
  });
  const { data: categoryName } = useGetCategoryByIdQuery(id);
  console.log(categoryName?.name);
  

  useEffect(() => {
    if (categoryName?.name) {
      document.title = `منتجات ال${categoryName?.name} | نظام اداره مبيعات`;
    }
  }, [data]);

  if (isLoading) {
    return <div className="text-center text-blue-600">جاري التحميل...</div>;
  }

  if (isError) {
    return (
      <div className="text-center text-red-600">
        حدث خطأ أثناء تحميل المنتجات
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-6 text-center">
        منتجات ال{categoryName?.name}
      </h1>
      <div className="flex justify-center mb-4">
        <Button onClick={() => navigate(`/products/category/${id}/create`)}>
          أضافه منتج لل{categoryName?.name}
        </Button>
      </div>
      {data?.length === 0 ? (
        <p className="text-center text-gray-500">
          لا توجد منتجات في هذا التصنيف حالياً.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {data?.map((product: any) => (
            <Card
              key={product._id}
              className="p-4 border-4 shadow-md rounded-2xl hover:shadow-lg transition"
            >
              <h2 className="text-xl font-bold text-gray-800">
                {product.name}
              </h2>
              <p className="text-gray-600">السعر: {product.price} ج.م</p>
              <p className="text-gray-600">المخزون: {product.stock}</p>
              <p className="text-sm text-gray-500">
                التصنيف: {product.category?.name || "بدون تصنيف"}
              </p>
              <p> براند: {product?.brand}</p>
              <div className="mt-4 flex justify-end">
                <Button onClick={() => navigate(`/products/${product._id}`)}>
                  عرض التفاصيل
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryProducts;
