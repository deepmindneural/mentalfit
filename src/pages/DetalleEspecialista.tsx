import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import WhatsAppButton from '../components/shared/WhatsAppButton';
import IAChat from '../components/shared/IAChat';
import { obtenerEspecialistaPorId } from '../data/especialistas';
import { Especialista } from '../tipos';
import { useAuth } from '../context/AuthContext';
import { useCreditos } from '../context/CreditosContext';
import { useReservas } from '../context/ReservasContext';

const DetalleEspecialista: React.FC = () => {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { sesion } = useAuth();
  const { saldoActual } = useCreditos();
  const { obtenerDisponibilidad, crearReserva, disponibilidadEspecialista } = useReservas();
  
  const [especialista, setEspecialista] = useState<Especialista | null>(null);
  const [cargando, setCargando] = useState(true);
  const [cargandoDisponibilidad, setCargandoDisponibilidad] = useState(false);
  const [fechaSeleccionada, setFechaSeleccionada] = useState<string>('');
  const [horaSeleccionada, setHoraSeleccionada] = useState<string>('');
  const [motivoConsulta, setMotivoConsulta] = useState<string>('');
  const [modalidad, setModalidad] = useState<'presencial' | 'virtual'>('presencial');
  const [reservando, setReservando] = useState(false);
  const [mensajeReserva, setMensajeReserva] = useState<{tipo: 'exito' | 'error', mensaje: string} | null>(null);
  
  // Obtener fechas disponibles para los próximos 14 días
  const obtenerFechasDisponibles = () => {
    const fechas = [];
    const hoy = new Date();
    
    for (let i = 1; i <= 14; i++) {
      const fecha = new Date(hoy);
      fecha.setDate(hoy.getDate() + i);
      
      // No incluir domingos (0 es domingo en JavaScript)
      if (fecha.getDay() !== 0) {
        fechas.push({
          fecha: fecha,
          formatoCorto: fecha.toLocaleDateString('es-ES', { day: 'numeric', month: 'numeric' }),
          formatoCompleto: fecha.toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' }),
          fechaISO: fecha.toISOString().split('T')[0]
        });
      }
    }
    
    return fechas;
  };
  
  const fechasDisponibles = obtenerFechasDisponibles();
  
  // Obtener horarios disponibles para la fecha seleccionada
  const getHorariosDisponibles = () => {
    if (!fechaSeleccionada) return [];
    
    const disponibilidadFecha = disponibilidadEspecialista.find(
      d => d.dia === fechasDisponibles.find(f => f.formatoCompleto === fechaSeleccionada)?.fechaISO
    );
    
    return disponibilidadFecha?.horasDisponibles || [];
  };
  
  const horariosDisponibles = getHorariosDisponibles();
  
  useEffect(() => {
    if (id) {
      // Simular carga de datos
      setTimeout(() => {
        const especialistaEncontrado = obtenerEspecialistaPorId(id);
        setEspecialista(especialistaEncontrado || null);
        setCargando(false);
        
        // Cargar disponibilidad del especialista
        if (especialistaEncontrado) {
          cargarDisponibilidad(especialistaEncontrado.id);
        }
      }, 800);
    }
  }, [id]);
  
  // Cargar disponibilidad del especialista
  const cargarDisponibilidad = async (especialistaId: string) => {
    setCargandoDisponibilidad(true);
    try {
      await obtenerDisponibilidad(especialistaId);
    } catch (error) {
      console.error('Error al cargar disponibilidad:', error);
    } finally {
      setCargandoDisponibilidad(false);
    }
  };
  
  const handleReservarCita = async () => {
    // Validaciones básicas
    if (!fechaSeleccionada || !horaSeleccionada) {
      setMensajeReserva({
        tipo: 'error',
        mensaje: 'Por favor selecciona fecha y hora para tu cita'
      });
      return;
    }
    
    // Validar inicio de sesión
    if (!sesion.isAutenticado) {
      if (window.confirm('Necesitas iniciar sesión para reservar una cita. ¿Deseas ir a la página de inicio de sesión?')) {
        navigate('/login');
      }
      return;
    }
    
    // Validar saldo suficiente (asumimos que especialista.precio se convierte a créditos 1:1)
    const creditosNecesarios = especialista?.precio ? Math.ceil(especialista.precio / 7500) : 0;
    if (saldoActual < creditosNecesarios) {
      if (window.confirm(`No tienes suficientes créditos para esta reserva. Necesitas ${creditosNecesarios} créditos y tienes ${saldoActual}. ¿Deseas ir a comprar créditos?`)) {
        navigate('/dashboard/creditos');
      }
      return;
    }
    
    // Preparar datos de la reserva
    const fechaISO = fechasDisponibles.find(f => f.formatoCompleto === fechaSeleccionada)?.fechaISO || '';
    
    setReservando(true);
    setMensajeReserva(null);
    
    try {
      if (!especialista || !id) throw new Error('Información del especialista no disponible');
      
      // Crear reserva
      const nuevaReserva = await crearReserva({
        especialistaId: id,
        usuarioId: sesion.usuario?.id || '',
        fecha: fechaISO,
        hora: horaSeleccionada,
        precio: especialista.precio,
        creditos: creditosNecesarios,
        motivoConsulta: motivoConsulta,
        modalidad: modalidad,
        especialistaNombre: especialista.nombre,
        especialistaApellido: especialista.apellido,
        especialistaEspecialidad: especialista.especialidad,
        especialistaFoto: especialista.fotoPerfil || '',
        usuarioNombre: sesion.usuario?.nombre || '',
        usuarioApellido: sesion.usuario?.apellido || '',
        usuarioEmail: sesion.usuario?.email || ''
      });
      
      // Mostrar mensaje de éxito
      setMensajeReserva({
        tipo: 'exito',
        mensaje: `Cita reservada exitosamente con ${especialista.nombre} ${especialista.apellido} para el ${fechaSeleccionada} a las ${horaSeleccionada}`
      });
      
      // Resetear formulario
      setFechaSeleccionada('');
      setHoraSeleccionada('');
      setMotivoConsulta('');
      
      // Redirigir a mis reservas después de unos segundos
      setTimeout(() => {
        navigate('/dashboard/reservas');
      }, 3000);
      
    } catch (error) {
      console.error('Error al reservar cita:', error);
      setMensajeReserva({
        tipo: 'error',
        mensaje: 'No se pudo realizar la reserva. Por favor intenta nuevamente.'
      });
    } finally {
      setReservando(false);
    }
  };

  if (cargando) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow py-24 bg-gray-50 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primario-600"></div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!especialista) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow py-24 bg-gray-50">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Especialista no encontrado</h1>
            <p className="text-gray-600 mb-8">El especialista que buscas no existe o ha sido removido.</p>
            <Link to="/especialistas" className="bg-primario-600 hover:bg-primario-700 text-white py-2 px-6 rounded-lg inline-block transition duration-300">
              Volver a especialistas
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      {/* Banner */}
      <section className="pt-24 pb-10 bg-primario-600 text-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center">
            <Link to="/especialistas" className="text-white hover:text-primario-100 mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </Link>
            <h1 className="text-3xl font-bold">{especialista.nombre} {especialista.apellido}</h1>
          </div>
          <p className="mt-2">{especialista.especialidad}</p>
        </div>
      </section>
      
      <main className="flex-grow py-10 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Columna de informaciu00f3n del especialista */}
            <div className="lg:w-2/3">
              <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-6">
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-1/3">
                    <img 
                      src={especialista.fotoPerfil || 'https://via.placeholder.com/300x400'} 
                      alt={`${especialista.nombre} ${especialista.apellido}`}
                      className="w-full h-auto object-cover aspect-[3/4]"
                    />
                  </div>
                  <div className="p-6 md:w-2/3">
                    <div className="flex flex-wrap items-center mb-4">
                      <h2 className="text-2xl font-bold text-gray-800 mr-4">{especialista.nombre} {especialista.apellido}</h2>
                      <span className="bg-primario-100 text-primario-800 px-3 py-1 rounded-full text-sm font-medium">
                        {especialista.especialidad}
                      </span>
                    </div>
                    
                    <div className="flex items-center space-x-1 text-yellow-400 mb-4">
                      {[...Array(Math.floor(especialista.calificacion))].map((_, i) => (
                        <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                      {especialista.calificacion % 1 !== 0 && (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      )}
                      <span className="ml-2 text-gray-600">{especialista.calificacion.toFixed(1)}</span>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      <div>
                        <div className="text-sm text-gray-500">Experiencia</div>
                        <div className="font-medium">{especialista.experiencia} au00f1os</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-500">Precio por sesiu00f3n</div>
                        <div className="font-medium">${especialista.precio.toLocaleString()} COP</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-500">Ubicaciu00f3n</div>
                        <div className="font-medium">{especialista.ubicacion.ciudad}, {especialista.ubicacion.pais}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-500">Gu00e9nero</div>
                        <div className="font-medium">{especialista.genero === 'hombre' ? 'Masculino' : especialista.genero === 'mujer' ? 'Femenino' : 'Otro'}</div>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      <button className="bg-primario-600 hover:bg-primario-700 text-white py-2 px-4 rounded-lg transition duration-300 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                        Enviar mensaje
                      </button>
                      <button className="bg-white border border-primario-600 text-primario-600 hover:bg-primario-50 py-2 px-4 rounded-lg transition duration-300 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                        </svg>
                        Guardar perfil
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Sobre {especialista.nombre}</h3>
                <p className="text-gray-700 mb-6 whitespace-pre-line">{especialista.descripcion}</p>
                
                <h4 className="font-semibold text-gray-800 mb-2">Direcciu00f3n</h4>
                <p className="text-gray-700 mb-4">{especialista.ubicacion.direccion}</p>
                
                <div className="rounded-lg overflow-hidden h-64 bg-gray-200">
                  {/* Aquu00ed se podria integrar un mapa */}
                  <div className="w-full h-full flex items-center justify-center bg-primario-100 text-primario-800">
                    <span className="text-sm">Mapa de ubicaciu00f3n</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Columna de reserva */}
            <div className="lg:w-1/3">
              <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Reservar cita</h3>
                
                {/* Selector de fecha */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Fecha</label>
                  <div className="flex flex-wrap gap-2">
                    {cargandoDisponibilidad ? (
                      <div className="w-full flex justify-center py-4">
                        <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-primario-600"></div>
                      </div>
                    ) : (
                      fechasDisponibles.slice(0, 5).map((fecha, idx) => (
                        <button 
                          key={idx}
                          onClick={() => {
                            setFechaSeleccionada(fecha.formatoCompleto);
                            setHoraSeleccionada('');
                          }}
                          className={`px-3 py-2 rounded-lg text-sm ${fechaSeleccionada === fecha.formatoCompleto ? 'bg-primario-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                        >
                          {fecha.formatoCorto}
                        </button>
                      ))
                    )}
                  </div>
                </div>
                
                {/* Selector de hora */}
                {fechaSeleccionada && (
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Hora</label>
                    {horariosDisponibles.length > 0 ? (
                      <div className="grid grid-cols-3 gap-2">
                        {horariosDisponibles.map((hora, idx) => (
                          <button
                            key={idx}
                            onClick={() => setHoraSeleccionada(hora)}
                            className={`px-3 py-2 rounded-lg text-sm ${horaSeleccionada === hora ? 'bg-primario-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                          >
                            {hora}
                          </button>
                        ))}
                      </div>
                    ) : (
                      <div className="bg-amber-50 text-amber-800 p-3 rounded-lg text-sm">
                        No hay horarios disponibles para esta fecha. Por favor selecciona otra fecha.
                      </div>
                    )}
                  </div>
                )}
                
                {/* Modalidad de atención */}
                {fechaSeleccionada && horaSeleccionada && (
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Modalidad de atención</label>
                    <div className="flex space-x-4">
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          value="presencial"
                          checked={modalidad === 'presencial'}
                          onChange={() => setModalidad('presencial')}
                          className="h-4 w-4 text-primario-600 focus:ring-primario-500 border-gray-300"
                        />
                        <span className="ml-2 text-sm text-gray-700">Presencial</span>
                      </label>
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          value="virtual"
                          checked={modalidad === 'virtual'}
                          onChange={() => setModalidad('virtual')}
                          className="h-4 w-4 text-primario-600 focus:ring-primario-500 border-gray-300"
                        />
                        <span className="ml-2 text-sm text-gray-700">Virtual</span>
                      </label>
                    </div>
                  </div>
                )}
                
                {/* Motivo de consulta */}
                {fechaSeleccionada && horaSeleccionada && (
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Motivo de consulta</label>
                    <textarea
                      value={motivoConsulta}
                      onChange={(e) => setMotivoConsulta(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primario-500 focus:border-primario-500 sm:text-sm"
                      rows={3}
                      placeholder="Describe brevemente el motivo de tu consulta"
                    />
                  </div>
                )}
                
                {/* Información de la cita */}
                <div className="mt-4 mb-6 p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium text-gray-800 mb-2">Resumen de la cita</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Especialista:</span>
                      <span className="font-medium">{especialista.nombre} {especialista.apellido}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Especialidad:</span>
                      <span className="font-medium">{especialista.especialidad}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Fecha:</span>
                      <span className="font-medium">{fechaSeleccionada || '-'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Hora:</span>
                      <span className="font-medium">{horaSeleccionada || '-'}</span>
                    </div>
                    {fechaSeleccionada && horaSeleccionada && (
                      <>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Modalidad:</span>
                          <span className="font-medium">{modalidad === 'presencial' ? 'Presencial' : 'Virtual'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Precio:</span>
                          <span className="font-medium">${especialista.precio.toLocaleString()} COP</span>
                        </div>
                        <div className="flex justify-between font-medium text-primario-700 border-t border-gray-200 pt-2 mt-2">
                          <span>Créditos necesarios:</span>
                          <span>{Math.ceil(especialista.precio / 7500)}</span>
                        </div>
                      </>
                    )}
                  </div>
                </div>
                
                {/* Mensaje de resultado */}
                {mensajeReserva && (
                  <div className={`mb-6 p-4 rounded-lg ${mensajeReserva.tipo === 'exito' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
                    {mensajeReserva.mensaje}
                  </div>
                )}
                
                <button 
                  onClick={handleReservarCita}
                  disabled={reservando || !fechaSeleccionada || !horaSeleccionada || mensajeReserva?.tipo === 'exito'}
                  className={`w-full bg-primario-600 hover:bg-primario-700 text-white py-3 px-4 rounded-lg font-medium transition duration-300 ${(reservando || !fechaSeleccionada || !horaSeleccionada || mensajeReserva?.tipo === 'exito') ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {reservando ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Reservando...
                    </span>
                  ) : mensajeReserva?.tipo === 'exito' ? 'Reserva exitosa' : 'Reservar cita'}
                </button>
                
                <p className="text-xs text-gray-500 mt-4 text-center">
                  Al reservar aceptas nuestros <a href="#" className="text-primario-600 hover:underline">Tu00e9rminos y Condiciones</a> y <a href="#" className="text-primario-600 hover:underline">Polu00edtica de Privacidad</a>
                </p>
              </div>
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

export default DetalleEspecialista;
