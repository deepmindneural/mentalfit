'use client';

import { Fragment, ReactNode } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { X } from 'lucide-react';
import Boton from './Boton';

interface PropiedadesModal {
  abierto: boolean;
  alCerrar: () => void;
  titulo?: string;
  descripcion?: string;
  children: ReactNode;
  tamano?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  mostrarCerrar?: boolean;
  pie?: ReactNode;
}

const tamanos = {
  sm: 'max-w-md',
  md: 'max-w-lg',
  lg: 'max-w-2xl',
  xl: 'max-w-4xl',
  full: 'max-w-7xl',
};

export default function Modal({
  abierto,
  alCerrar,
  titulo,
  descripcion,
  children,
  tamano = 'md',
  mostrarCerrar = true,
  pie,
}: PropiedadesModal) {
  return (
    <Transition appear show={abierto} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={alCerrar}>
        {/* Fondo oscuro */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/50 dark:bg-black/70" />
        </Transition.Child>

        {/* Contenedor del modal */}
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel
                className={clsx(
                  'w-full transform overflow-hidden rounded-2xl bg-white dark:bg-gray-800',
                  'p-6 text-left align-middle shadow-xl transition-all',
                  tamanos[tamano]
                )}
              >
                {/* Cabecera */}
                {(titulo || mostrarCerrar) && (
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      {titulo && (
                        <Dialog.Title
                          as="h3"
                          className="text-lg font-semibold text-gray-900 dark:text-white"
                        >
                          {titulo}
                        </Dialog.Title>
                      )}

                      {descripcion && (
                        <Dialog.Description className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                          {descripcion}
                        </Dialog.Description>
                      )}
                    </div>

                    {mostrarCerrar && (
                      <button
                        onClick={alCerrar}
                        className="ml-4 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 transition-colors"
                      >
                        <X className="h-5 w-5" />
                      </button>
                    )}
                  </div>
                )}

                {/* Contenido */}
                <div className="mt-2">{children}</div>

                {/* Pie */}
                {pie && (
                  <div className="mt-6 flex items-center justify-end gap-3">
                    {pie}
                  </div>
                )}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

import { clsx } from 'clsx';
