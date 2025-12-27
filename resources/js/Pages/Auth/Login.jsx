import { useState } from "react";
import { router, Head } from "@inertiajs/react";
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
    // <AppLayout>
    //   <Head title="Login to your account" />
    //   <div className="relative flex items-center justify-center min-h-[calc(100vh-8rem)] px-4 overflow-hidden bg-slate-50">
        
    //   {/* Background Accents */}
    //   <div className="absolute inset-0 z-0 pointer-events-none">
    //     <div className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] rounded-full bg-[#F8721B]/80 transition-colors" />
    //     <div className="absolute -bottom-[10%] -right-[10%] w-[50%] h-[50%] rounded-full bg-[#F8721B]/80 transition-colors" />
    //   </div>

    //   {/* Login Card */}
    //   <div className="relative z-10 w-full max-w-md bg-white rounded-2xl border border-slate-200 p-8 transition-all">
        
    //     {/* Header */}
    //     <div className="mb-10">
    //       <h1 className="text-3xl font-bold tracking-tight text-slate-900 font-['Poppins']">
    //         Sign in
    //       </h1>
    //       <div className="h-1.5 w-12 bg-[#F8721B] rounded-full mt-4" />
    //     </div>

    //     <form onSubmit={handleSubmit} className="space-y-6">
    //       {/* Email Field */}
    //       <div className="space-y-2">
    //         <label className="text-sm font-semibold text-slate-700">
    //           Email Address
    //         </label>
    //         <input
    //           type="email"
    //           name="email"
    //           value={form.email}
    //           onChange={handleChange}
    //           required
    //           className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-[#F8721B] focus:border-transparent transition-all outline-none"
    //           placeholder="you@example.com"
    //         />
    //         {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
    //       </div>

    //       {/* Password Field */}
    //       <div className="space-y-2">
    //         <label className="text-sm font-semibold text-slate-700">
    //           Password
    //         </label>
    //         <div className="relative">
    //           <input
    //             type={showPassword ? "text" : "password"}
    //             name="password"
    //             value={form.password}
    //             onChange={handleChange}
    //             required
    //             className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-[#F8721B] focus:border-transparent transition-all outline-none"
    //             placeholder="••••••••"
    //           />
    //           <button
    //             type="button"
    //             onClick={() => setShowPassword(!showPassword)}
    //             className="absolute inset-y-0 right-3 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
    //           >
    //             {showPassword ? (
    //               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268-2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
    //             ) : (
    //               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
    //             )}
    //           </button>
    //         </div>
    //         {errors.password && <p className="text-xs text-red-500">{errors.password}</p>}
    //       </div>

    //       {/* Actions: Remember Me and Forgot Password */}
    //       <div className="flex items-center justify-between">
    //         <label className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer">
    //           <input
    //             type="checkbox"
    //             name="remember"
    //             checked={form.remember}
    //             onChange={handleChange}
    //             className="w-4 h-4 rounded border-slate-300 text-[#F8721B] focus:ring-[#F8721B]"
    //           />
    //           <span>Stay signed in</span>
    //         </label>
    //         <a href="/forgot-password" size="sm" className="text-sm font-semibold text-[#F8721B] hover:underline">
    //           Forgot password?
    //         </a>
    //       </div>

    //       {/* Submit Button */}
    //       <button
    //         type="submit"
    //         disabled={processing}
    //         className="w-full py-2 px-4 rounded-xl font-bold text-white bg-[#F8721B] hover:bg-[#e06317] transition-all active:scale-[0.98] disabled:opacity-70 shadow-lg shadow-orange-100 cursor-pointer"
    //       >
    //         {processing ? "Verifying..." : "Sign In"}
    //       </button>
    //     </form>

    //     {/* Card Footer Divider */}
    //     <div className="mt-8 pt-6 border-t border-slate-100 text-center">
    //       <p className="text-slate-600 text-sm">
    //         New here?{' '}
    //         <a href="/register" className="font-bold text-[#F8721B] hover:underline underline-offset-4">
    //           Create an account
    //         </a>
    //       </p>
    //     </div>
    //   </div>
    // </div>
    // </AppLayout>

    <AppLayout>
  <Head title="Login to your account" />
  {/* Unified wrapper: min-h-screen and py-12 ensures identical spacing */}
  <div className="relative flex items-center justify-center min-h-screen px-4 py-12 overflow-hidden bg-slate-50">
    
    {/* Background Accents */}
    <div className="absolute inset-0 z-0 pointer-events-none">
      <div className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] rounded-full bg-[#F8721B]/80 transition-colors" />
      <div className="absolute -bottom-[10%] -right-[10%] w-[50%] h-[50%] rounded-full bg-[#F8721B]/80 transition-colors" />
    </div>

    {/* Login Card */}
    <div className="relative z-10 w-full max-w-md bg-white rounded-2xl border border-slate-200 p-8 transition-all">
      
      <div className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 font-['Poppins']">
          Sign in
        </h1>
        <div className="h-1.5 w-12 bg-[#F8721B] rounded-full mt-4" />
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700">Email Address</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-[#F8721B] focus:border-transparent transition-all outline-none"
            placeholder="you@example.com"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700">Password</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-[#F8721B] focus:border-transparent transition-all outline-none"
              placeholder="••••••••"
            />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer">
            <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-[#F8721B] focus:ring-[#F8721B]" />
            <span>Stay signed in</span>
          </label>
          <a href="#" className="text-sm font-semibold text-[#F8721B] hover:underline">Forgot password?</a>
        </div>

        <button type="submit" className="w-full py-2.5 px-4 rounded-xl font-bold text-white bg-[#F8721B] hover:bg-[#e06317] transition-all active:scale-[0.98] shadow-lg shadow-orange-100">
          Sign In
        </button>
      </form>

      <div className="mt-8 pt-6 border-t border-slate-100 text-center">
        <p className="text-slate-600 text-sm">
          New here? <a href="/register" className="font-bold text-[#F8721B] hover:underline">Create an account</a>
        </p>
      </div>
    </div>
  </div>
</AppLayout>
  );
}