
// import { usePage } from "@inertiajs/react";
// import Footer from "../components/Footer";
// import Header from "../components/Header";

// export default function AppLayout({ children }) {
//   const { auth } = usePage().props;

//   return (
//     <div className="flex flex-col min-h-screen">
//       <Header auth={auth} />

//       {/* Main content */}
//       <main className="flex-1 bg-gradient-to-br from-gray-50 to-gray-200">
//         {children}
//       </main>

//       <Footer />
//     </div>
//   );
// }


import { usePage } from "@inertiajs/react";
import Footer from "../components/Footer";
import Header from "../components/Header";

export default function AppLayout({ children }) {
  const { auth } = usePage().props;

  return (
    <div className="flex flex-col min-h-screen transition-colors duration-500 bg-white">
      <Header auth={auth} />

      {/* Modern mesh gradient background for the main content area */}
      <main className="flex-1 relative">
        {/* Subtle background decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
           <div className="absolute -top-[10%] -right-[5%] w-[30%] h-[30%] rounded-full bg-blue-100/50 blur-[100px]" />
           <div className="absolute top-[40%] -left-[5%] w-[20%] h-[20%] rounded-full bg-teal-100/50 blur-[80px]" />
        </div>

        <div className="relative z-10">
          {children}
        </div>
      </main>

      <Footer />
    </div>
  );
}