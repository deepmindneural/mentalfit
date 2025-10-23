'use client';

import { useEffect, useState } from 'react';
import { Search, Filter, Plus, MoreVertical, Mail, Phone, Calendar } from 'lucide-react';
import TablaDatos, { Columna } from '@/components/ui/TablaDatos';
import Boton from '@/components/ui/Boton';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Tarjeta from '@/components/ui/Tarjeta';
import Avatar from '@/components/ui/Avatar';
import Insignia from '@/components/ui/Insignia';
import MenuDesplegable from '@/components/ui/MenuDesplegable';
import Paginacion from '@/components/ui/Paginacion';
import Esqueleto from '@/components/ui/Esqueleto';
import { useUsuarioActual } from '@/hooks/useSupabase';

interface Paciente {
  id: string;
  nombre: string;
  email: string;
  telefono: string;
  estado: 'activo' | 'inactivo' | 'pendiente';
  proximaSesion: string | null;
  totalSesiones: number;
  ultimaSesion: string | null;
}

export default function PaginaPacientes() {
  const { usuario, cargando: cargandoUsuario } = useUsuarioActual();
  const [pacientes, setPacientes] = useState<Paciente[]>([]);
  const [pacientesFiltrados, setPacientesFiltrados] = useState<Paciente[]>([]);
  const [busqueda, setBusqueda] = useState('');
  const [filtroEstado, setFiltroEstado] = useState('');
  const [paginaActual, setPaginaActual] = useState(1);
  const [cargando, setCargando] = useState(true);
  const [profesionalId, setProfesionalId] = useState<string | null>(null);

  // Obtener el ID del profesional
  useEffect(() => {
    async function obtenerProfesionalId() {
      if (!usuario) return;

      try {
        const response = await fetch(`/api/profesionales?usuario_id=${usuario.id}`);
        if (response.ok) {
          const data = await response.json();
          if (data.length > 0) {
            setProfesionalId(data[0].id);
          }
        }
      } catch (error) {
        console.error('Error al obtener profesional:', error);
      }
    }

    if (usuario) {
      obtenerProfesionalId();
    }
  }, [usuario]);

  // Cargar pacientes
  useEffect(() => {
    async function cargarPacientes() {
      if (!profesionalId) return;

      try {
        setCargando(true);
        const params = new URLSearchParams({
          profesional_id: profesionalId,
        });

        if (filtroEstado) {
          params.append('estado', filtroEstado);
        }

        if (busqueda) {
          params.append('busqueda', busqueda);
        }

        const response = await fetch(`/api/pacientes?${params}`);
        if (response.ok) {
          const data = await response.json();
          setPacientes(data);
          setPacientesFiltrados(data);
        }
      } catch (error) {
        console.error('Error al cargar pacientes:', error);
      } finally {
        setCargando(false);
      }
    }

    cargarPacientes();
  }, [profesionalId, filtroEstado, busqueda]);

  const columnas: Columna<Paciente>[] = [
    {
      clave: 'nombre',
      etiqueta: 'Paciente',
      ordenable: true,
      renderizar: (paciente) => (
        <div className="flex items-center gap-3">
          <Avatar
            iniciales={paciente.nombre.split(' ').map(n => n[0]).join('')}
            tamano="sm"
          />
          <div>
            <p className="font-medium text-gray-900 dark:text-white">
              {paciente.nombre}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {paciente.email}
            </p>
          </div>
        </div>
      ),
    },
    {
      clave: 'telefono',
      etiqueta: 'Teléfono',
      renderizar: (paciente) => (
        <span className="text-gray-600 dark:text-gray-300">{paciente.telefono}</span>
      ),
    },
    {
      clave: 'estado',
      etiqueta: 'Estado',
      renderizar: (paciente) => {
        const variantes = {
          activo: 'exito' as const,
          inactivo: 'gris' as const,
          pendiente: 'advertencia' as const,
        };

        return (
          <Insignia variante={variantes[paciente.estado]}>
            {paciente.estado.charAt(0).toUpperCase() + paciente.estado.slice(1)}
          </Insignia>
        );
      },
    },
    {
      clave: 'totalSesiones',
      etiqueta: 'Sesiones',
      alineacion: 'centro',
      renderizar: (paciente) => (
        <span className="font-medium">{paciente.totalSesiones}</span>
      ),
    },
    {
      clave: 'proximaSesion',
      etiqueta: 'Próxima Sesión',
      renderizar: (paciente) => (
        <span className="text-gray-600 dark:text-gray-300">
          {paciente.proximaSesion
            ? new Date(paciente.proximaSesion).toLocaleDateString('es-ES', {
                day: '2-digit',
                month: 'short',
                hour: '2-digit',
                minute: '2-digit',
              })
            : '-'
          }
        </span>
      ),
    },
    {
      clave: 'acciones',
      etiqueta: 'Acciones',
      alineacion: 'centro',
      renderizar: (paciente) => (
        <MenuDesplegable
          disparador={
            <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
              <MoreVertical className="h-4 w-4" />
            </button>
          }
          items={[
            { etiqueta: 'Ver Expediente', onClick: () => {} },
            { etiqueta: 'Agendar Sesión', onClick: () => {}, icono: <Calendar className="h-4 w-4" /> },
            { etiqueta: 'Enviar Mensaje', onClick: () => {}, icono: <Mail className="h-4 w-4" /> },
            'divider',
            { etiqueta: 'Desactivar', onClick: () => {}, variante: 'peligro' },
          ]}
        />
      ),
    },
  ];

  if (cargandoUsuario || cargando) {
    return (
      <div className="space-y-6">
        <Esqueleto alto="80px" />
        <Esqueleto alto="80px" />
        <Esqueleto alto="400px" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Mis Pacientes
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Gestiona tu lista de pacientes
          </p>
        </div>

        <Boton variante="primario" icono={<Plus className="h-4 w-4" />}>
          Nuevo Paciente
        </Boton>
      </div>

      {/* Filtros */}
      <Tarjeta>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input
            placeholder="Buscar por nombre, email..."
            icono={<Search className="h-4 w-4" />}
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />

          <Select
            opciones={[
              { valor: '', etiqueta: 'Todos los estados' },
              { valor: 'activo', etiqueta: 'Activos' },
              { valor: 'inactivo', etiqueta: 'Inactivos' },
              { valor: 'pendiente', etiqueta: 'Pendientes' },
            ]}
            value={filtroEstado}
            onChange={(e) => setFiltroEstado(e.target.value)}
          />

          <Boton variante="secundario" icono={<Filter className="h-4 w-4" />}>
            Más Filtros
          </Boton>
        </div>
      </Tarjeta>

      {/* Tabla */}
      <Tarjeta padding="none">
        <TablaDatos
          datos={pacientesFiltrados}
          columnas={columnas}
          alClickFila={(paciente) => console.log('Ver paciente:', paciente)}
        />

        <Paginacion
          paginaActual={paginaActual}
          totalPaginas={Math.ceil(pacientesFiltrados.length / 10)}
          alCambiarPagina={setPaginaActual}
          totalElementos={pacientesFiltrados.length}
          elementosPorPagina={10}
        />
      </Tarjeta>
    </div>
  );
}
