import EnConstruccion from '@/components/ui/UnderConstruction'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Gestión de Empresas | MentalFit',
  description: 'Administrar organizaciones'
}

export default function PaginaGestióndeEmpresas() {
  return (
    <EnConstruccion
      titulo="Gestión de Empresas"
      descripcion="Administrar organizaciones"
      funcionalidadesEsperadas={[
        'Lista de empresas activas',
        'Búsqueda y filtros',
        'Estado de suscripciones',
        'Crear nueva empresa',
        'Métricas por empresa',
        'Acciones masivas'
      ]}
    />
  )
}
