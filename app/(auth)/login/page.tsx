'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Network } from 'lucide-react';
import { AuthHeader } from '@/components/layout/auth-header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { useTranslations } from '@/lib/i18n/use-translations';
import { useRouter } from 'next/navigation';

interface LoginForm {
  email: string;
  password: string;
  rememberMe: boolean;
}

export default function LoginPage() {
  const { t } = useTranslations();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>();

  const onSubmit = async (data: LoginForm) => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    router.push('/login/2fa');
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen">
      <div className="flex min-h-[calc(100vh-4rem)]">
        {/* Left side - Login Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gray-50">
          <div className="w-full max-w-md">
            <div className="text-center mb-8">
              <Network className="h-12 w-12 mx-auto text-[#1C75CD] mb-4" />
              <h2 className="text-2xl font-bold text-gray-900">{t.login.title}</h2>
              <p className="text-gray-600 mt-2">{t.login.subtitle}</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email">{t.login.email}</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder={t.login.emailPlaceholder}
                  {...register('email', {
                    required: t.login.errors.emailRequired,
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: t.login.errors.emailInvalid,
                    },
                  })}
                  className={errors.email ? 'border-red-500' : ''}
                />
                {errors.email && (
                  <p className="text-sm text-red-500">{errors.email.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">{t.login.password}</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder={t.login.passwordPlaceholder}
                  {...register('password', {
                    required: t.login.errors.passwordRequired,
                  })}
                  className={errors.password ? 'border-red-500' : ''}
                />
                {errors.password && (
                  <p className="text-sm text-red-500">{errors.password.message}</p>
                )}
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox id="rememberMe" {...register('rememberMe')} />
                  <Label htmlFor="rememberMe" className="text-sm">
                    {t.login.rememberMe}
                  </Label>
                </div>
                <Button variant="link" className="text-[#1C75CD] hover:text-[#1661A9]">
                  {t.login.forgotPassword}
                </Button>
              </div>

              <Button
                type="submit"
                className="w-full bg-[#1C75CD] hover:bg-[#1661A9]"
                disabled={isLoading}
              >
                {isLoading ? t.login.loading : t.login.loginButton}
              </Button>
            </form>
          </div>
        </div>

        {/* Right side - Image */}
        <div className="hidden lg:block w-1/2 bg-cover bg-center" style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&q=80")',
        }}>
          <div className="h-full w-full bg-[#1C75CD]/10 backdrop-blur-sm flex items-center justify-center p-8">
            <div className="max-w-lg text-center text-white">
              <h1 className="text-4xl font-bold mb-4 drop-shadow-lg">Project Connectivity</h1>
              <p className="text-xl drop-shadow-lg">Empowering field officers with seamless connectivity and efficient management tools.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}