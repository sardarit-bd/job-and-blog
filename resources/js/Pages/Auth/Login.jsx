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
  const [showPassword, setShowPassword] = useState(false);

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
      <div className="flex items-center justify-center min-h-[calc(100vh-8rem)] px-4 bg-gray-50 bg-gradient-to-br from-white to-slate-400">
        
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
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1 relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  required
                  placeholder="••••••••"
                  className="
                    w-full rounded-lg border-gray-300 shadow-sm p-2.5 pr-10
                    text-gray-900 placeholder-gray-400 border
                    focus:border-indigo-500 focus:ring-indigo-500
                  "
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600 focus:outline-none"
                >
                  {showPassword ? (
                    // Eye-slash (hidden)
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  ) : (
                    // Eye (visible)
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
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
