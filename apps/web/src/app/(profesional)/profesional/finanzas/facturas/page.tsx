import EnConstruccion from '@/components/ui/UnderConstruction'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Mis Facturas | MentalFit',
  description: 'Facturación emitida'
}

export default function PaginaMisFacturas() {
  return (
    <EnConstruccion
      titulo="Mis Facturas"
      descripcion="Facturación emitida"
      funcionalidadesEsperadas={[
        'Facturas generadas',
        'Descargar facturas',
        'Estado de pagos',
        'Búsqueda por fecha',
        'Exportar',
        'Configuración fiscal'
      ]}
    />
  )
}
