import { Head, useForm, usePage } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Card, CardContent, CardDescription, CardHeader, CardFooter, CardTitle } from '@/components/ui/card';
import AppLayout from '../../layouts/AppLayout'; // Keep your layout

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
        <div className="
            bg-gradient-to-br from-white to-slate-400
            dark:from-slate-950 dark:via-slate-900 dark:to-slate-950
            flex items-start justify-center
            px-4
            pt-8 sm:pt-12 md:pt-16
            pb-14
            ">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] rounded-full bg-indigo-500/5 blur-[120px]" />
            <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] rounded-full bg-indigo-500/5 blur-[120px]" />
            </div>

            <Card className="w-full max-w-md border-slate-200/60 dark:border-slate-800 bg-white dark:bg-slate-900/80 backdrop-blur-xl shadow-2xl shadow-indigo-500/10">
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
                    d="M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1 1 21.75 8.25Z"
                    />
                </svg>
                </div>
                <CardTitle className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                Forgot Password?
                </CardTitle>
                <CardDescription className="text-slate-500 dark:text-slate-400 text-balance leading-relaxed">
                Enter your email below and we'll send you a secure link to reset your account.
                </CardDescription>
            </CardHeader>

            <CardContent>
                {/* Success Alert */}
                {flash?.success || status ? (
                <Alert className="mb-6 border-emerald-500/50 bg-emerald-50/50 dark:bg-emerald-950/20 text-emerald-700 dark:text-emerald-400 animate-in fade-in slide-in-from-top-2">
                    <AlertDescription className="flex items-center gap-2 ">
                    <span className="h-2 w-2 rounded-full bg-emerald-500" />
                    {flash?.success || status}
                    </AlertDescription>
                </Alert>
                ) : null}

                {/* Flash Error Alert (e.g., from custom RateLimiter) */}
                {flash?.error && (
                <Alert variant="destructive" className="mb-6 animate-in fade-in slide-in-from-top-2 border-red-200 bg-red-100 px-2 py-1">
                    <AlertDescription className="text-red-600 dark:text-red-400">
                    {flash.error}
                    </AlertDescription>
                </Alert>
                )}

                <form onSubmit={submit} className="space-y-5">
                <div className="space-y-2">
                    <Label 
                    htmlFor="email" 
                    className="text-sm font-medium leading-none text-slate-700 dark:text-slate-300 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                    Email address
                    </Label>
                    <Input
                    id="email"
                    type="email"
                    value={data.email}
                    onChange={(e) => setData('email', e.target.value)}
                    autoFocus
                    autoComplete="username"
                    disabled={processing}
                    placeholder="name@company.com"
                    className="h-11 bg-slate-50/50 dark:bg-slate-950/50 border-slate-200 dark:border-slate-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/10 focus:outline-none transition-all duration-200"
                    />

                    {/* Regular validation errors (non-throttle) stay in small red text */}
                    {errors.email && !(
                    errors.email.toLowerCase().includes('wait') ||
                    errors.email.toLowerCase().includes('throttled') ||
                    errors.email.toLowerCase().includes('try again') ||
                    errors.email.toLowerCase().includes('many')
                    ) && (
                    <p className="text-xs font-medium text-red-500 mt-1 animate-in fade-in">
                        {errors.email}
                    </p>
                    )}
                </div>

                <Button
                    type="submit"
                    disabled={processing}
                    className="w-full h-11 bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98] transition-all duration-200 text-white font-medium shadow-lg shadow-indigo-500/25"
                >
                    {processing ? (
                    <span className="flex items-center gap-2">
                        <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Sending Link...
                    </span>
                    ) : (
                    'Send Reset Link'
                    )}
                </Button>
                </form>
            </CardContent>

            <CardFooter className="flex flex-col border-t border-slate-100 dark:border-slate-800/50 mt-4 py-4">
                <a href="/login" className="text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 font-medium transition-colors">
                Back to login
                </a>
            </CardFooter>
            </Card>
        </div>
    </AppLayout>
  );
}