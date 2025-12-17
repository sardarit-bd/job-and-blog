
import { usePage } from "@inertiajs/react";
import Footer from "../components/Footer";
import Header from "../components/Header";

export default function AppLayout({ children }) {
  const { auth } = usePage().props;

  return (
    <div className="flex flex-col min-h-screen">
      <Header auth={auth} />

      {/* Main content */}
      <main className="flex-1">
        {children}
      </main>

      <Footer />
    </div>
  );
}

