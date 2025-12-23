import { Head, useForm, usePage } from '@inertiajs/react';
import AppLayout from '../../layouts/AppLayout';

export default function ResetPassword({ token, email }) {
  const { flash } = usePage().props;

  const { data, setData, post, processing, errors, reset } = useForm({
    token: token,
    email: email || '',
    password: '',
    password_confirmation: '',
  });

  const submit = (e) => {
    e.preventDefault();
    post(route('password.update'), {
      onSuccess: () => reset('password', 'password_confirmation'),
    });
  };

  return (
    <AppLayout>
      <Head title="Reset Password" />
      
      {/* Background Wrapper */}
      <div className="relative flex items-center justify-center min-h-[calc(100vh-8rem)] px-4 overflow-hidden bg-slate-50">
        
        {/* Background Accents */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] rounded-full bg-[#F8721B]/70 transition-colors" />
          <div className="absolute -bottom-[10%] -right-[10%] w-[50%] h-[50%] rounded-full bg-[#F8721B]/70 transition-colors" />
        </div>

        {/* Reset Card */}
        <div className="relative z-10 w-full max-w-md bg-white rounded-2xl shadow-2xl shadow-slate-200 border border-slate-200 p-8 transition-all">
          
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold tracking-tight text-slate-900 font-['Poppins']">
              Set New Password
            </h1>
            <div className="h-1.5 w-12 bg-[#F8721B] rounded-full mt-4" />
            <p className="mt-4 text-sm text-slate-500 leading-relaxed">
              Regain access by setting a new secure password for your account.
            </p>
          </div>

          {/* Flash Error Alert */}
          {flash?.error && (
            <div className="mb-6 p-4 rounded-xl border border-red-500/20 bg-red-50 text-red-700 text-sm animate-in fade-in slide-in-from-top-2">
              {flash.error}
            </div>
          )}

          <form onSubmit={submit} className="space-y-5">
            {/* Email Field (Read-only styling) */}
            <div className="space-y-1">
              <label className="text-sm font-semibold text-slate-700">
                Email Address
              </label>
              <input
                type="email"
                value={data.email}
                disabled
                className="w-full px-4 py-2.5 rounded-xl bg-slate-100 border border-slate-200 text-slate-500 cursor-not-allowed outline-none"
              />
              {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
            </div>

            {/* New Password */}
            <div className="space-y-1">
              <label className="text-sm font-semibold text-slate-700">
                New Password
              </label>
              <input
                type="password"
                name="password"
                value={data.password}
                onChange={(e) => setData('password', e.target.value)}
                required
                autoFocus
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-[#F8721B] focus:border-transparent transition-all outline-none"
                placeholder="••••••••"
              />
              {errors.password && <p className="text-xs text-red-500">{errors.password}</p>}
            </div>

            {/* Confirm Password */}
            <div className="space-y-1">
              <label className="text-sm font-semibold text-slate-700">
                Confirm New Password
              </label>
              <input
                type="password"
                name="password_confirmation"
                value={data.password_confirmation}
                onChange={(e) => setData('password_confirmation', e.target.value)}
                required
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-[#F8721B] focus:border-transparent transition-all outline-none"
                placeholder="••••••••"
              />
              {errors.password_confirmation && <p className="text-xs text-red-500">{errors.password_confirmation}</p>}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={processing}
              className="w-full py-2 px-4 mt-2 rounded-xl font-bold text-white bg-[#F8721B] hover:bg-[#e06317] transition-all active:scale-[0.98] disabled:opacity-70 shadow-lg shadow-orange-100 cursor-pointer"
            >
              {processing ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Updating...
                </span>
              ) : (
                'Reset Password'
              )}
            </button>
          </form>

          {/* Card Footer */}
          <div className="mt-8 pt-6 border-t border-slate-100 text-center">
            <a href="/login" className="text-sm font-bold text-[#F8721B] hover:underline underline-offset-4 transition-all">
              Return to sign in
            </a>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}