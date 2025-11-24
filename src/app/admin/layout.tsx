'use client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useUser, useFirestore, useDoc, useMemoFirebase } from '@/firebase';
import { doc } from 'firebase/firestore';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { Sidebar, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from '@/components/ui/sidebar';
import Link from 'next/link';
import { Package, ShoppingCart } from 'lucide-react';
import { usePathname } from 'next/navigation';


export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isUserLoading } = useUser();
  const firestore = useFirestore();
  const router = useRouter();
  const pathname = usePathname();

  const adminRoleDoc = useMemoFirebase(
    () => (user && firestore ? doc(firestore, 'roles_admin', user.uid) : null),
    [user, firestore]
  );
  const { data: adminRole, isLoading: isAdminLoading } = useDoc(adminRoleDoc);

  useEffect(() => {
    if (!isUserLoading && !isAdminLoading && !adminRole) {
      router.push('/dashboard');
    }
  }, [user, adminRole, isUserLoading, isAdminLoading, router]);

  if (isUserLoading || isAdminLoading || !adminRole) {
    return <div>Loading access...</div>;
  }

  return (
      <div className="relative flex min-h-screen flex-col">
        <SiteHeader />
        <div className="flex-1 container mx-auto py-8 px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-8">
                <aside>
                    <nav>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild isActive={pathname.startsWith('/admin/products')}>
                                    <Link href="/admin/products"><Package className="mr-2"/>Products</Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild isActive={pathname.startsWith('/admin/orders')}>
                                    <Link href="/admin/orders"><ShoppingCart className="mr-2"/>Orders</Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </nav>
                </aside>
                <main>{children}</main>
            </div>
        </div>
        <SiteFooter />
      </div>
  );
}
