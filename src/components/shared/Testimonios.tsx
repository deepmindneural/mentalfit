import React from 'react';
import { useTranslation } from 'react-i18next';

interface Testimonio {
  id: string;
  nombre: string;
  rol: string;
  comentario: string;
  avatar: string;
  rating: number;
}

const Testimonios: React.FC = () => {
  const { t } = useTranslation();
  
  const testimonios: Testimonio[] = [
    {
      id: '1',
      nombre: 'María González',
      rol: 'Paciente',
      comentario: 'Los cuestionarios me ayudaron a identificar síntomas que no sabía que estaban relacionados con mi ansiedad. El seguimiento con un especialista ha sido transformador.',
      avatar: 'https://randomuser.me/api/portraits/women/32.jpg',
      rating: 5
    },
    {
      id: '2',
      nombre: 'Carlos Rodríguez',
      rol: 'Paciente',
      comentario: 'Gracias a MentalFit pude conectar con un psicólogo que realmente entiende mis necesidades. Las evaluaciones periódicas me permiten ver mi progreso claramente.',
      avatar: 'https://randomuser.me/api/portraits/men/45.jpg',
      rating: 4
    },
    {
      id: '3',
      nombre: 'Laura Martínez',
      rol: 'Psicóloga',
      comentario: 'Como profesional, valoro mucho la información que los cuestionarios proporcionan. Me permite preparar mejor mis sesiones y ofrecer un tratamiento más personalizado.',
      avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
      rating: 5
    }
  ];

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">{t('testimoniosClientes')}</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonios.map((testimonio) => (
            <div 
              key={testimonio.id} 
              className="bg-white rounded-xl shadow-sm p-6 transition-all duration-300 hover:shadow-md hover:translate-y-[-5px]"
            >
              <div className="flex items-center mb-4">
                <img 
                  src={testimonio.avatar} 
                  alt={testimonio.nombre}
                  className="w-14 h-14 rounded-full object-cover mr-4"
                  loading="lazy"
                />
                <div>
                  <h3 className="font-semibold text-lg">{testimonio.nombre}</h3>
                  <p className="text-sm text-gray-500">{testimonio.rol}</p>
                </div>
              </div>
              
              <div className="mb-4 flex">
                {[...Array(5)].map((_, i) => (
                  <svg 
                    key={i}
                    className={`w-5 h-5 ${i < testimonio.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              
              <p className="text-gray-600 italic">"{testimonio.comentario}"</p>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-10">
          <button className="bg-primario-500 hover:bg-primario-600 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 inline-flex items-center">
            {t('verMasTestimonios')}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonios;
