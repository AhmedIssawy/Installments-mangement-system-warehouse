import {
  useGetCustomerByIdQuery,
  useAddInstallmentMutation,
  useUpdateCustomerMutation,
} from "@/app/api/customerApiSlice";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import moment from "moment/min/moment-with-locales";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FcPaid } from "react-icons/fc";
import { MdDangerous } from "react-icons/md";
import { toast } from "react-toastify";

moment.locale("ar");

const Customer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, isLoading, isError, refetch } = useGetCustomerByIdQuery(id, {
    refetchOnMountOrArgChange: true,
  });
  console.log(data);

  const [addInstallment] = useAddInstallmentMutation();
  const [updateCustomer] = useUpdateCustomerMutation();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [comment, setComment] = useState("");
  const [installment, setInstallment] = useState("");
  //Ui
  const [showInstallments, setShowInstallments] = useState(false);
  const [showProducts, setShowProducts] = useState(false);
  // totals...
  const [totalRemaining, setTotalRemaining] = useState(0);
  const [totalPaid, setTotalPaid] = useState(0);
  const [totalPurchases, setTotalPurchases] = useState(0);

   useEffect(() => {
      document.title = " اداره العميل | نظام اداره مبيعات";
    }, []);

  useEffect(() => {
    if (data) {
      setName(data.name || "");
      setPhone(data.phone || "");
      setAddress(data.address || "");
      setComment(data.comment || "");
    }
  }, [data]);

  useEffect(() => {
    if (data?.products) {
      let paid = 0,
        remaining = 0,
        purchases = 0;
      data.products.forEach((p: any) => {
        const price = p.product.price || 0;
        purchases += price;
        const productPaid = p.installments.reduce(
          (sum: number, ins: any) => sum + ins.amount,
          0
        );
        paid += productPaid;
        remaining += price - productPaid;
      });
      setTotalPaid(paid);
      setTotalRemaining(remaining);
      setTotalPurchases(purchases);
    }
  }, [data?.products]);

  const handleUpdate = async () => {
    const customer = {
      name: name.trim(),
      phone: phone,
      address: address.trim(),
      comment: comment.trim(),
    };
    // console.log(customer);

    await updateCustomer({
      id,
      customer,
    });
    toast.success("تم تحديث بيانات العميل بنجاح", {
      theme: "dark",
    });
    refetch();
  };

  const handleInstallmentChange = (value: string) => {
    const num = parseFloat(value);

    setInstallment(num);
  };

  const handleAddInstallment = async (productId: string) => {
    const customerId = String(id);
    if(!installment){
      return toast.error("اضف قيمه للقسط")
    }
    await addInstallment({ customerId, productId, installment });
    setInstallment("");
    toast.success(`تم اضافه القسط بنجاح بقيمه  ${installment} جنيه`, {
      theme: "dark",
    });
    refetch();
  };

  if (isLoading)
    return <div className="text-center text-blue-600">جاري التحميل...</div>;
  if (isError)
    return (
      <div className="text-center text-red-600">حدث خطأ أثناء تحميل العميل</div>
    );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6 text-center">تفاصيل العميل</h1>
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Products */}
        <div className="lg:w-1/2 w-full order-2 lg:order-1">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">المنتجات المرتبطة</h2>
            <Button
              onClick={() => navigate(`/customers/${id}/buy`)}
              className="w-32 h-12"
            >
              اضافة منتج
            </Button>
          </div>
          <div className="text-lg border-b font-semibold">
            مجموع المشتريات: {totalPurchases} جنيه
          </div>
          <div className="text-lg border-b mt-2 font-semibold">
            مجموع الاقساط المدفوعه: {totalPaid} جنيه
          </div>
          <div className="text-lg border-b mt-2 font-semibold">
            مجموع المتبقي: {totalRemaining} جنيه
          </div>
          <div className="mt-2">
            {totalRemaining <= 0 ? (
              <p className="text-green-700 flex items-center">
                <FcPaid className="mr-2" size={30} />
                تم الدفع بنجاح
              </p>
            ) : (
              <p className="text-red-700 flex items-center">
                <MdDangerous className="mr-2" size={30} />
                المتبقى يجب دفعه
              </p>
            )}
          </div>

          <div className="flex gap-5  mb-4 mt-4">
            <Button onClick={() => setShowInstallments((prev) => !prev)}>
              {!showInstallments
                ? "اظهار دفعات التقسيط +"
                : "اخفاء دفعات التقسيط -"}
            </Button>
            <Button onClick={() => setShowProducts((prev) => !prev)}>
              {!showProducts ? "اظهار المنتجات  +" : "اخفاء المنتجات  -"}
            </Button>
          </div>

          <Card className="p-4 rounded-2xl shadow-md mt-4">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleAddInstallment(data.products[0].product._id);
              }}
              className="flex items-center gap-2"
            >
              {totalRemaining > 0 && (
                <>
                  <Input
                    placeholder="قيمة القسط"
                    type="number"
                    value={installment}
                    onChange={(e) => handleInstallmentChange(e.target.value)}
                    className="w-24 mb-4"
                  />
                  <Button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    إضافة قسط
                  </Button>
                </>
              )}
            </form>

            {data.products.map((p: any) => {
              const product = p.product;
              if (!product) return null;

              return (
                <div key={product._id + 1}>
                  {showInstallments && (
                    <ol className="pl-4 text-sm list-disc mb-2">
                      {p.installments.map((ins: any, i: number) => (
                        <div key={i + 1} className="mb-2 border-b-2 pb-2">
                          <li>قيمة القسط: {ins.amount} جنيه</li>
                          <div className="flex gap-4">
                            <li>{new Date(ins.paidAt).toLocaleString()}</li>
                            <p>
                              {moment(new Date(ins.paidAt).toISOString())
                                .locale("ar")
                                .fromNow()}
                            </p>
                          </div>
                        </div>
                      ))}
                    </ol>
                  )}
                  {showProducts && (
                    <div className="border-b-2 pb-2 mb-2">
                      <div className="text-lg  font-semibold mb-2">
                        اسم المنتج: {product.name}
                      </div>
                      <div>السعر: {product.price} جنيه</div>

                      {/* only this part should be conditional */}

                      <div className="mb-2"></div>

                      {/* Add Installment Form */}
                    </div>
                  )}
                </div>
              );
            })}
          </Card>
        </div>

        {/* Customer Details */}
        <div className="lg:w-1/2 w-full order-1 lg:order-2">
          <Card className="p-6 rounded-2xl space-y-4 shadow-md">
            <div>
              <label className="block mb-1 text-gray-700">الاسم</label>
              <Input value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div>
              <label className="block mb-1 text-gray-700">الهاتف</label>
              <Input value={phone} onChange={(e) => setPhone(e.target.value)} />
            </div>
            <div>
              <label className="block mb-1 text-gray-700">العنوان</label>
              <Input
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div>
              <label className="block mb-1 text-gray-700">ملاحظات</label>
              <Input
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
            </div>
            <div className="text-sm text-gray-500 flex gap-1">
              في: {new Date(data.createdAt).toLocaleString()}
              <p>
                أنشئ {moment(new Date(data.createdAt).toISOString()).fromNow()}
              </p>
            </div>
            <div className="flex justify-end pt-4">
              <Button
                onClick={handleUpdate}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                تحديث العميل
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Customer;
