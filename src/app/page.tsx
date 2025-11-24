'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useAuth, initiateAnonymousSignIn, useUser } from '@/firebase';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function LoginPage() {
  const auth = useAuth();
  const router = useRouter();
  const { user, isUserLoading } = useUser();

  useEffect(() => {
    if (user) {
      router.push('/dashboard');
    }
  }, [user, router]);

  const handleLogin = () => {
    initiateAnonymousSignIn(auth);
  };

  if (isUserLoading || user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="mx-auto w-full max-w-sm shadow-xl">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-headline text-primary">
            Bharat Bazaar
          </CardTitle>
          <CardDescription>
            Explore the marketplace as a guest
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <Button onClick={handleLogin} type="submit" className="w-full">
              Enter as Guest
            </Button>
            <p className="mt-4 text-center text-sm text-muted-foreground">
              Click the button to explore the demo.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
