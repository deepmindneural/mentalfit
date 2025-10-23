import EnConstruccion from '@/components/ui/UnderConstruction'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Mi Plan | MentalFit',
  description: 'Suscripción y beneficios'
}

export default function PaginaMiPlan() {
  return (
    <EnConstruccion
      titulo="Mi Plan"
      descripcion="Suscripción y beneficios"
      funcionalidadesEsperadas={[
        'Plan actual',
        'Beneficios incluidos',
        'Límites de uso',
        'Próximo pago',
        'Cambiar plan',
        'Historial de suscripción'
      ]}
    />
  )
}
