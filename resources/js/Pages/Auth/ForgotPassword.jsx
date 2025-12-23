import { Head, useForm, usePage } from '@inertiajs/react';
import AppLayout from '../../layouts/AppLayout';

export default function ForgotPassword({ status }) {
  const { flash } = usePage().props;

  const { data, setData, post, processing, errors, reset } = useForm({
    email: '',
  });

  const submit = (e) => {
    e.preventDefault();
    post(route('password.email'), {
      onSuccess: () => reset('email'),
    });
  };

  return (
    <AppLayout>
      <Head title="Forgot Password" />
      
      {/* Background Wrapper */}
      <div className="relative flex items-center justify-center min-h-[calc(100vh-8rem)] px-4 overflow-hidden bg-slate-50">
        
        {/* Background Accents */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] rounded-full bg-[#F8721B]/70 transition-colors" />
          <div className="absolute -bottom-[10%] -right-[10%] w-[50%] h-[50%] rounded-full bg-[#F8721B]/70 transition-colors" />
        </div>

        {/* Forgot Password Card */}
        <div className="relative z-10 w-full max-w-md bg-white rounded-2xl shadow-2xl shadow-slate-200 border border-slate-200 p-8 transition-all">
          
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 font-['Poppins']">
              Reset Password
            </h1>
            <div className="h-1.5 w-12 bg-[#F8721B] rounded-full mt-4" />
            <p className="mt-4 text-sm text-slate-500 leading-relaxed">
              Enter your email and we'll send you a secure link to reset your account.
            </p>
          </div>

          {/* Alerts Area */}
          <div className="space-y-4 mb-6">
            {(flash?.success || status) && (
              <div className="p-4 rounded-xl border border-emerald-500/20 bg-emerald-50 text-emerald-700 text-sm flex items-center gap-3 animate-in fade-in slide-in-from-top-2">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                {flash?.success || status}
              </div>
            )}

            {flash?.error && (
              <div className="p-4 rounded-xl border border-red-500/20 bg-red-50 text-red-700 text-sm animate-in fade-in slide-in-from-top-2">
                {flash.error}
              </div>
            )}
          </div>

          <form onSubmit={submit} className="space-y-6">
            {/* Email Field */}
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-semibold text-slate-700">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                name="email"
                value={data.email}
                onChange={(e) => setData('email', e.target.value)}
                required
                autoFocus
                disabled={processing}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-[#F8721B] focus:border-transparent transition-all outline-none disabled:opacity-50"
                placeholder="name@company.com"
              />
              
              {/* Context-aware error handling */}
              {errors.email && !(
                errors.email.toLowerCase().includes('wait') ||
                errors.email.toLowerCase().includes('throttled') ||
                errors.email.toLowerCase().includes('many')
              ) && (
                <p className="text-xs font-medium text-red-500 mt-1">{errors.email}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={processing}
              className="w-full py-2 px-4 rounded-xl font-bold text-white bg-[#F8721B] hover:bg-[#e06317] transition-all active:scale-[0.98] disabled:opacity-70 shadow-lg shadow-orange-100 cursor-pointer"
            >
              {processing ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Sending Link...
                </span>
              ) : (
                'Send Reset Link'
              )}
            </button>
          </form>

          {/* Card Footer */}
          <div className="mt-8 pt-6 border-t border-slate-100 text-center">
            <a href="/login" className="text-sm font-bold text-[#F8721B] hover:underline underline-offset-4">
              Return to sign in
            </a>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}