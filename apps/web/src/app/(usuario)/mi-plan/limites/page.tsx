import EnConstruccion from '@/components/ui/UnderConstruction'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Límites del Plan | MentalFit',
  description: 'Restricciones actuales'
}

export default function PaginaLímitesdelPlan() {
  return (
    <EnConstruccion
      titulo="Límites del Plan"
      descripcion="Restricciones actuales"
      funcionalidadesEsperadas={[
        'Límite de sesiones mensuales',
        'Sesiones restantes',
        'Tipos de terapia incluidos',
        'Restricciones',
        'Solicitar aumento',
        'Upgrade de plan'
      ]}
    />
  )
}
