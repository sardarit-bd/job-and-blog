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
      <div className="flex items-center justify-center min-h-[calc(100vh-8rem)] px-4">
        
        {/* Card */}
        <div className="w-full max-w-md rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 shadow-2xl p-6 sm:p-8">
          
          {/* Header */}
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-white">
              Welcome Back
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              Login to your account
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-slate-300">
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
                  mt-1 w-full rounded-lg bg-gray-600 border p-2 border border-slate-700
                  text-white placeholder-slate-500
                  focus:border-indigo-500 focus:ring-indigo-500
                "
                placeholder="you@example.com"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-400">
                  {errors.email}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-slate-300">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                required
                className="
                  mt-1 w-full rounded-lg bg-gray-600 border p-2 border-slate-700
                  text-white placeholder-slate-500
                  focus:border-indigo-500 focus:ring-indigo-500
                "
                placeholder="••••••••"
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-400">
                  {errors.password}
                </p>
              )}
            </div>

            {/* Remember + Forgot */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm text-slate-400">
                <input
                  type="checkbox"
                  name="remember"
                  checked={form.remember}
                  onChange={handleChange}
                  className="rounded border-slate-600 text-indigo-500 focus:ring-indigo-500"
                />
                Remember me
              </label>

              <a
                href="/forgot-password"
                className="text-sm text-indigo-400 hover:text-indigo-300"
              >
                Forgot password?
              </a>
            </div>

            {/* Button */}
            <button
              type="submit"
              disabled={processing}
              className="
                w-full py-2.5 rounded-lg font-semibold text-white
                bg-gradient-to-r from-indigo-500 to-purple-600
                hover:from-indigo-600 hover:to-purple-700
                focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-slate-900
                transition disabled:opacity-60
              "
            >
              {processing ? "Logging in..." : "Login"}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-6 text-center text-sm text-slate-400">
            Don’t have an account?
            <a href="/register" className="ml-1 text-indigo-400 hover:text-indigo-300">
              Sign up
            </a>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
