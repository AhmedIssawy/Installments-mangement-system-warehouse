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
    <>
      <ToastContainer />
      <div>
        <Button className="absolute" onClick={() => navigate("/")}>
          الصفحه الرئيسيه
        </Button>
      </div>
      {data?.isAuthinticated && (
        <>
          <Button
            className="bg-blue-300 h-5  absolute bottom-0"
            onClick={() => {
              logout();
              navigate("/login");
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
        <div className="absolute">
          <Button className="bg-blue-500">
            <a href="/login">تسجيل الدخول</a>
          </Button>
        </div>
      )}
    </>
  );
};

export default App;
