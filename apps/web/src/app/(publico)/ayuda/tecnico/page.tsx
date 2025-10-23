import EnConstruccion from '@/components/ui/UnderConstruction'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Soporte Técnico | MentalFit',
  description: 'Problemas técnicos de la plataforma'
}

export default function PaginaSoporteTécnico() {
  return (
    <EnConstruccion
      titulo="Soporte Técnico"
      descripcion="Problemas técnicos de la plataforma"
      funcionalidadesEsperadas={[
        'Requisitos del sistema',
        'Problemas de conexión',
        'Navegadores compatibles',
        'Audio y video',
        'Aplicaciones móviles',
        'Solución de problemas comunes'
      ]}
    />
  )
}
