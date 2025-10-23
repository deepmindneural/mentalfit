'use client';

import { ReactNode } from 'react';
import LayoutDashboardProfesional from '@/components/layout/LayoutDashboardProfesional';

export default function LayoutProfesional({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <LayoutDashboardProfesional>
      {children}
    </LayoutDashboardProfesional>
  );
}
