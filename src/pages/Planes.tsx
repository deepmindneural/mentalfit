import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { Plan } from '../tipos/monetizacion';
import { planes } from '../data/monetizacion';

const Planes: React.FC = () => {
  const { t } = useTranslation();
  const [modalPlan, setModalPlan] = useState<Plan | null>(null);
  
  // Agrupar planes por categorías
  const planesIndividuales = planes.filter(plan => 
    plan.nombre.toLowerCase().includes('básico') || 
    plan.nombre.toLowerCase().includes('premium') ||
    plan.nombre.toLowerCase().includes('estándar'));
  
  const planesCorporativos = planes.filter(plan => 
    plan.nombre.toLowerCase().includes('empresarial') || 
    plan.nombre.toLowerCase().includes('corporativo'));
  
  const abrirModal = (plan: Plan) => {
    setModalPlan(plan);
  };
  
  const cerrarModal = () => {
    setModalPlan(null);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-primario-600 to-primario-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Planes y Suscripciones</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto opacity-90">
            Elige el plan ideal para tu bienestar mental y emocional
          </p>
        </div>
      </section>
      
      {/* Planes Individuales */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Planes Individuales</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {planesIndividuales.map((plan) => (
              <div 
                key={plan.id} 
                className={`relative bg-white rounded-xl overflow-hidden shadow-card hover:shadow-card-hover transition-shadow duration-300 ${plan.popular ? 'border-2 border-' + plan.color.replace('bg-', '') : ''}`}
              >
                {plan.popular && (
                  <div className={`absolute top-0 right-0 px-4 py-1 ${plan.color} text-white font-semibold text-sm`}>
                    Popular
                  </div>
                )}
                <div className={`p-6 ${plan.color} text-white`}>
                  <h3 className="text-2xl font-bold">{plan.nombre}</h3>
                  <p className="mt-2 text-sm opacity-90">{plan.descripcion}</p>
                </div>
                <div className="p-6">
                  <div className="flex items-baseline mb-4">
                    <span className="text-4xl font-bold">${plan.precio.toLocaleString()}</span>
                    <span className="text-gray-500 ml-2">/ {plan.periodoFacturacion}</span>
                  </div>
                  
                  {plan.descuento > 0 && (
                    <div className="bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full inline-block mb-4">
                      {plan.descuento}% de descuento
                    </div>
                  )}
                  
                  <ul className="space-y-3 mb-8">
                    {plan.caracteristicas.map((caracteristica, idx) => (
                      <li key={idx} className="flex items-start">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-700">{caracteristica}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <button 
                    onClick={() => abrirModal(plan)}
                    className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors ${plan.color} text-white hover:bg-opacity-90`}
                  >
                    Suscribirme ahora
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Planes Corporativos */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Planes Corporativos</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {planesCorporativos.map((plan) => (
              <div 
                key={plan.id} 
                className="bg-white rounded-xl overflow-hidden shadow-card hover:shadow-card-hover transition-shadow duration-300 border border-gray-200"
              >
                <div className={`p-6 ${plan.color} text-white`}>
                  <h3 className="text-2xl font-bold">{plan.nombre}</h3>
                  <p className="mt-2 text-sm opacity-90">{plan.descripcion}</p>
                </div>
                <div className="p-6">
                  <div className="flex items-baseline mb-4">
                    <span className="text-4xl font-bold">${plan.precio.toLocaleString()}</span>
                    <span className="text-gray-500 ml-2">/ {plan.periodoFacturacion}</span>
                  </div>
                  
                  {plan.descuento > 0 && (
                    <div className="bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full inline-block mb-4">
                      {plan.descuento}% de descuento
                    </div>
                  )}
                  
                  <ul className="space-y-3 mb-8">
                    {plan.caracteristicas.map((caracteristica, idx) => (
                      <li key={idx} className="flex items-start">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-700">{caracteristica}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <button 
                    onClick={() => abrirModal(plan)}
                    className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors ${plan.color} text-white hover:bg-opacity-90`}
                  >
                    Contactar para información
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Preguntas Frecuentes */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Preguntas Frecuentes</h2>
          
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">¿Puedo cambiar de plan en cualquier momento?</h3>
              <p className="text-gray-600">Sí, puedes cambiar tu plan en cualquier momento. Si cambias a un plan de mayor valor, se te cobrará la diferencia prorrateada. Si cambias a un plan de menor valor, el cambio se aplicará en tu próximo ciclo de facturación.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">¿Cómo cancelo mi suscripción?</h3>
              <p className="text-gray-600">Puedes cancelar tu suscripción en cualquier momento desde tu perfil. La cancelación se hará efectiva al final de tu periodo de facturación actual.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">¿Los planes incluyen acceso a especialistas?</h3>
              <p className="text-gray-600">Todos los planes incluyen acceso a nuestra plataforma y herramientas de evaluación. Las sesiones con especialistas tienen un costo adicional, pero los miembros de planes Premium tienen descuentos especiales.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">¿Cómo funcionan los planes corporativos?</h3>
              <p className="text-gray-600">Los planes corporativos están diseñados para empresas que desean brindar apoyo en salud mental a sus empleados. Personalizamos el plan según las necesidades de tu organización y número de usuarios.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Modal de Suscripción */}
      {modalPlan && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center">
            <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" onClick={cerrarModal}></div>
            
            <div className="relative z-10 inline-block w-full max-w-md p-6 overflow-hidden text-left align-middle transition-all transform bg-white rounded-lg shadow-xl">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Suscripción a {modalPlan.nombre}
              </h3>
              
              <div className="bg-gray-50 p-4 rounded-lg mb-4">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Plan:</span>
                  <span className="font-medium">{modalPlan.nombre}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Precio:</span>
                  <span className="font-medium">${modalPlan.precio.toLocaleString()} / {modalPlan.periodoFacturacion}</span>
                </div>
                {modalPlan.descuento > 0 && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Descuento:</span>
                    <span className="font-medium text-green-600">{modalPlan.descuento}%</span>
                  </div>
                )}
              </div>
              
              {/* Formulario de Pago */}
              <div className="space-y-4">
                <div>
                  <label htmlFor="cardName" className="block text-sm font-medium text-gray-700">Nombre en tarjeta</label>
                  <input
                    type="text"
                    id="cardName"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-primario-500 focus:border-primario-500 sm:text-sm"
                    placeholder="Juan Pérez"
                  />
                </div>
                
                <div>
                  <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700">Número de tarjeta</label>
                  <input
                    type="text"
                    id="cardNumber"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-primario-500 focus:border-primario-500 sm:text-sm"
                    placeholder="0000 0000 0000 0000"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="expDate" className="block text-sm font-medium text-gray-700">Fecha expiración</label>
                    <input
                      type="text"
                      id="expDate"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-primario-500 focus:border-primario-500 sm:text-sm"
                      placeholder="MM/AA"
                    />
                  </div>
                  <div>
                    <label htmlFor="cvv" className="block text-sm font-medium text-gray-700">CVV</label>
                    <input
                      type="text"
                      id="cvv"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-primario-500 focus:border-primario-500 sm:text-sm"
                      placeholder="123"
                    />
                  </div>
                </div>
                
                <div className="pt-4">
                  <button 
                    className={`w-full py-2 px-4 ${modalPlan.color} text-white rounded-md shadow-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primario-500`}
                  >
                    Confirmar Suscripción
                  </button>
                  <button 
                    onClick={cerrarModal}
                    className="mt-3 w-full py-2 px-4 bg-white border border-gray-300 rounded-md shadow-sm text-gray-700 font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primario-500"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <Footer />
    </div>
  );
};

export default Planes;
