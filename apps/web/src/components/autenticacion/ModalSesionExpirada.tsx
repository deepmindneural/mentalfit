'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle } from 'lucide-react';

interface PropiedadesModalSesionExpirada {
  abierto: boolean;
  onCerrar: () => void;
}

export default function ModalSesionExpirada({
  abierto,
  onCerrar
}: PropiedadesModalSesionExpirada) {
  const t = useTranslations();
  const router = useRouter();

  useEffect(() => {
    if (abierto) {
      // Bloquear scroll del body cuando el modal está abierto
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [abierto]);

  const manejarIniciarSesion = () => {
    onCerrar();
    router.push('/auth/login');
  };

  return (
    <AnimatePresence>
      {abierto && (
        <>
          {/* Overlay oscuro */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50"
            onClick={manejarIniciarSesion}
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Icono de alerta */}
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center">
                  <AlertCircle className="h-8 w-8 text-yellow-600" />
                </div>
              </div>

              {/* Título */}
              <h2 className="text-2xl font-bold text-gray-900 text-center mb-2">
                {t('auth.sessionExpired.title')}
              </h2>

              {/* Mensaje */}
              <p className="text-gray-600 text-center mb-6">
                {t('auth.sessionExpired.message')}
              </p>

              {/* Botón */}
              <button
                onClick={manejarIniciarSesion}
                className="w-full btn-primary py-3 flex items-center justify-center"
              >
                {t('auth.sessionExpired.submit')}
              </button>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
