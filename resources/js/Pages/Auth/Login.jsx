import { useState } from "react";
import { router } from "@inertiajs/react";
import AppLayout from "../../layouts/AppLayout";

export default function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
    remember: false,
  });

  const [processing, setProcessing] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setProcessing(true);

    router.post("/login", form, {
      onError: (err) => setErrors(err),
      onFinish: () => setProcessing(false),
    });
  };

  return (
    <AppLayout>
      <div className="flex items-center justify-center min-h-[calc(100vh-8rem)] px-4 bg-gray-50">
        
        {/* Card */}
        <div className="w-full max-w-md rounded-2xl bg-white shadow-xl p-6 sm:p-8 border border-gray-100">
          
          {/* Header */}
          <div className="text-center mb-6">
            <h1 className="text-3xl font-extrabold text-gray-900 font-['Poppins']">
              Welcome Back
            </h1>
            <p className="text-md text-gray-500 mt-1 font-['Poppins']">
              Sign in to your account
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            
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
                autoFocus
                className="
                  mt-1 w-full rounded-lg border-gray-300 shadow-sm p-2.5
                  text-gray-900 placeholder-gray-400 border 
                  focus:border-indigo-500 focus:ring-indigo-500
                "
                placeholder="you@example.com"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.email}
                </p>
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
                className="
                  mt-1 w-full rounded-lg border-gray-300 shadow-sm p-2.5
                  text-gray-900 placeholder-gray-400 border
                  focus:border-indigo-500 focus:ring-indigo-500
                "
                placeholder="••••••••"
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.password}
                </p>
              )}
            </div>

            {/* Remember + Forgot */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm text-gray-500">
                <input
                  type="checkbox"
                  name="remember"
                  checked={form.remember}
                  onChange={handleChange}
                  className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                Remember me
              </label>

              <a
                href="/forgot-password"
                className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
              >
                Forgot password?
              </a>
            </div>

            {/* Button */}
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
              {processing ? "Logging in..." : "Login"}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-6 text-center text-sm text-gray-500">
            Don’t have an account?
            <a href="/register" className="ml-1 font-medium text-indigo-600 hover:text-indigo-500">
              Sign up now
            </a>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
