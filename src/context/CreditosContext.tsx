import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAuth } from './AuthContext';

interface Transaccion {
  id: string;
  fechaCreacion: Date;
  concepto: string;
  tipo: 'cargo' | 'abono';
  cantidad: number;
  saldo: number;
  detalles?: string;
  conceptoId?: string;
  estado: 'completado' | 'pendiente' | 'cancelado';
}

interface Plan {
  id: string;
  nombre: string;
  creditos: number;
  precio: number;
  moneda: 'COP' | 'USD';
  vigenciaDias: number;
  descripcion: string;
  popular?: boolean;
  color?: string;
}

interface CreditosContextType {
  saldoActual: number;
  creditosGastados: number;
  transacciones: Transaccion[];
  planesDisponibles: Plan[];
  cargando: boolean;
  comprarPlan: (planId: string) => Promise<boolean>;
  obtenerHistorialTransacciones: () => Promise<Transaccion[]>;
  obtenerEstadisticasUso: () => Promise<any>;
  verificarSaldoSuficiente: (cantidad: number) => boolean;
  reservarCita: (especialistaId: string, fechaHora: Date, duracionMinutos: number, creditosCosto: number) => Promise<boolean>;
  descontarCreditos: (cantidad: number, detallesTransaccion: { concepto: string; detalles?: string }) => Promise<boolean>;
}

const CreditosContext = createContext<CreditosContextType | undefined>(undefined);

// Planes disponibles para comprar créditos
const PLANES_DISPONIBLES: Plan[] = [
  {
    id: '1',
    nombre: 'Plan Básico',
    creditos: 10,
    precio: 50000,
    moneda: 'COP',
    vigenciaDias: 30,
    descripcion: 'Ideal para consultas ocasionales',
    color: 'bg-primario-500'
  },
  {
    id: '2',
    nombre: 'Plan Estándar',
    creditos: 25,
    precio: 110000,
    moneda: 'COP',
    vigenciaDias: 60,
    descripcion: 'Para seguimiento continuo',
    popular: true,
    color: 'bg-acento-600'
  },
  {
    id: '3',
    nombre: 'Plan Premium',
    creditos: 50,
    precio: 200000,
    moneda: 'COP',
    vigenciaDias: 90,
    descripcion: 'Tratamiento completo con seguimiento continuo',
    color: 'bg-secundario-600'
  },
  {
    id: '4',
    nombre: 'Plan Empresarial',
    creditos: 200,
    precio: 750000,
    moneda: 'COP',
    vigenciaDias: 180,
    descripcion: 'Para empresas que desean brindar bienestar a sus empleados',
    color: 'bg-emerald-600'
  }
];

// Datos de ejemplo para desarrollo
const TRANSACCIONES_EJEMPLO: Transaccion[] = [
  {
    id: '1',
    fechaCreacion: new Date(2025, 4, 1),
    concepto: 'Compra de plan Estándar',
    tipo: 'abono',
    cantidad: 25,
    saldo: 25,
    conceptoId: '2',
    estado: 'completado'
  },
  {
    id: '2',
    fechaCreacion: new Date(2025, 4, 2),
    concepto: 'Consulta con Dr. Juan Pérez',
    tipo: 'cargo',
    cantidad: 5,
    saldo: 20,
    detalles: 'Consulta psicológica inicial',
    conceptoId: 'esp_1',
    estado: 'completado'
  },
  {
    id: '3',
    fechaCreacion: new Date(2025, 4, 10),
    concepto: 'Consulta con Dra. María López',
    tipo: 'cargo',
    cantidad: 5,
    saldo: 15,
    detalles: 'Terapia de seguimiento',
    conceptoId: 'esp_2',
    estado: 'completado'
  },
  {
    id: '4',
    fechaCreacion: new Date(2025, 4, 15),
    concepto: 'Prueba PHQ-9',
    tipo: 'cargo',
    cantidad: 2,
    saldo: 13,
    detalles: 'Evaluación de depresión',
    conceptoId: 'test_1',
    estado: 'completado'
  }
];

