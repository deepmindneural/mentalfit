import EnConstruccion from '@/components/ui/UnderConstruction'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Facturación | MentalFit',
  description: 'Gestión de pagos corporativos'
}

export default function PaginaFacturación() {
  return (
    <EnConstruccion
      titulo="Facturación"
      descripcion="Gestión de pagos corporativos"
      funcionalidadesEsperadas={[
        'Plan actual',
        'Próximo pago',
        'Historial de facturas',
        'Método de pago',
        'Información fiscal',
        'Contacto facturación'
      ]}
    />
  )
}
