import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import DASS21Form from '../components/cuestionarios/DASS21Form';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import WhatsAppButton from '../components/shared/WhatsAppButton';
import IAChat from '../components/shared/IAChat';

const CuestionarioDASS21: React.FC = () => {
  const { t } = useTranslation();

  useEffect(() => {
    // Establecer el título del documento
    document.title = `${t('cuestionarioDASS21')} | MentalFit`;
    
    // Para la meta description, podríamos crear un elemento meta y añadirlo al head
    // pero no es necesario para la funcionalidad básica
  }, [t]);

  return (
    <div className="flex flex-col min-h-screen">
      
      <Header />
      
      <main className="flex-grow py-10 bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{t('cuestionarioDASS21')}</h1>
              <p className="text-lg text-gray-700">
                {t('descripcionDASS21Long')}
              </p>
            </div>

            <div className="mb-6 bg-primario-50 border-l-4 border-primario-500 p-4 rounded-r-md">
              <h2 className="font-bold text-primario-700 mb-2">{t('antesDeEmpezar')}</h2>
              <p className="text-primario-800">
                {t('instruccionesCuestionarioGeneral')}
              </p>
            </div>

            <DASS21Form />

            <div className="mt-10 text-sm text-gray-500">
              <p>{t('noSustituye')}</p>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
      <WhatsAppButton telefono="573001234567" flotante={true} />
      <IAChat />
    </div>
  );
};

export default CuestionarioDASS21;
