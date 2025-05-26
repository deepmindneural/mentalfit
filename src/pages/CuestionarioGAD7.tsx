import React from 'react';
import { useTranslation } from 'react-i18next';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import GAD7Form from '../components/cuestionarios/GAD7Form';
import WhatsAppButton from '../components/shared/WhatsAppButton';
import IAChat from '../components/shared/IAChat';

const CuestionarioGAD7: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      {/* Banner */}
      <section className="pt-24 pb-10 bg-purple-600 text-white">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold">{t('cuestionarioAnsiedad')}</h1>
          <p className="mt-2">{t('evaluacionAnsiedadExplicacion')}</p>
        </div>
      </section>
      
      <main className="flex-grow py-10 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <GAD7Form />
            
            <div className="mt-8 bg-purple-50 border border-purple-200 rounded-lg p-4">
              <h3 className="text-lg font-medium text-purple-800 mb-2">{t('informacionImportante')}</h3>
              <p className="text-purple-700 text-sm">
                {t('disclaimerCuestionarios')}
              </p>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
      
      {/* WhatsApp Botu00f3n flotante */}
      <WhatsAppButton telefono="573001234567" flotante={true} />
      
      {/* Chat IA */}
      <IAChat />
    </div>
  );
};

export default CuestionarioGAD7;
