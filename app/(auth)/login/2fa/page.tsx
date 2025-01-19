'use client';

import { useState } from 'react';
import { Network } from 'lucide-react';
import { AuthHeader } from '@/components/layout/auth-header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useTranslations } from '@/lib/i18n/use-translations';
import { useRouter } from 'next/navigation';

export default function TwoFactorAuthPage() {
  const { t } = useTranslations();
  const [isLoading, setIsLoading] = useState(false);
  const [code, setCode] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    router.push('/dashboard');
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen">
      <AuthHeader />
      
      <div className="flex min-h-[calc(100vh-4rem)]">
        {/* Left side - 2FA Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gray-50">
          <div className="w-full max-w-md">
            <div className="text-center mb-8">
              <Network className="h-12 w-12 mx-auto text-[#1C75CD] mb-4" />
              <h2 className="text-2xl font-bold text-gray-900">{t.twoFactor.title}</h2>
              <p className="text-gray-600 mt-2">{t.twoFactor.subtitle}</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="code">{t.twoFactor.code}</Label>
                <Input
                  id="code"
                  type="text"
                  placeholder={t.twoFactor.codePlaceholder}
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  maxLength={6}
                  className="text-center text-2xl tracking-widest"
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-[#1C75CD] hover:bg-[#1661A9]"
                disabled={isLoading || code.length !== 6}
              >
                {isLoading ? t.twoFactor.verifying : t.twoFactor.verify}
              </Button>

              <div className="text-center">
                <Button variant="link" className="text-[#1C75CD] hover:text-[#1661A9]">
                  {t.twoFactor.resend}
                </Button>
              </div>
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