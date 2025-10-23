'use client';

import { useState } from 'react';
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

interface Paciente {
  id: number;
  nombre: string;
  email: string;
  telefono: string;
  estado: 'activo' | 'inactivo' | 'pendiente';
  proximaSesion: string;
  totalSesiones: number;
  ultimaSesion: string;
}

const datosPacientes: Paciente[] = [
  {
    id: 1,
    nombre: 'María González',
    email: 'maria.gonzalez@email.com',
    telefono: '+34 612 345 678',
    estado: 'activo',
    proximaSesion: '2025-01-25 10:00',
    totalSesiones: 12,
    ultimaSesion: '2025-01-18',
  },
  {
    id: 2,
    nombre: 'Carlos Rodríguez',
    email: 'carlos.rodriguez@email.com',
    telefono: '+34 623 456 789',
    estado: 'activo',
    proximaSesion: '2025-01-24 15:30',
    totalSesiones: 8,
    ultimaSesion: '2025-01-17',
  },
  {
    id: 3,
    nombre: 'Ana Martínez',
    email: 'ana.martinez@email.com',
    telefono: '+34 634 567 890',
    estado: 'pendiente',
    proximaSesion: '2025-01-26 11:00',
    totalSesiones: 1,
    ultimaSesion: '2025-01-10',
  },
  {
    id: 4,
    nombre: 'Juan Pérez',
    email: 'juan.perez@email.com',
    telefono: '+34 645 678 901',
    estado: 'activo',
    proximaSesion: '2025-01-27 09:00',
    totalSesiones: 15,
    ultimaSesion: '2025-01-19',
  },
  {
    id: 5,
    nombre: 'Laura Sánchez',
    email: 'laura.sanchez@email.com',
    telefono: '+34 656 789 012',
    estado: 'inactivo',
    proximaSesion: '-',
    totalSesiones: 5,
    ultimaSesion: '2024-12-20',
  },
];

export default function PaginaPacientes() {
  const [busqueda, setBusqueda] = useState('');
  const [filtroEstado, setFiltroEstado] = useState('');
  const [paginaActual, setPaginaActual] = useState(1);

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
          {paciente.proximaSesion !== '-'
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
          datos={datosPacientes}
          columnas={columnas}
          alClickFila={(paciente) => console.log('Ver paciente:', paciente)}
        />

        <Paginacion
          paginaActual={paginaActual}
          totalPaginas={5}
          alCambiarPagina={setPaginaActual}
          totalElementos={42}
          elementosPorPagina={10}
        />
      </Tarjeta>
    </div>
  );
}
