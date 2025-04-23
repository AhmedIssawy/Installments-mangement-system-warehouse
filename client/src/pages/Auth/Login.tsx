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
      navigate("/", { replace: true });
      toast.success("اهلا بك في نظام اداره المبيعات");
    } catch (err: any) {
      setError(err?.data?.message || "Login failed");
      toast.error(err?.data?.error || "اسم المستخدم او كلمه المرور غير صحيحه");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md p-6 bg-white shadow rounded"
      >
        <h2 className="text-2xl mb-4 font-bold text-center">Login</h2>
        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
        <div className="mb-4">
          <label className="block mb-1 font-medium">Username</label>
          <input
            type="text"
            className="w-full border rounded px-3 py-2"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            autoFocus
          />
        </div>
        <div className="mb-6">
          <label className="block mb-1 font-medium">Password</label>
          <input
            type="password"
            className="w-full border rounded px-3 py-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <Button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 flex items-center justify-center gap-2"
          disabled={isLoading}
        >
          {isLoading ? (
            <FaCircleNotch className="animate-spin text-white text-lg" />
          ) : (
            "Login"
          )}
        </Button>
        <div className="flex items-center mt-2 space-x-2">
          <Checkbox id="terms" />
          <label
            htmlFor="terms"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Remember me
          </label>
        </div>
      </form>
    </div>
  );
};

export default Login;
