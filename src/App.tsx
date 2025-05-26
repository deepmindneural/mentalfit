import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './index.css';

// Importar contextos
import { AppProvider } from './context/AppContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { CreditosProvider } from './context/CreditosContext';
import { ReservasProvider } from './context/ReservasContext';
import { ChatSentimientosProvider } from './context/ChatSentimientosContext';

// Importar páginas
import Home from './pages/Home';
import Especialistas from './pages/Especialistas';
import DetalleEspecialista from './pages/DetalleEspecialista';
import Cuestionarios from './pages/Cuestionarios';
import CuestionarioPHQ9 from './pages/CuestionarioPHQ9';
import CuestionarioGAD7 from './pages/CuestionarioGAD7';
import CuestionarioDASS21 from './pages/CuestionarioDASS21';
import ResultadosCuestionario from './pages/ResultadosCuestionario';
import MiProgreso from './pages/dashboard/MiProgreso';
import MisSuscripciones from './pages/dashboard/MisSuscripciones';
import MiPerfil from './pages/dashboard/MiPerfil';
import MisCreditos from './pages/dashboard/MisCreditos';
import MisReservas from './pages/dashboard/MisReservas';
import DashboardAliado from './pages/dashboard/DashboardAliado';
import CalendarioReservas from './pages/dashboard/CalendarioReservas';
import PaginaChatSentimientos from './pages/dashboard/ChatSentimientos';
import Planes from './pages/Planes';
import Bienvenida from './pages/Bienvenida';
import Login from './pages/Login';
import MapaDemostracion from './pages/MapaDemostracion';

// Importar layout de administrador
import AdminLayout from './layouts/AdminLayout';

// Importar páginas de administrador
import Dashboard from './pages/admin/Dashboard';
import Aliados from './pages/admin/Aliados';
import Cupones from './pages/admin/Cupones';
import PlanesAdmin from './pages/admin/Planes';
import Transacciones from './pages/admin/Transacciones';

// Componente para rutas protegidas por rol
import RutaProtegida from './components/auth/RutaProtegida';

// Componente para redireccionar según rol
const RedireccionPorRol = () => {
  const { sesion } = useAuth();
  
  if (!sesion.isAutenticado) {
    return <Navigate to="/login" replace />;
  }
  
  // Redirigir a todos los usuarios a la página de bienvenida
  return <Navigate to="/bienvenida" replace />;
};

function App() {
  const { t, i18n } = useTranslation();

  // Detectar idioma del navegador al iniciar
  useEffect(() => {
    const browserLang = navigator.language.split('-')[0];
    if (browserLang === 'es' || browserLang === 'en') {
      i18n.changeLanguage(browserLang);
    }
  }, [i18n]);

  return (
    <AppProvider>
      <AuthProvider>
        <CreditosProvider>
          <ReservasProvider>
            <ChatSentimientosProvider>
            <Router>
          <Routes>
          {/* Rutas principales - públicas */}
          <Route path="/" element={<Home />} />
          <Route path="/especialistas" element={<Especialistas />} />
          <Route path="/especialistas/:id" element={<DetalleEspecialista />} />
          <Route path="/cuestionarios" element={<Cuestionarios />} />
          <Route path="/cuestionarios/phq9" element={<CuestionarioPHQ9 />} />
          <Route path="/cuestionarios/gad7" element={<CuestionarioGAD7 />} />
          <Route path="/cuestionarios/dass21" element={<CuestionarioDASS21 />} />
          <Route path="/resultados/:id" element={<ResultadosCuestionario />} />
          <Route path="/planes" element={<Planes />} />
          <Route path="/mapa" element={<MapaDemostracion />} />
          
          {/* Ruta de inicio de sesión y bienvenida */}
          {/* Ruta de inicio de sesiu00f3n y bienvenida */}
          <Route path="/login" element={<Login />} />
          <Route path="/mi-cuenta" element={<RedireccionPorRol />} />
          <Route path="/bienvenida" element={
            <RutaProtegida>
              <Bienvenida />
            </RutaProtegida>
          } />
          
          {/* Rutas del Dashboard de usuario - protegidas */}
          <Route path="/dashboard">
            <Route path="progreso" element={
              <RutaProtegida requiereRol="usuario">
                <MiProgreso />
              </RutaProtegida>
            } />
            <Route path="suscripciones" element={
              <RutaProtegida requiereRol="usuario">
                <MisSuscripciones />
              </RutaProtegida>
            } />
            <Route path="perfil" element={
              <RutaProtegida>
                <MiPerfil />
              </RutaProtegida>
            } />
            <Route path="creditos" element={
              <RutaProtegida>
                <MisCreditos />
              </RutaProtegida>
            } />
            <Route path="reservas" element={
              <RutaProtegida requiereRol="usuario">
                <MisReservas />
              </RutaProtegida>
            } />
            <Route path="chat-sentimientos" element={
              <RutaProtegida>
                <PaginaChatSentimientos />
              </RutaProtegida>
            } />
            <Route path="aliado" element={
              <RutaProtegida requiereRol="aliado">
                <DashboardAliado />
              </RutaProtegida>
            } />
            <Route path="calendario" element={
              <RutaProtegida requiereRol="aliado">
                <CalendarioReservas />
              </RutaProtegida>
            } />
          </Route>
          
          {/* Rutas de administración - protegidas */}
          <Route path="/admin" element={
            <RutaProtegida requiereRol="admin">
              <AdminLayout />
            </RutaProtegida>
          }>
            <Route index element={<Dashboard />} />
            <Route path="aliados" element={<Aliados />} />
            <Route path="cupones" element={<Cupones />} />
            <Route path="planes" element={<PlanesAdmin />} />
            <Route path="transacciones" element={<Transacciones />} />
          </Route>
          
          {/* Redireccionar rutas no encontradas a Home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
            </Router>
            </ChatSentimientosProvider>
          </ReservasProvider>
        </CreditosProvider>
      </AuthProvider>
    </AppProvider>
  );
}

export default App;
