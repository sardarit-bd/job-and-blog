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
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
      <div className="flex items-center justify-center min-h-[calc(100vh-8rem)] px-4 bg-gray-50 bg-gradient-to-br from-white to-slate-400">
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
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password}</p>
              )}
            </div>

            {/* Confirm Password */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <div className="mt-1 relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="password_confirmation"
                  value={form.password_confirmation}
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
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
                >
                  {showConfirmPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
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
