import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useCreateCustomerMutation } from "@/app/api/customerApiSlice";
import { useNavigate } from "react-router-dom";

const CustomerCreate = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    comment: "",
  });

  const [createCustomer] = useCreateCustomerMutation();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    console.log(formData);

    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS");
    await createCustomer(formData);
    console.log("SSS");

    // navigate("/customers");
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-base-200 rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">إنشاء عميل جديد</h2>
      <form onSubmit={handleSubmit} className="flex flex-col  gap-4">
        <Input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="الاسم"
          required
          className="w-full text-right"
        />
        <Input
          type="number"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="رقم الهاتف"
          required
          className="w-full text-right"
        />
        <Input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          placeholder="العنوان"
          required
          className="w-full text-right"
        />
        <textarea
          name="comment"
          placeholder="ملاحظات (اختياري)"
          className="textarea border w-full text-right"
          value={formData.comment}
          onChange={handleChange}
        />
        <Button type="submit" color="primary" className="w-full mt-2">
          إنشاء العميل
        </Button>
      </form>
    </div>
  );
};

export default CustomerCreate;