export const CreditosProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const { sesion } = useAuth();
  const [saldoActual, setSaldoActual] = useState<number>(0);
  const [creditosGastados, setCreditosGastados] = useState<number>(0);
  const [transacciones, setTransacciones] = useState<Transaccion[]>([]);
  const [cargando, setCargando] = useState<boolean>(true);
  
  // Cargar datos del usuario cuando se autentica
  useEffect(() => {
    const cargarDatosUsuario = async () => {
      if (sesion?.isAutenticado && sesion?.usuario) {
        setCargando(true);
        try {
          // En un entorno real, estas serían llamadas a la API
          // Por ahora usamos datos de ejemplo
          
          // Simular demora de red
          await new Promise(resolve => setTimeout(resolve, 800));
          
          setTransacciones(TRANSACCIONES_EJEMPLO);
          
          // Calcular saldo actual sumando abonos y restando cargos
          const saldo = TRANSACCIONES_EJEMPLO.reduce((total, t) => {
            if (t.tipo === 'abono') return total + t.cantidad;
            return total - t.cantidad;
          }, 0);
          
          setSaldoActual(saldo);
          
          // Calcular total de créditos gastados
          const gastados = TRANSACCIONES_EJEMPLO
            .filter(t => t.tipo === 'cargo')
            .reduce((total, t) => total + t.cantidad, 0);
          
          setCreditosGastados(gastados);
          
        } catch (error) {
          console.error('Error al cargar datos de créditos:', error);
        } finally {
          setCargando(false);
        }
      } else {
        // Usuario no autenticado, reiniciar estados
        setSaldoActual(0);
        setCreditosGastados(0);
        setTransacciones([]);
        setCargando(false);
      }
    };
    
    cargarDatosUsuario();
  }, [sesion]);
  
  // Comprar un plan de créditos
  const comprarPlan = async (planId: string): Promise<boolean> => {
    if (!sesion?.isAutenticado) return false;
    
    setCargando(true);
    try {
      // Simular llamada a API
      await new Promise(resolve => setTimeout(resolve, 1200));
      
      const planSeleccionado = PLANES_DISPONIBLES.find(p => p.id === planId);
      if (!planSeleccionado) return false;
      
      const nuevaTransaccion: Transaccion = {
        id: `tr_${Date.now()}`,
        fechaCreacion: new Date(),
        concepto: `Compra de ${planSeleccionado.nombre}`,
        tipo: 'abono',
        cantidad: planSeleccionado.creditos,
        saldo: saldoActual + planSeleccionado.creditos,
        conceptoId: planId,
        estado: 'completado'
      };
      
      const nuevasTransacciones = [nuevaTransaccion, ...transacciones];
      setTransacciones(nuevasTransacciones);
      setSaldoActual(saldoActual + planSeleccionado.creditos);
      
      return true;
    } catch (error) {
      console.error('Error al comprar plan:', error);
      return false;
    } finally {
      setCargando(false);
    }
  };
  
  // Obtener el historial completo de transacciones
  const obtenerHistorialTransacciones = async (): Promise<Transaccion[]> => {
    setCargando(true);
    try {
      // Simular llamada a API
      await new Promise(resolve => setTimeout(resolve, 500));
      return transacciones;
    } finally {
      setCargando(false);
    }
  };
  
  // Obtener estadísticas de uso de créditos
  const obtenerEstadisticasUso = async (): Promise<any> => {
    setCargando(true);
    try {
      // Simular llamada a API
      await new Promise(resolve => setTimeout(resolve, 700));
      
      // Agrupar por conceptos
      const porConcepto: Record<string, number> = {};
      transacciones
        .filter(t => t.tipo === 'cargo')
        .forEach(t => {
          const concepto = t.concepto.split(' con ')[0]; // Extraer tipo de concepto
          porConcepto[concepto] = (porConcepto[concepto] || 0) + t.cantidad;
        });
      
      // Agrupar por mes
      const porMes: Record<string, number> = {};
      transacciones
        .filter(t => t.tipo === 'cargo')
        .forEach(t => {
          const mes = t.fechaCreacion.toLocaleDateString('es-ES', { month: 'long' });
          porMes[mes] = (porMes[mes] || 0) + t.cantidad;
        });
      
      return {
        creditosTotales: creditosGastados + saldoActual,
        creditosGastados,
        saldoActual,
        porcentajeUso: creditosGastados / (creditosGastados + saldoActual) * 100,
        distribucionPorConcepto: porConcepto,
        distribucionPorMes: porMes
      };
    } finally {
      setCargando(false);
    }
  };
  
  // Verificar si el saldo es suficiente para una operación
  const verificarSaldoSuficiente = (cantidad: number): boolean => {
    return saldoActual >= cantidad;
  };
  
  // Reservar una cita con especialista
  const reservarCita = async (
    especialistaId: string, 
    fechaHora: Date, 
    duracionMinutos: number,
    creditosCosto: number
  ): Promise<boolean> => {
    if (!sesion?.isAutenticado) return false;
    if (saldoActual < creditosCosto) return false;
    
    setCargando(true);
    try {
      // Simular llamada a API
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const nuevaTransaccion: Transaccion = {
        id: `tr_${Date.now()}`,
        fechaCreacion: new Date(),
        concepto: `Reserva de cita ${fechaHora.toLocaleDateString()}`,
        tipo: 'cargo',
        cantidad: creditosCosto,
        saldo: saldoActual - creditosCosto,
        detalles: `Cita de ${duracionMinutos} minutos`,
        conceptoId: especialistaId,
        estado: 'completado'
      };
      
      const nuevasTransacciones = [nuevaTransaccion, ...transacciones];
      setTransacciones(nuevasTransacciones);
      setSaldoActual(saldoActual - creditosCosto);
      setCreditosGastados(creditosGastados + creditosCosto);
      
      return true;
    } catch (error) {
      console.error('Error al reservar cita:', error);
      return false;
    } finally {
      setCargando(false);
    }
  };
  
  // Descontar créditos para cualquier tipo de servicio
  const descontarCreditos = async (cantidad: number, detallesTransaccion: { concepto: string; detalles?: string }): Promise<boolean> => {
    if (!sesion?.isAutenticado) return false;
    if (saldoActual < cantidad) return false;
    
    setCargando(true);
    try {
      // Simular llamada a API
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Crear transacción de cargo
      const nuevaTransaccion: Transaccion = {
        id: `tr_${Date.now()}`,
        fechaCreacion: new Date(),
        concepto: detallesTransaccion.concepto,
        tipo: 'cargo',
        cantidad: cantidad,
        saldo: saldoActual - cantidad,
        detalles: detallesTransaccion.detalles,
        estado: 'completado'
      };
      
      const nuevasTransacciones = [nuevaTransaccion, ...transacciones];
      setTransacciones(nuevasTransacciones);
      setSaldoActual(saldoActual - cantidad);
      setCreditosGastados(creditosGastados + cantidad);
      
      return true;
    } catch (error) {
      console.error('Error al descontar créditos:', error);
      return false;
    } finally {
      setCargando(false);
    }
  };
  
  const contextValue: CreditosContextType = {
    saldoActual,
    creditosGastados,
    transacciones,
    planesDisponibles: PLANES_DISPONIBLES,
    cargando,
    comprarPlan,
    obtenerHistorialTransacciones,
    obtenerEstadisticasUso,
    verificarSaldoSuficiente,
    reservarCita,
    descontarCreditos
  };

  return (
    <CreditosContext.Provider value={contextValue}>
      {children}
    </CreditosContext.Provider>
  );
};

export const useCreditos = (): CreditosContextType => {
  const context = useContext(CreditosContext);
  if (context === undefined) {
    throw new Error('useCreditos debe ser usado dentro de un CreditosProvider');
  }
  return context;
};
