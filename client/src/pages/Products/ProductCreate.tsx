import { useState } from "react";
import { data, useNavigate, useParams } from "react-router-dom";
import { useCreateProductMutation } from "@/app/api/productApiSlice";
import { useGetCategoryByIdQuery } from "@/app/api/categoryApiSlice";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "react-toastify";

const ProductCreate = () => {
  const { id } = useParams(); // You can use this if product creation is related to a customer
  const [createProduct] = useCreateProductMutation();
  const { data: categoryData } = useGetCategoryByIdQuery(id);
  console.log(categoryData);

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [brand, setBrand] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = {
        name: name,
        price: parseFloat(price),
        category: id,
        stock: parseInt(stock),
        brand: brand,
      };
      await createProduct(data).unwrap();
      toast.success("تم إنشاء المنتج بنجاح!");
      navigate(`/products/category/${id}`);
    } catch (error) {
      console.error("فشل إنشاء المنتج:", error);
    }
  };

  return (
    <Card className="max-w-md mx-auto mt-10 p-6 space-y-4">
      <h2 className="text-xl font-bold text-center mb-4">
        إضافة منتج جديد لل{categoryData?.name}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          placeholder="اسم المنتج"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          type="number"
          placeholder="السعر"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <Input
          type="number"
          placeholder="المخزون"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
        />
        <Input
          type="text"
          placeholder="البراند"
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
        />
        <Button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white"
        >
          إنشاء المنتج
        </Button>
      </form>
    </Card>
  );
};

export default ProductCreate;
