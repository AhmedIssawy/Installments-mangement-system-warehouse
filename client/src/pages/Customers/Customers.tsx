import { useGetAllCustomersQuery } from "@/app/api/customerApiSlice";
import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useState, useMemo, useEffect } from "react";
import { Input } from "@/components/ui/input";

const Customers = () => {
  const { data, isLoading } = useGetAllCustomersQuery();
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
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-6 text-center">العملاء</h1>

      <div className="mb-6 flex justify-center">
        <Input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="ابحث بالاسم أو رقم الهاتف..."
          className="w-full max-w-md text-right"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredCustomers.length > 0 ? (
          filteredCustomers.map((customer: any) => (
            <Card
              key={customer._id}
              className="p-4 text-right border-4 w-full shadow-md rounded-2xl"
            >
              <div>
                <h2 className="text-lg font-bold text-gray-800 mb-2">
                  أسم: {customer.name}
                </h2>
                <h2 className="text-lg font-bold text-gray-800 mb-2">
                  موبايل: {customer.phone}
                </h2>
              </div>
              <Button
                variant="outline"
                className="border-3"
                onClick={() => navigate(`/customers/${customer._id}`)}
              >
                عرض التفاصيل
              </Button>
            </Card>
          ))
        ) : (
          <p className="text-center col-span-full text-gray-500">
            لا يوجد عملاء يطابقون البحث
          </p>
        )}
      </div>
    </div>
  );
};

export default Customers;
