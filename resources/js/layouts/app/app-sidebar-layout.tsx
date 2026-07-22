import { AppContent } from '@/components/app-content';
import { AppShell } from '@/components/app-shell';
import { AppSidebar } from '@/components/app-sidebar';
import { AppSidebarHeader } from '@/components/app-sidebar-header';
import type { AppLayoutProps } from '@/types';
import { LayoutDashboard, Users, Car, Wrench, Package, FileText, Receipt, Sparkles } from 'lucide-react';

// Add these items to your sidebar navigation list
const mainNavItems = [
    { title: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { title: 'Customers', href: '/customers', icon: Users },
    { title: 'Vehicles', href: '/vehicles', icon: Car },
    { title: 'Mechanics', href: '/mechanics', icon: Wrench },
    { title: 'Parts Inventory', href: '/parts', icon: Package },
    { title: 'Job Cards', href: '/job-cards', icon: FileText },
    { title: 'Invoices', href: '/invoices', icon: Receipt },
    { title: 'AI Service Summary', href: '/AiServiceSummary', icon: Sparkles },
];

const navigationItems = [
    // ... your existing navigation items (Dashboard, Job Cards, Inventory, etc.)
    {
        title: 'AI Service Summary',
        url: '/AiServiceSummary', // Or use route('ai.service.summary') if using Ziggy
        icon: Sparkles,
        isActive: window.location.pathname === '/AiServiceSummary',
    },
];

export default function AppSidebarLayout({
    children,
    breadcrumbs = [],
}: AppLayoutProps) {
    return (
        <AppShell variant="sidebar">
            <AppSidebar />
            <AppContent variant="sidebar" className="overflow-x-hidden">
                <AppSidebarHeader breadcrumbs={breadcrumbs} />
                {children}
            </AppContent>
        </AppShell>
    );
}
