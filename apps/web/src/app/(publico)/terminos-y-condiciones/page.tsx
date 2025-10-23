import EnConstruccion from '@/components/ui/UnderConstruction'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Términos y Condiciones | MentalFit',
  description: 'Condiciones de uso de la plataforma'
}

export default function PaginaTérminosyCondiciones() {
  return (
    <EnConstruccion
      titulo="Términos y Condiciones"
      descripcion="Condiciones de uso de la plataforma"
      funcionalidadesEsperadas={[
        'Términos de uso generales',
        'Derechos y obligaciones',
        'Políticas de uso aceptable',
        'Limitaciones de responsabilidad',
        'Modificaciones de términos',
        'Resolución de disputas'
      ]}
    />
  )
}
