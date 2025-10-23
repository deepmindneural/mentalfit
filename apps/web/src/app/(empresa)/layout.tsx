'use client';

import { ReactNode } from 'react';
import LayoutDashboardEmpresa from '@/components/layout/LayoutDashboardEmpresa';

export default function LayoutEmpresa({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <LayoutDashboardEmpresa>
      {children}
    </LayoutDashboardEmpresa>
  );
}
