import { useEffect, useState } from "react";
import {
  useCreateCategoryMutation,
  useDeleteCategoryMutation,
  useGetAllCategoriesQuery,
  useUpdateCategoryMutation,
} from "@/app/api/categoryApiSlice";
import { Button } from "../../components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const Categories = () => {
  const navigate = useNavigate();
  const [categoryName, setCategoryName] = useState("");
  const [editingCategoryId, setEditingCategoryId] = useState<string | null>(
    null
  );
  const [editedName, setEditedName] = useState("");

  const { data, isLoading, isError, refetch } = useGetAllCategoriesQuery();
  const [createCategory, { isLoading: isCreating }] =
    useCreateCategoryMutation();
  const [deleteCategory, { isLoading: isDeleting }] =
    useDeleteCategoryMutation();
  const [updateCategory] = useUpdateCategoryMutation();

   useEffect(() => {
      document.title = " الاصناف | نظام اداره مبيعات";
    }, []);

  const handleCreateCategory = async () => {
    if (!categoryName.trim()) return;
    await createCategory({ name: categoryName.trim() });
    setCategoryName("");
    refetch();
  };

  const handleDeleteCategory = async (id: string) => {
    if (confirm("هل أنت متأكد أنك تريد حذف هذه الفئة؟")) {
      await deleteCategory(id);
      refetch();
    }
  };

  const startEditing = (id: string, currentName: string) => {
    setEditingCategoryId(id);
    setEditedName(currentName);
  };

  const cancelEditing = () => {
    setEditingCategoryId(null);
    setEditedName("");
  };

  const saveEdit = async () => {
    if (editedName.trim()) {
      await updateCategory({ id: editingCategoryId!, name: editedName.trim() });
      cancelEditing();
      refetch();
      toast.success("تم التعديل بنجاح", {
        theme: "colored",
      });
    }
  };

  if (isLoading) {
    return <div className="text-center text-blue-600">جاري التحميل...</div>;
  }

  if (isError) {
    return (
      <div className="text-center text-red-600">حدث خطأ أثناء جلب البيانات</div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-semibold text-center text-gray-800 mb-8">
        إدارة الفئات
      </h1>

      {/* Create Category */}
      <div className="flex flex-col items-center mb-6">
        <div className="  mb-6 w-100 flex justify-center gap-4">
          <Input
            type="text"
            placeholder="أضف فئة جديدة"
            autoFocus
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
          />
          <Button
            onClick={handleCreateCategory}
            disabled={isCreating}
            className="w-32 bg-blue-600 text-white hover:bg-blue-700"
          >
            {isCreating ? "جارٍ الإضافة..." : "إضافة"}
          </Button>
        </div>
        <div className="flex gap-4 ">
          <Button
            className="h-20 w-50 text-lg"
            onClick={() => navigate("/products")}
          >
            عرض جميع المنتجات
          </Button>
          <Button
            className="h-20 w-50 text-lg"
            onClick={() => navigate("/customers")}
          >
            عرض جميع العملاء
          </Button>
        </div>
      </div>

      {/* Categories Grid */}
      {data?.length ? (
        <div className="grid  grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {data.map((category: any) => (
            <div
              onClick={() => navigate(`/products/category/${category._id}`)}
              key={category._id}
            >
              <Card className="bg-white border shadow-md rounded-2xl p-4 flex flex-col justify-between min-h-[150px] hover:shadow-xl transition-all">
                {editingCategoryId === category._id ? (
                  <div className="flex flex-col gap-2">
                    <Input
                      value={editedName}
                      autoFocus
                      onChange={(e) => {
                        e.stopPropagation();
                        setEditedName(e.target.value);
                      }}
                    />
                    <div className="flex justify-between">
                      <Button
                        onClick={(e) => {
                          e.stopPropagation();
                          saveEdit();
                        }}
                        className="bg-green-600 text-white hover:bg-green-700"
                      >
                        حفظ
                      </Button>
                      <Button
                        onClick={(e) => {
                          e.stopPropagation();
                          cancelEditing();
                        }}
                        className="bg-gray-400 text-white hover:bg-gray-500"
                      >
                        إلغاء
                      </Button>
                    </div>
                  </div>
                ) : (
                  <>
                    <span className="text-xl text-gray-800 mb-4 text-center">
                      {category.name}
                    </span>
                    <div className="flex justify-between">
                      <Button
                        onClick={(e) => {
                          e.stopPropagation();
                          startEditing(category._id, category.name);
                        }}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white text-sm px-3"
                      >
                        تعديل
                      </Button>
                      <Button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteCategory(category._id);
                        }}
                        disabled={isDeleting}
                        className="bg-red-500 hover:bg-red-600 text-white text-sm px-3"
                      >
                        حذف
                      </Button>
                    </div>
                  </>
                )}
              </Card>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">لا توجد فئات لعرضها</p>
      )}
    </div>
  );
};

export default Categories;
