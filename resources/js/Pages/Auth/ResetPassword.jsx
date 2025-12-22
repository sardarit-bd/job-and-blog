import { Head, useForm, usePage } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Card, CardContent, CardDescription, CardHeader, CardFooter, CardTitle } from '@/components/ui/card';
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

      {/* Container shifted to top with padding-top */}
    <div className="
        bg-gradient-to-br from-white to-slate-400
        dark:from-slate-950 dark:via-slate-900 dark:to-slate-950
        flex items-start justify-center
        px-4
        pt-8 sm:pt-12 md:pt-16
        pb-14
        ">
  {/* Decorative Glows */}
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] rounded-full bg-indigo-500/5 blur-[120px]" />
    <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] rounded-full bg-indigo-500/5 blur-[120px]" />
  </div>

  <Card className="w-full max-w-md border-slate-200/60 dark:border-slate-800 bg-white dark:bg-slate-900/80 backdrop-blur-xl shadow-2xl shadow-indigo-500/10 animate-in fade-in slide-in-from-top-4 duration-700">
    <CardHeader className="space-y-3 pb-8 text-center">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-900/30">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6 text-indigo-600 dark:text-indigo-400"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
          />
        </svg>
      </div>
      <CardTitle className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
        Reset Password
      </CardTitle>
      <CardDescription className="text-slate-500 dark:text-slate-400 text-balance leading-relaxed">
        Please enter your new password below to regain access to your account.
      </CardDescription>
    </CardHeader>

    <CardContent>
      {/* Error Alerts */}
      {flash?.error && (
        <Alert variant="destructive" className="mb-6 animate-in fade-in slide-in-from-top-2">
          <AlertDescription>{flash.error}</AlertDescription>
        </Alert>
      )}

      <form onSubmit={submit} className="space-y-5">
        {/* Email Field (Often read-only or hidden in reset forms) */}
        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm font-medium text-slate-700 dark:text-slate-300">
            Email address
          </Label>
          <Input
            id="email"
            type="email"
            value={data.email}
            onChange={(e) => setData('email', e.target.value)}
            autoComplete="email"
            disabled
            className="h-11 bg-slate-50/50 dark:bg-slate-950/50 border-slate-200 dark:border-slate-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/10 focus:outline-none transition-all duration-200"
          />
          {errors.email && <p className="text-xs font-medium text-red-500 mt-1">{errors.email}</p>}
        </div>

        {/* New Password */}
        <div className="space-y-2">
          <Label htmlFor="password" className="text-sm font-medium text-slate-700 dark:text-slate-300">
            New Password
          </Label>
          <Input
            id="password"
            type="password"
            value={data.password}
            onChange={(e) => setData('password', e.target.value)}
            autoFocus
            autoComplete="new-password"
            disabled={processing}
            placeholder="••••••••"
            className="h-11 bg-slate-50/50 dark:bg-slate-950/50 border-slate-200 dark:border-slate-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/10 focus:outline-none transition-all duration-200"
          />
          {errors.password && <p className="text-xs font-medium text-red-500 mt-1">{errors.password}</p>}
        </div>

        {/* Confirm Password */}
        <div className="space-y-2">
          <Label htmlFor="password_confirmation" className="text-sm font-medium text-slate-700 dark:text-slate-300">
            Confirm Password
          </Label>
          <Input
            id="password_confirmation"
            type="password"
            value={data.password_confirmation}
            onChange={(e) => setData('password_confirmation', e.target.value)}
            autoComplete="new-password"
            disabled={processing}
            placeholder="••••••••"
            className="h-11 bg-slate-50/50 dark:bg-slate-950/50 border-slate-200 dark:border-slate-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/10 focus:outline-none transition-all duration-200"
          />
          {errors.password_confirmation && <p className="text-xs font-medium text-red-500 mt-1">{errors.password_confirmation}</p>}
        </div>

        <Button
          type="submit"
          disabled={processing}
          className="w-full h-11 bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98] transition-all duration-200 text-white font-medium shadow-lg shadow-indigo-500/25 mt-2"
        >
          {processing ? (
            <span className="flex items-center gap-2 justify-center">
              <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Updating Password...
            </span>
          ) : (
            'Reset Password'
          )}
        </Button>
      </form>
    </CardContent>

    <CardFooter className="flex flex-col border-t border-slate-100 dark:border-slate-800/50 mt-4 py-4">
      <a href="/login" className="text-sm text-slate-500 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400 transition-colors">
        Return to sign in
      </a>
    </CardFooter>
  </Card>
</div>
    </AppLayout>
  );
}