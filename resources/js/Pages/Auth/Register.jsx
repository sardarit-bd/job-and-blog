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
      <div className="flex items-center justify-center min-h-[calc(100vh-8rem)] px-4">
        <div className="w-full max-w-md rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 shadow-2xl p-6 sm:p-8">
          
          {/* Header */}
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-white">
              Create Account
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              Register a new account
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-slate-300">
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
                  mt-1 w-full rounded-lg bg-gray-600 border p-2 border border-slate-700
                  text-white placeholder-slate-500
                  focus:border-indigo-500 focus:ring-indigo-500
                "
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-400">{errors.name}</p>
              )}
            </div>

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
                placeholder="you@example.com"
                className="
                  mt-1 w-full rounded-lg bg-gray-600 border p-2 border border-slate-700
                  text-white placeholder-slate-500
                  focus:border-indigo-500 focus:ring-indigo-500
                "
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-400">{errors.email}</p>
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
                placeholder="••••••••"
                className="
                  mt-1 w-full rounded-lg bg-gray-600 border p-2 border border-slate-700
                  text-white placeholder-slate-500
                  focus:border-indigo-500 focus:ring-indigo-500
                "
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-400">{errors.password}</p>
              )}
            </div>

            {/* Password Confirmation */}
            <div>
              <label className="block text-sm font-medium text-slate-300">
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
                  mt-1 w-full rounded-lg bg-gray-600 border p-2 border border-slate-700
                  text-white placeholder-slate-500
                  focus:border-indigo-500 focus:ring-indigo-500
                "
              />
            </div>

            {/* Submit */}
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
              {processing ? "Registering..." : "Register"}
            </button>
          </form>

          {/* Already have account */}
          <div className="mt-6 text-center text-sm text-slate-400">
            Already have an account?
            <a href="/login" className="ml-1 text-indigo-400 hover:text-indigo-300">
              Login
            </a>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
