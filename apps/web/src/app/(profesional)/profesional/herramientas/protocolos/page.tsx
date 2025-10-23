import EnConstruccion from '@/components/ui/UnderConstruction'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Protocolos | MentalFit',
  description: 'Guías de intervención'
}

export default function PaginaProtocolos() {
  return (
    <EnConstruccion
      titulo="Protocolos"
      descripcion="Guías de intervención"
      funcionalidadesEsperadas={[
        'Protocolos por diagnóstico',
        'Evidencia científica',
        'Pasos de aplicación',
        'Recursos complementarios',
        'Favoritos',
        'Búsqueda'
      ]}
    />
  )
}
