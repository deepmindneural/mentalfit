import EnConstruccion from '@/components/ui/UnderConstruction'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Suscripción Actualizada | MentalFit',
  description: 'Tu plan ha sido modificado'
}

export default function PaginaSuscripciónActualizada() {
  return (
    <EnConstruccion
      titulo="Suscripción Actualizada"
      descripcion="Tu plan ha sido modificado"
      funcionalidadesEsperadas={[
        'Confirmación de cambio',
        'Detalles del nuevo plan',
        'Beneficios incluidos',
        'Próximo pago',
        'Ver factura',
        'Acceder al dashboard'
      ]}
    />
  )
}
