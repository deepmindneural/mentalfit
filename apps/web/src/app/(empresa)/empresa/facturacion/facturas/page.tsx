import EnConstruccion from '@/components/ui/UnderConstruction'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Facturas | MentalFit',
  description: 'Historial de pagos'
}

export default function PaginaFacturas() {
  return (
    <EnConstruccion
      titulo="Facturas"
      descripcion="Historial de pagos"
      funcionalidadesEsperadas={[
        'Lista de facturas',
        'Descargar facturas',
        'Estado de pagos',
        'Búsqueda por fecha',
        'Exportar',
        'Configurar envío automático'
      ]}
    />
  )
}
