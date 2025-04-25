import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useCreateCustomerMutation } from "@/app/api/customerApiSlice";
import { useNavigate } from "react-router-dom";

const CustomerCreate = () => {
  const navigate = useNavigate();

  // Use separate state hooks for each field
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [comment, setComment] = useState("");

  const [createCustomer] = useCreateCustomerMutation();

  // Handle change for each individual input
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name === "name") setName(value);
    else if (name === "phone") setPhone(value);
    else if (name === "address") setAddress(value);
    else if (name === "comment") setComment(value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitting customer data...");

    try {
      // Send form data as an object
      const formData = { name, phone, address, comment };
      await createCustomer(formData).unwrap();
      console.log("Customer created successfully");
      // Navigate to the customers page after successful creation
      navigate("/customers");
    } catch (error) {
      console.error("Error during mutation:", error);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-base-200 rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">إنشاء عميل جديد</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Input
          type="text"
          name="name"
          value={name}
          onChange={handleChange}
          placeholder="الاسم"
          required
          className="w-full text-right"
        />
        <Input
          type="number"
          name="phone"
          value={phone}
          onChange={handleChange}
          placeholder="رقم الهاتف"
          required
          className="w-full text-right"
        />
        <Input
          type="text"
          name="address"
          value={address}
          onChange={handleChange}
          placeholder="العنوان"
          required
          className="w-full text-right"
        />
        <textarea
          name="comment"
          placeholder="ملاحظات (اختياري)"
          className="textarea border w-full text-right"
          value={comment}
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
