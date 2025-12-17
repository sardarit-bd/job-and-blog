import { useState } from "react";
import { router } from "@inertiajs/react";
import AppLayout from "../../layouts/AppLayout";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const [processing, setProcessing] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setProcessing(true);

    router.post("/register", form, {
      onError: (err) => setErrors(err),
      onFinish: () => setProcessing(false),
    });
  };

  return (
    <AppLayout>
      <div className="flex items-center justify-center min-h-[calc(100vh-8rem)] px-4 bg-gray-50">
        <div className="w-full max-w-md rounded-2xl bg-white shadow-xl p-6 sm:p-8 border border-gray-100">
          
          {/* Header */}
          <div className="text-center mb-6">
            <h1 className="text-3xl font-extrabold text-gray-900">
              Create Account
            </h1>
            <p className="text-md text-gray-500 mt-1 font-['Poppins']">
              Register a new account
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                autoFocus
                placeholder="John Doe"
                className="
                  mt-1 w-full rounded-lg border-gray-300 shadow-sm p-2.5
                  text-gray-900 placeholder-gray-400 border 
                  focus:border-indigo-500 focus:ring-indigo-500
                "
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">{errors.name}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                placeholder="you@example.com"
                className="
                  mt-1 w-full rounded-lg border-gray-300 shadow-sm p-2.5
                  text-gray-900 placeholder-gray-400 border 
                  focus:border-indigo-500 focus:ring-indigo-500
                "
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                required
                placeholder="••••••••"
                className="
                  mt-1 w-full rounded-lg border-gray-300 shadow-sm p-2.5
                  text-gray-900 placeholder-gray-400 border
                  focus:border-indigo-500 focus:ring-indigo-500
                "
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password}</p>
              )}
            </div>

            {/* Password Confirmation */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <input
                type="password"
                name="password_confirmation"
                value={form.password_confirmation}
                onChange={handleChange}
                required
                placeholder="••••••••"
                className="
                  mt-1 w-full rounded-lg border-gray-300 shadow-sm p-2.5
                  text-gray-900 placeholder-gray-400 border
                  focus:border-indigo-500 focus:ring-indigo-500
                "
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={processing}
              className="
                w-full py-3 rounded-xl font-semibold text-white tracking-wide
                bg-blue-700 shadow-md shadow-indigo-200
                hover:bg-indigo-700
                focus:ring-4 focus:ring-indigo-500 focus:ring-opacity-50
                transition ease-in-out duration-150 disabled:opacity-60
              "
            >
              {processing ? "Registering..." : "Register"}
            </button>
          </form>

          {/* Already have account */}
          <div className="mt-6 text-center text-sm text-gray-500">
            Already have an account?
            <a href="/login" className="ml-1 font-medium text-indigo-600 hover:text-indigo-500">
              Login here
            </a>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
