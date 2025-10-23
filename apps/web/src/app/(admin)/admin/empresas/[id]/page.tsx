import EnConstruccion from '@/components/ui/UnderConstruction'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Detalle de Empresa | MentalFit',
  description: 'Vista completa de organización'
}

export default function PaginaDetalleEmpresa() {
  return (
    <EnConstruccion
      titulo="Detalle de Empresa"
      descripcion="Vista completa de organización"
      funcionalidadesEsperadas={[
        'Información general',
        'Empleados activos',
        'Uso de la plataforma',
        'Facturación histórica',
        'Métricas de bienestar',
        'Timeline de eventos'
      ]}
    />
  )
}
