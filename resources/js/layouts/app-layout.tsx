import AppLayoutTemplate from '@/layouts/app/app-sidebar-layout';
import type { BreadcrumbItem } from '@/types';
import React from 'react';

interface AppLayoutProps {
    breadcrumbs?: BreadcrumbItem[];
    children: React.ReactNode;
}

export default function AppLayout({ breadcrumbs = [], children }: AppLayoutProps) {
    return (
        <AppLayoutTemplate breadcrumbs={breadcrumbs}>
            {children}
        </AppLayoutTemplate>
    );
}