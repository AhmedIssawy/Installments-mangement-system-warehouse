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
    return <div className="w-full min-h-screen flex items-center justify-center text-blue-400 text-xl">جاري التحميل...</div>;
  }

  if (isError) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center text-red-400 text-xl">حدث خطأ أثناء جلب البيانات</div>
    );
  }

  return (
    <div className="w-full p-4 min-h-screen">
      <h1 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent py-2">
        إدارة الفئات
      </h1>

      {/* Create Category */}
      <div className="flex flex-col items-center mb-8">
        <div className="mb-6 w-100 flex justify-center gap-4">
          <Input
            type="text"
            placeholder="أضف فئة جديدة"
            autoFocus
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            className="bg-gray-700/50 border-gray-600 text-gray-100 placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500"
          />
          <Button
            onClick={handleCreateCategory}
            disabled={isCreating}
            className="w-32 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
          >
            {isCreating ? "جارٍ الإضافة..." : "إضافة"}
          </Button>
        </div>
        <div className="flex gap-4">
          <Button
            className="h-20 w-50 text-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg transition-all duration-300"
            onClick={() => navigate("/dashboard/products")}
          >
            عرض جميع المنتجات
          </Button>
          <Button
            className="h-20 w-50 text-lg bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 shadow-lg transition-all duration-300"
            onClick={() => navigate("/dashboard/customers")}
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
              <Card className="bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700 shadow-lg rounded-2xl p-4 flex flex-col justify-between min-h-[150px] hover:border-purple-500 hover:shadow-xl hover:shadow-purple-500/20 hover:scale-105 transition-all duration-300">
                {editingCategoryId === category._id ? (
                  <div className="flex flex-col gap-2">
                    <Input
                      value={editedName}
                      autoFocus
                      onChange={(e) => {
                        e.stopPropagation();
                        setEditedName(e.target.value);
                      }}
                      className="bg-gray-700/50 border-gray-600 text-gray-100 focus:ring-2 focus:ring-blue-500"
                    />
                    <div className="flex justify-between">
                      <Button
                        onClick={(e) => {
                          e.stopPropagation();
                          saveEdit();
                        }}
                        className="bg-green-600 hover:bg-green-700 shadow-md transition-all duration-300"
                      >
                        حفظ
                      </Button>
                      <Button
                        onClick={(e) => {
                          e.stopPropagation();
                          cancelEditing();
                        }}
                        className="bg-gray-600 hover:bg-gray-700 shadow-md transition-all duration-300"
                      >
                        إلغاء
                      </Button>
                    </div>
                  </div>
                ) : (
                  <>
                    <span className="text-xl text-gray-100 mb-4 text-center font-semibold">
                      {category.name}
                    </span>
                    <div className="flex justify-between">
                      <Button
                        onClick={(e) => {
                          e.stopPropagation();
                          startEditing(category._id, category.name);
                        }}
                        className="bg-yellow-600 hover:bg-yellow-700 text-sm px-3 shadow-md transition-all duration-300"
                      >
                        تعديل
                      </Button>
                      <Button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteCategory(category._id);
                        }}
                        disabled={isDeleting}
                        className="bg-red-600 hover:bg-red-700 text-sm px-3 shadow-md transition-all duration-300"
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
        <p className="text-center text-gray-400 text-lg">لا توجد فئات لعرضها</p>
      )}
    </div>
  );
};

export default Categories;
