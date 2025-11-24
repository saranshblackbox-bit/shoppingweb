'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';

export default function LoginPage() {
  const router = useRouter();

  const handleGuestLogin = () => {
    router.push('/dashboard');
  };
  
  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    router.push('/dashboard?role=admin');
  };


  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="mx-auto w-full max-w-sm shadow-xl">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-headline text-primary">
            Bharat Bazaar
          </CardTitle>
        </CardHeader>
        <CardContent>
            <form onSubmit={handleAdminLogin} className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@example.com"
                  required
                  defaultValue="admin@example.com"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input 
                  id="password" 
                  type="password" 
                  required 
                  defaultValue="password"
                />
              </div>
              <Button type="submit" className="w-full">
                Login as Admin
              </Button>
            </form>
            <Separator className="my-4" />
             <div className="grid gap-4 text-center">
                <p className="text-sm text-muted-foreground">Or explore the marketplace as a guest</p>
                <Button onClick={handleGuestLogin} variant="secondary" className="w-full">
                  Enter as Guest
                </Button>
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
