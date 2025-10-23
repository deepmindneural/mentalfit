import EnConstruccion from '@/components/ui/UnderConstruction'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Facturas | MentalFit',
  description: 'Gestión de facturación'
}

export default function PaginaFacturas() {
  return (
    <EnConstruccion
      titulo="Facturas"
      descripcion="Gestión de facturación"
      funcionalidadesEsperadas={[
        'Lista de facturas',
        'Búsqueda y filtros',
        'Estado de facturas',
        'Generar facturas',
        'Exportar',
        'Envío automático'
      ]}
    />
  )
}
