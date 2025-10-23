import EnConstruccion from '@/components/ui/UnderConstruction'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Cuenta Suspendida | MentalFit',
  description: 'Tu cuenta ha sido suspendida'
}

export default function PaginaCuentaSuspendida() {
  return (
    <EnConstruccion
      titulo="Cuenta Suspendida"
      descripcion="Tu cuenta ha sido suspendida"
      funcionalidadesEsperadas={[
        'Motivo de suspensión',
        'Pasos para reactivación',
        'Contactar soporte',
        'Revisar términos de servicio',
        'Apelar decisión',
        'Información de contacto'
      ]}
    />
  )
}
