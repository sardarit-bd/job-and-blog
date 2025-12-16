import AppLayout from "../layouts/AppLayout";

export default function CompanyAbout({ company }) {
  return (
    <AppLayout>
      <div className="font-['Poppins'] bg-gray-50 min-h-screen py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* ================= CARD ================= */}
          <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8">
            
            {/* ================= HEADER ================= */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:gap-6">
              {/* Logo */}
              <div className="flex justify-center sm:justify-start mb-4 sm:mb-0">
                <img
                  src={company.logo}
                  alt={company.name}
                  className="w-24 h-24 object-contain rounded-xl border p-2"
                  onError={(e) =>
                    (e.currentTarget.src =
                      "https://placehold.co/96x96/E0F2F1/0D9488?text=Logo")
                  }
                />
              </div>

              {/* Company Info */}
              <div className="flex-1 text-center sm:text-left space-y-2">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 capitalize">
                  {company.name}
                </h1>

                <a
                    href={company.website || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-2 rounded-xl text-sm font-medium border border-teal-600 text-teal-600 hover:bg-teal-600 hover:text-white transition shadow-md inline-block"
                    >
                    Visit Website
                </a>
              </div>
            </div>

            <hr className="my-6" />

            {/* ================= CONTACT INFO ================= */}
            <div className="flex my-2">
                <p className="text-gray-700 text-sm sm:text-base">
                  {company.description || "No description available."}
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm sm:text-base">
              {/* Email */}
              <div className="flex flex-col">
                <span className="font-bold text-gray-800 mb-1">Email</span>
                <a
                  href={`mailto:${company.email}`}
                  className="text-gray-900 hover:text-teal-600 transition"
                >
                  {company.email || "Not Provided"}
                </a>
              </div>

              {/* Address */}
              <div className="flex flex-col">
                <span className="font-bold text-gray-800 mb-1">Address</span>
                <p className="text-gray-900">
                  {company.address || "Not Provided"}
                </p>
              </div>
            </div>

            {/* ================= OPTIONAL CTA ================= */}
            <div className="mt-8 flex flex-wrap justify-center sm:justify-start gap-4">
              {/* <button className="px-6 py-2 rounded-xl text-sm font-medium bg-teal-600 text-white hover:bg-teal-700 transition shadow-md">
                Contact Company
              </button> */}

              {/* <button className="px-6 py-2 rounded-xl text-sm font-medium border border-teal-600 text-teal-600 hover:bg-teal-600 hover:text-white transition shadow-md">
                

              </button> */}
              
            </div>

          </div>
        </div>
      </div>
    </AppLayout>
  );
}
