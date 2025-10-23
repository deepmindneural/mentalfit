'use client';

import { ReactNode } from 'react';
import LayoutDashboardAdmin from '@/components/layout/LayoutDashboardAdmin';

export default function LayoutAdmin({
  children: ReactNode;
}) {
  return (
    <LayoutDashboardAdmin>
      {children}
    </LayoutDashboardAdmin>
  );
}
