import { Link } from '@inertiajs/react';
import { BookOpen, FolderGit2, LayoutGrid, Users, Car, Wrench, Package, FileText, Receipt, Sparkles } from 'lucide-react';
import AppLogo from '@/components/app-logo';
import ThemeToggle from '@/components/theme-toggle';
import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { dashboard } from '@/routes';
import type { NavItem } from '@/types';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: dashboard(),
        icon: LayoutGrid,
    },
    {
        title: 'Customers',
        href: '/customers',
        icon: Users,
    },
    {
        title: 'Vehicles',
        href: '/vehicles',
        icon: Car,
    },
    {
        title: 'Mechanics',
        href: '/mechanics',
        icon: Wrench,
    },
    {
        title: 'Parts Inventory',
        href: '/parts',
        icon: Package,
    },
    {
        title: 'Job Cards',
        href: '/job-cards',
        icon: FileText,
    },
    {
        title: 'Invoices',
        href: '/invoices',
        icon: Receipt,
    },
    {
        title: 'AI Service Summary',
        href: '/AiServiceSummary',
        icon: Sparkles,
    },
];

const footerNavItems: NavItem[] = [
    {
        title: 'Repository',
        href: 'https://github.com/CharithGayantha/Vehicle-Service-System',
        icon: FolderGit2,
    },
    {
        title: 'System Docs',
        href: '#',
        icon: BookOpen,
    },
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset" className="border-r border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-950">
            <SidebarHeader className="border-b border-gray-200 dark:border-zinc-900 bg-white dark:bg-zinc-950 py-3">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={dashboard()} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent className="bg-white dark:bg-zinc-950">
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter className="border-t border-gray-200 dark:border-zinc-900 bg-white dark:bg-zinc-950 px-2 py-2 space-y-1">
                <ThemeToggle />
                <NavFooter items={footerNavItems} />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
