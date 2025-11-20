import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  FaShoppingCart, 
  FaMoneyBillWave, 
  FaCreditCard, 
  FaHandshake, 
  FaTruck, 
  FaHome,
  FaCouch,
  FaTv,
  FaMobileAlt,
  FaBlender,
  FaStore
} from "react-icons/fa";

const LandingPage = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <FaCreditCard className="text-4xl text-blue-500" />,
      title: "نظام تقسيط مرن",
      description: "اشتري الآن وادفع على أقساط شهرية ميسرة بدون فوائد"
    },
    {
      icon: <FaHandshake className="text-4xl text-green-500" />,
      title: "ثقة ومصداقية",
      description: "أكثر من 20 سنة من الخبرة في خدمة أهالي حلوان"
    },
    {
      icon: <FaTruck className="text-4xl text-orange-500" />,
      title: "توصيل مجاني",
      description: "خدمة توصيل سريعة ومجانية لجميع أنحاء حلوان"
    },
    {
      icon: <FaMoneyBillWave className="text-4xl text-purple-500" />,
      title: "أسعار منافسة",
      description: "أفضل الأسعار مع جودة عالية للمنتجات"
    }
  ];

  const categories = [
    { icon: <FaHome className="text-3xl" />, name: "أثاث منزلي" },
    { icon: <FaCouch className="text-3xl" />, name: "غرف نوم" },
    { icon: <FaTv className="text-3xl" />, name: "أجهزة إلكترونية" },
    { icon: <FaMobileAlt className="text-3xl" />, name: "موبايلات" },
    { icon: <FaBlender className="text-3xl" />, name: "أجهزة كهربائية" },
    { icon: <FaStore className="text-3xl" />, name: "ديكورات" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Header/Navbar */}
      <header className="fixed top-0 w-full bg-gray-900/95 backdrop-blur-sm shadow-lg z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <FaShoppingCart className="text-3xl text-blue-400" />
            <h1 className="text-2xl py-2 md:text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              مخازن الجمّال
            </h1>
          </div>
          <Button 
            onClick={() => navigate("/login")}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 font-semibold px-6 py-2 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            تسجيل الدخول
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-40 pb-20 px-4 min-h-screen flex items-center">
        <div className="container mx-auto text-center">
          <div className="mb-12 animate-fade-in">
            <h2 className="text-6xl md:text-8xl font-bold mb-8 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent leading-tight py-4">
              مخازن الجمّال
            </h2>
            <p className="text-2xl md:text-4xl text-gray-200 mb-6 font-semibold">
              وجهتك الأولى للتسوق بالتقسيط في حلوان
            </p>
            <p className="text-xl md:text-2xl text-gray-300 mb-12">
              اشتري كل ما تحتاجه الآن.. وادفع على راحتك
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button 
              onClick={() => navigate("/login")}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg px-8 py-6 rounded-full transition-all duration-300 shadow-2xl hover:shadow-3xl hover:scale-105"
            >
              ابدأ التسوق الآن
            </Button>
            <Button 
              variant="outline"
              className="border-2 border-blue-500 text-blue-300 hover:bg-blue-500/10 text-lg px-8 py-6 rounded-full transition-all duration-300"
            >
              تعرف علينا أكثر
            </Button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto text-center">
            <div className="bg-gray-800/50 backdrop-blur-sm p-4 rounded-xl border border-gray-700">
              <p className="text-3xl font-bold text-blue-400">20+</p>
              <p className="text-sm text-gray-400">سنة خبرة</p>
            </div>
            <div className="bg-gray-800/50 backdrop-blur-sm p-4 rounded-xl border border-gray-700">
              <p className="text-3xl font-bold text-green-400">5000+</p>
              <p className="text-sm text-gray-400">عميل راضي</p>
            </div>
            <div className="bg-gray-800/50 backdrop-blur-sm p-4 rounded-xl border border-gray-700">
              <p className="text-3xl font-bold text-purple-400">1000+</p>
              <p className="text-sm text-gray-400">منتج متنوع</p>
            </div>
            <div className="bg-gray-800/50 backdrop-blur-sm p-4 rounded-xl border border-gray-700">
              <p className="text-3xl font-bold text-orange-400">24/7</p>
              <p className="text-sm text-gray-400">خدمة عملاء</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
    <section className="py-24 px-4 mb-12">
      <div className="container mx-auto">
        <h3 className="text-4xl md:text-5xl py-2 font-bold text-center mb-16 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
        لماذا تختار مخازن الجمّال؟
        </h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((feature, index) => (
          <Card
            key={index}
            className="bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700 p-6 hover:border-purple-500 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/20 hover:scale-105"
          >
            <div className="flex flex-col items-center text-center gap-4">
            <div className="bg-gray-900/50 p-4 rounded-full">
              {feature.icon}
            </div>
            <h4 className="text-xl font-bold text-gray-100">{feature.title}</h4>
            <p className="text-gray-300">{feature.description}</p>
            </div>
          </Card>
        ))}
        </div>
      </div>
    </section>

      {/* Categories Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <h3 className="text-4xl py-2 font-bold text-center mb-12 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            تصفح منتجاتنا
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category, index) => (
              <Card 
                key={index}
                className="bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700 p-6 hover:border-purple-500 transition-all duration-300 cursor-pointer hover:scale-110 hover:shadow-xl hover:shadow-purple-500/20"
              >
                <div className="flex flex-col items-center text-center gap-3">
                  <div className="text-purple-400">
                    {category.icon}
                  </div>
                  <p className="text-sm font-semibold text-gray-100">{category.name}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="py-20 px-4 bg-gray-800/30">
        <div className="container mx-auto">
          <h3 className="text-4xl py-2 font-bold text-center mb-12 bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
            كيف يعمل التقسيط؟
          </h3>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="bg-gradient-to-br from-blue-600 to-blue-700 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold shadow-lg">
                1
              </div>
              <h4 className="text-xl font-bold mb-3 text-gray-100">اختر المنتج</h4>
              <p className="text-gray-300">تصفح منتجاتنا المتنوعة واختر ما يناسبك</p>
            </div>
            <div className="text-center">
              <div className="bg-gradient-to-br from-purple-600 to-purple-700 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold shadow-lg">
                2
              </div>
              <h4 className="text-xl font-bold mb-3 text-gray-100">حدد خطة التقسيط</h4>
              <p className="text-gray-300">اختر عدد الأقساط المناسب لميزانيتك</p>
            </div>
            <div className="text-center">
              <div className="bg-gradient-to-br from-green-600 to-green-700 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold shadow-lg">
                3
              </div>
              <h4 className="text-xl font-bold mb-3 text-gray-100">استلم واستمتع</h4>
              <p className="text-gray-300">نوصلك المنتج وابدأ الدفع على أقساط مريحة</p>
            </div>
          </div>
        </div>
      </section>

      {/* Location Section */}
      

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-900/50 to-purple-900/50">
        <div className="container mx-auto text-center">
          <h3 className="text-4xl md:text-5xl font-bold mb-6 text-gray-100">
            جاهز لبدء التسوق؟
          </h3>
          <p className="text-xl text-gray-200 mb-8">
            انضم لآلاف العملاء السعداء الذين يثقون في مخازن الجمّال
          </p>
          <Button 
            onClick={() => navigate("/login")}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-xl px-12 py-8 rounded-full transition-all duration-300 shadow-2xl hover:scale-110"
          >
            ابدأ الآن
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 py-12 px-4 border-t border-gray-800">
        <div className="container mx-auto">
          <div className="max-w-2xl mx-auto mb-8 text-center">
            <h4 className="text-2xl font-bold mb-4 text-gray-100">مخازن الجمّال</h4>
            <p className="text-gray-300 text-lg">
              وجهتك المفضلة للتسوق بالتقسيط في حلوان منذ أكثر من 20 عاماً
            </p>
          </div>
          
          <div className="border-t border-gray-800 pt-8 text-center">
            <p className="text-gray-300">
              © 2025 مخازن الجمّال. جميع الحقوق محفوظة.
            </p>
            <p className="text-gray-400 mt-4">
              Developed by{" "}
              <a 
                href="https://ahmedissawy.engineer" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 transition-colors font-semibold"
              >
                Ahmed Issawy
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
