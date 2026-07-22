import { AppContent } from '@/components/app-content';
import { AppShell } from '@/components/app-shell';
import { AppSidebar } from '@/components/app-sidebar';
import { AppSidebarHeader } from '@/components/app-sidebar-header';
import type { AppLayoutProps } from '@/types';
import { Sparkles, Wrench, LayoutDashboard } from 'lucide-react'; // Example icons

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
