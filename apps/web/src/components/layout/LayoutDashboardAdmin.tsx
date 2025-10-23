'use client';

import { useState, ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { clsx } from 'clsx';
import {
  LayoutDashboard,
  Building2,
  Users,
  UserCog,
  DollarSign,
  Settings,
  Menu,
  X,
  FileText,
  BarChart3,
  Shield,
  Headphones,
  Zap,
} from 'lucide-react';
import Avatar from '../ui/Avatar';
import MenuDesplegable from '../ui/MenuDesplegable';

const menuItems = [
  { href: '/admin', etiqueta: 'Dashboard', icono: LayoutDashboard },
  { href: '/admin/empresas', etiqueta: 'Empresas', icono: Building2 },
  { href: '/admin/profesionales', etiqueta: 'Profesionales', icono: UserCog },
  { href: '/admin/usuarios', etiqueta: 'Usuarios', icono: Users },
  { href: '/admin/finanzas', etiqueta: 'Finanzas', icono: DollarSign },
  { href: '/admin/analytics', etiqueta: 'Analytics', icono: BarChart3 },
  { href: '/admin/contenido', etiqueta: 'Contenido', icono: FileText },
  { href: '/admin/soporte', etiqueta: 'Soporte', icono: Headphones },
  { href: '/admin/moderacion', etiqueta: 'Moderación', icono: Shield },
  { href: '/admin/configuracion', etiqueta: 'Configuración', icono: Settings },
];

interface PropiedadesLayout {
  children: ReactNode;
}

export default function LayoutDashboardAdmin({ children }: PropiedadesLayout) {
  const [sidebarAbierto, setSidebarAbierto] = useState(false);
  const pathname = usePathname();

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      {/* Overlay móvil */}
      {sidebarAbierto && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setSidebarAbierto(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={clsx(
          'fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700',
          'transform transition-transform duration-300 lg:translate-x-0',
          sidebarAbierto ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {/* Logo */}
        <div className="h-16 flex items-center justify-between px-6 border-b border-gray-200 dark:border-gray-700">
          <Link href="/admin" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-peligro-600 rounded-lg flex items-center justify-center">
              <Zap className="h-5 w-5 text-white" />
            </div>
            <span className="font-display font-bold text-lg text-gray-900 dark:text-white">
              MentalFit Admin
            </span>
          </Link>

          <button
            onClick={() => setSidebarAbierto(false)}
            className="lg:hidden text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navegación */}
        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
          {menuItems.map((item) => {
            const estaActivo = pathname === item.href || pathname?.startsWith(item.href + '/');
            const Icono = item.icono;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarAbierto(false)}
                className={clsx(
                  'flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                  estaActivo
                    ? 'bg-peligro-50 text-peligro-700 dark:bg-peligro-900/20 dark:text-peligro-400'
                    : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
                )}
              >
                <Icono className="h-5 w-5 flex-shrink-0" />
                {item.etiqueta}
              </Link>
            );
          })}
        </nav>

        {/* Footer del sidebar */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3 p-2">
            <Avatar tamano="sm" iniciales="SA" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                Super Admin
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                Administrador
              </p>
            </div>
          </div>
        </div>
      </aside>

      {/* Contenido principal */}
      <div className="flex-1 flex flex-col lg:ml-64">
        {/* Header */}
        <header className="h-16 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => setSidebarAbierto(true)}
            className="lg:hidden text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <Menu className="h-6 w-6" />
          </button>

          <div className="flex-1" />

          {/* Acciones del header */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-peligro-50 dark:bg-peligro-900/20 rounded-lg">
              <Shield className="h-4 w-4 text-peligro-600 dark:text-peligro-400" />
              <span className="text-xs font-medium text-peligro-700 dark:text-peligro-300">
                ADMIN MODE
              </span>
            </div>

            <MenuDesplegable
              disparador={
                <button className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                  <Avatar tamano="sm" iniciales="SA" />
                </button>
              }
              items={[
                { etiqueta: 'Mi Perfil', onClick: () => {} },
                { etiqueta: 'Configuración', onClick: () => {} },
                'divider',
                { etiqueta: 'Cerrar Sesión', onClick: () => {}, variante: 'peligro' },
              ]}
            />
          </div>
        </header>

        {/* Contenido */}
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
