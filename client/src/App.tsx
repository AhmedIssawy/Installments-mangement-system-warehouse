import { useNavigate, Outlet } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { useCheckAuthQuery, useLogoutMutation } from "./app/api/authApiSlice";
import { useEffect } from "react";
import { Button } from "./components/ui/button";
import { FaCircle } from "react-icons/fa";
const App = () => {
  const { data } = useCheckAuthQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  const [logout, { isLoading }] = useLogoutMutation();
  const navigate = useNavigate();
  useEffect(() => {
    if (data?.isAuthinticated && !data?.isAuthinticated) {
      navigate("/login");
    }
  }, [navigate]);
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      <ToastContainer />
      <div>
        <Button className="absolute z-50 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700" onClick={() => navigate("/dashboard")}>
          الصفحه الرئيسيه
        </Button>
      </div>
      {data?.isAuthinticated && (
        <>
          <Button
            className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 h-10 absolute bottom-4 z-50"
            onClick={() => {
              logout();
              navigate("/");
              toast.success("تم تسجيل الخروج بنجاح");
            }}
          >
            {isLoading ? (
              <div className="animate-spin">
                <FaCircle />
              </div>
            ) : (
              "تسجيل الخروج"
            )}
          </Button>
          <Outlet />
        </>
      )}
      {!data?.isAuthinticated && (
        <div className="absolute z-50">
          <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
            <a href="/login">تسجيل الدخول</a>
          </Button>
        </div>
      )}
    </div>
  );
};

export default App;
