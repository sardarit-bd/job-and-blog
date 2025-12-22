
import { usePage } from "@inertiajs/react";
import Footer from "../components/Footer";
import Header from "../components/Header";

export default function AppLayout({ children }) {
  const { auth } = usePage().props;

  return (
    <div className="flex flex-col min-h-screen">
      <Header auth={auth} />

      {/* Main content */}
      <main className="flex-1 bg-gradient-to-br from-gray-50 to-gray-200">
        {children}
      </main>

      <Footer />
    </div>
  );
}

