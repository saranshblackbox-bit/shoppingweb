'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarTrigger,
  SidebarInset,
} from '@/components/ui/sidebar';
import {
  Package,
  ShoppingCart,
  Users,
  Sparkles,
  PanelLeft,
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const adminNavItems = [
  {
    href: '/dashboard/admin/products',
    label: 'Products',
    icon: Package,
  },
  {
    href: '/dashboard/admin/orders',
    label: 'Orders',
    icon: ShoppingCart,
  },
  {
    href: '/dashboard/admin/users',
    label: 'Users',
    icon: Users,
  },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const userAvatar = PlaceHolderImages.find(img => img.id === 'admin-avatar-1');

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-primary" />
            <h2 className="font-headline text-lg font-semibold">
              Bharat Bazaar Admin
            </h2>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {adminNavItems.map((item) => (
              <SidebarMenuItem key={item.href}>
                <Link href={item.href}>
                  <SidebarMenuButton
                    isActive={pathname === item.href}
                    tooltip={item.label}
                  >
                    <item.icon />
                    <span>{item.label}</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
          <div className="flex items-center gap-3 p-2 rounded-md bg-card">
            {userAvatar && (
                 <Avatar className="h-10 w-10">
                    <AvatarImage src={userAvatar.imageUrl} alt="Admin User" data-ai-hint={userAvatar.imageHint}/>
                    <AvatarFallback>AU</AvatarFallback>
                </Avatar>
            )}
            <div className="overflow-hidden">
                <p className="font-semibold truncate">Priya Sharma</p>
                <p className="text-xs text-muted-foreground truncate">Admin</p>
            </div>
          </div>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="flex h-14 items-center gap-4 border-b bg-background/95 px-6 sticky top-0 z-30">
          <div className="md:hidden">
            <SidebarTrigger>
              <PanelLeft className="h-5 w-5" />
              <span className="sr-only">Toggle Sidebar</span>
            </SidebarTrigger>
          </div>
          <div className="flex-1">
             <h1 className="text-xl font-semibold font-headline">
                {adminNavItems.find(item => item.href === pathname)?.label || 'Dashboard'}
             </h1>
          </div>
           <Button asChild variant="outline">
              <Link href="/dashboard">View Store</Link>
            </Button>
        </header>
        <main className="flex-1 p-6">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
