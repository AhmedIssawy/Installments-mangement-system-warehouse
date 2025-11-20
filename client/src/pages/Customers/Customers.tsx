import { useGetAllCustomersQuery } from "@/app/api/customerApiSlice";
import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useState, useMemo, useEffect } from "react";
import { Input } from "@/components/ui/input";

const Customers = () => {
  const { data, isLoading } = useGetAllCustomersQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    document.title = " جميع العملاء | نظام اداره مبيعات";
  }, []);

  const filteredCustomers = useMemo(() => {
    if (!data) return [];
    const search = searchTerm.toLowerCase(); //فيه حاله تسجيل الاسم بالانجليزى بقا
    return data.filter((customer: any) => {
      const name = customer.name?.toLowerCase() || "";
      const phone = String(customer.phone || "");
      return name.includes(search) || phone.includes(search);
    });
  }, [data, searchTerm]);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {[...Array(6)].map((_, i) => (
          <Skeleton key={i} className="h-24 rounded-xl" />
        ))}
      </div>
    );
  }

  return (
    <div className="w-full p-4 min-h-screen">
      <h1 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent py-2">العملاء</h1>

      <div className="mb-8 flex justify-center gap-4">
        <Button onClick={() => navigate("create")} className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg transition-all duration-300">انشاء عميل جديد</Button>
        <Input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="ابحث بالاسم أو رقم الهاتف..."
          className="w-full max-w-md text-right bg-gray-700/50 border-gray-600 text-gray-100 placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredCustomers.length > 0 ? (
          filteredCustomers.map((customer: any) => (
            <Card
              key={customer._id}
              className="p-4 text-right w-full shadow-lg rounded-2xl bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700 hover:border-purple-500 hover:shadow-xl hover:shadow-purple-500/20 hover:scale-105 transition-all duration-300"
            >
              <div>
                <h2 className="text-lg font-bold text-gray-100 mb-2">
                  أسم: {customer.name}
                </h2>
                <h2 className="text-lg font-bold text-gray-200 mb-2">
                  موبايل: {customer.phone}
                </h2>
              </div>
              <Button
                variant="outline"
                className="border-2 border-blue-500 text-blue-300 hover:bg-blue-500/10 transition-all duration-300"
                onClick={() => navigate(`/dashboard/customers/${customer._id}`)}
              >
                عرض التفاصيل
              </Button>
            </Card>
          ))
        ) : (
          <p className="text-center col-span-full text-gray-400 text-lg">
            لا يوجد عملاء يطابقون البحث
          </p>
        )}
      </div>
    </div>
  );
};

export default Customers;
