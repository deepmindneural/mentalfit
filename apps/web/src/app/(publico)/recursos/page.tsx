import EnConstruccion from '@/components/ui/UnderConstruction'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Recursos Gratuitos | MentalFit',
  description: 'Herramientas y contenido descargable'
}

export default function PaginaRecursosGratuitos() {
  return (
    <EnConstruccion
      titulo="Recursos Gratuitos"
      descripcion="Herramientas y contenido descargable"
      funcionalidadesEsperadas={[
        'Guías descargables en PDF',
        'Videos educativos',
        'Ejercicios de mindfulness',
        'Plantillas de seguimiento',
        'Webinars grabados',
        'Kit de primeros auxilios emocionales'
      ]}
    />
  )
}
