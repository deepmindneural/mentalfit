import EnConstruccion from '@/components/ui/UnderConstruction'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Ayuda con Pagos | MentalFit',
  description: 'Facturación y métodos de pago'
}

export default function PaginaAyudaconPagos() {
  return (
    <EnConstruccion
      titulo="Ayuda con Pagos"
      descripcion="Facturación y métodos de pago"
      funcionalidadesEsperadas={[
        'Métodos de pago aceptados',
        'Facturación y recibos',
        'Reembolsos y cancelaciones',
        'Planes y suscripciones',
        'Problemas de pago',
        'Cambiar método de pago'
      ]}
    />
  )
}
