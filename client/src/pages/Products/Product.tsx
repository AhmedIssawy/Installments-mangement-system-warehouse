import {
  useDeleteProductMutation,
  useGetProductByIdQuery,
  useUpdateProductMutation,
} from "@/app/api/productApiSlice";
import { useParams, useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useState, useEffect } from "react";
import { useGetAllCategoriesQuery } from "@/app/api/categoryApiSlice";

const Product = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    data: product,
    isLoading,
    isError,
    refetch,
  } = useGetProductByIdQuery(id);
  const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation();
  const [deleteProduct, { isLoading: isDeleting }] = useDeleteProductMutation();
  const { data: categories } = useGetAllCategoriesQuery();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState("");

  useEffect(() => {
    if (product) {
      setName(product.name);
      setPrice(String(product.price));
      setStock(String(product.stock));
      setSelectedCategoryId(product.category?._id);
    }
  }, [product]);

  const handleUpdate = async () => {
    if (!name.trim() || !price || !stock || !selectedCategoryId) return;

    await updateProduct({
      id,
      name: name.trim(),
      price: Number(price),
      stock: Number(stock),
      category: selectedCategoryId,
    });

    refetch();
    navigate(`/products/category/${id}`, { replace: true });
  };

  const handleDelete = async () => {
    if (confirm("هل أنت متأكد أنك تريد حذف هذا المنتج؟")) {
      await deleteProduct(id);
      navigate(`/products/category/${id}`, { replace: true });
    }
  };

  if (isLoading)
    return <div className="text-center text-blue-600">جاري التحميل...</div>;
  if (isError)
    return (
      <div className="text-center text-red-600">حدث خطأ أثناء تحميل المنتج</div>
    );

  return (
    <div className="container mx-auto p-4 max-w-xl">
      <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">
        تفاصيل المنتج
      </h1>

      <Card className="bg-white shadow-lg p-6 rounded-2xl space-y-4">
        <div>
          <label className="block mb-1 text-gray-700">اسم المنتج</label>
          <Input value={name} onChange={(e) => setName(e.target.value)} />
        </div>

        <div>
          <label className="block mb-1 text-gray-700">السعر</label>
          <Input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>

        <div>
          <label className="block mb-1 text-gray-700">المخزون</label>
          <Input
            type="number"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
          />
        </div>

        <div>
          <label className="block mb-1 text-gray-700">التصنيف</label>
          <select
            value={selectedCategoryId}
            onChange={(e) => setSelectedCategoryId(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-700"
          >
            {categories?.map((cat: any) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex justify-between pt-4">
          <Button
            onClick={handleUpdate}
            disabled={isUpdating}
            className="bg-green-600 hover:bg-green-700 text-white"
          >
            {isUpdating ? "جارٍ الحفظ..." : "حفظ التعديلات"}
          </Button>

          <Button
            onClick={handleDelete}
            disabled={isDeleting}
            className="bg-red-600 hover:bg-red-700 text-white"
          >
            حذف المنتج
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default Product;
