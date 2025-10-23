'use client';

import { Fragment, ReactNode } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { clsx } from 'clsx';
import { ChevronDown } from 'lucide-react';

interface ItemMenu {
  etiqueta: string;
  icono?: ReactNode;
  onClick?: () => void;
  href?: string;
  deshabilitado?: boolean;
  variante?: 'default' | 'peligro';
}

interface PropiedadesMenuDesplegable {
  disparador: ReactNode;
  items: (ItemMenu | 'divider')[];
  alineacion?: 'izquierda' | 'derecha';
  ancho?: 'auto' | 'sm' | 'md' | 'lg';
}

const anchosMenu = {
  auto: 'w-auto',
  sm: 'w-48',
  md: 'w-56',
  lg: 'w-64',
};

export default function MenuDesplegable({
  disparador,
  items,
  alineacion = 'derecha',
  ancho = 'sm',
}: PropiedadesMenuDesplegable) {
  return (
    <Menu as="div" className="relative inline-block text-left">
      {/* Botón disparador */}
      <Menu.Button as={Fragment}>
        {disparador}
      </Menu.Button>

      {/* Items del menú */}
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items
          className={clsx(
            'absolute z-50 mt-2 origin-top-right rounded-lg',
            'bg-white dark:bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5',
            'focus:outline-none divide-y divide-gray-100 dark:divide-gray-700',
            anchosMenu[ancho],
            alineacion === 'derecha' ? 'right-0' : 'left-0'
          )}
        >
          <div className="py-1">
            {items.map((item, index) => {
              // Divisor
              if (item === 'divider') {
                return (
                  <div
                    key={`divider-${index}`}
                    className="my-1 border-t border-gray-200 dark:border-gray-700"
                  />
                );
              }

              const esItemMenu = item as ItemMenu;

              return (
                <Menu.Item key={index} disabled={esItemMenu.deshabilitado}>
                  {({ active }) => {
                    const Componente = esItemMenu.href ? 'a' : 'button';

                    return (
                      <Componente
                        href={esItemMenu.href}
                        onClick={esItemMenu.onClick}
                        className={clsx(
                          'group flex items-center w-full px-4 py-2 text-sm transition-colors',
                          esItemMenu.deshabilitado && 'opacity-50 cursor-not-allowed',
                          esItemMenu.variante === 'peligro'
                            ? 'text-peligro-700 dark:text-peligro-400'
                            : 'text-gray-700 dark:text-gray-200',
                          active && !esItemMenu.deshabilitado
                            ? esItemMenu.variante === 'peligro'
                              ? 'bg-peligro-50 dark:bg-peligro-900/20'
                              : 'bg-gray-100 dark:bg-gray-700'
                            : ''
                        )}
                      >
                        {esItemMenu.icono && (
                          <div className="mr-3 h-4 w-4">{esItemMenu.icono}</div>
                        )}
                        <span>{esItemMenu.etiqueta}</span>
                      </Componente>
                    );
                  }}
                </Menu.Item>
              );
            })}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
