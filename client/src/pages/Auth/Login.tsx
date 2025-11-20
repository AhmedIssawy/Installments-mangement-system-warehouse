import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../app/api/authApiSlice.ts";
import { Button } from "@/components/ui/button.tsx";
import { FaCircleNotch } from "react-icons/fa";
import { Checkbox } from "@/components/ui/checkbox.tsx";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    document.title = "تسجيل الدخول | نظام اداره مبيعات";
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login({ username, password }).unwrap();
      navigate("/dashboard", { replace: true });
      toast.success("اهلا بك في نظام اداره المبيعات");
    } catch (err: any) {
      setError(err?.data?.message || "Login failed");
      toast.error(err?.data?.error || "اسم المستخدم او كلمه المرور غير صحيحه");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md p-8 bg-gray-800/90 backdrop-blur-sm shadow-2xl rounded-2xl border border-gray-700"
      >
        <h2 className="text-3xl mb-6 font-bold text-center bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">تسجيل الدخول</h2>
        {error && <p className="text-red-400 mb-4 text-center bg-red-500/10 p-3 rounded-lg">{error}</p>}
        <div className="mb-5">
          <label className="block mb-2 font-medium text-gray-200">اسم المستخدم</label>
          <input
            type="text"
            className="w-full border border-gray-600 bg-gray-700/50 text-gray-100 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            autoFocus
          />
        </div>
        <div className="mb-6">
          <label className="block mb-2 font-medium text-gray-200">كلمة المرور</label>
          <input
            type="password"
            className="w-full border border-gray-600 bg-gray-700/50 text-gray-100 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <Button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 py-3 rounded-lg flex items-center justify-center gap-2 shadow-lg transition-all duration-300"
          disabled={isLoading}
        >
          {isLoading ? (
            <FaCircleNotch className="animate-spin text-lg" />
          ) : (
            "دخول"
          )}
        </Button>
        <div className="flex items-center mt-4 space-x-2 space-x-reverse">
          <Checkbox id="terms" />
          <label
            htmlFor="terms"
            className="text-sm font-medium leading-none text-gray-300 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            تذكرني
          </label>
        </div>
      </form>
    </div>
  );
};

export default Login;
