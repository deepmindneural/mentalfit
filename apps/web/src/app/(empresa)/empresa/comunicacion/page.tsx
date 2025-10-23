import EnConstruccion from '@/components/ui/UnderConstruction'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Centro de Comunicación | MentalFit',
  description: 'Anuncios y comunicados'
}

export default function PaginaCentrodeComunicación() {
  return (
    <EnConstruccion
      titulo="Centro de Comunicación"
      descripcion="Anuncios y comunicados"
      funcionalidadesEsperadas={[
        'Crear anuncio interno',
        'Plantillas de comunicación',
        'Historial de comunicados',
        'Alcance y engagement',
        'Programar envíos',
        'Estadísticas'
      ]}
    />
  )
}
