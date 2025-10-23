import EnConstruccion from '@/components/ui/UnderConstruction'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Templates | MentalFit',
  description: 'Plantillas de contenido'
}

export default function PaginaTemplates() {
  return (
    <EnConstruccion
      titulo="Templates"
      descripcion="Plantillas de contenido"
      funcionalidadesEsperadas={[
        'Templates de email',
        'Templates de notificaciones',
        'Templates de documentos',
        'Variables dinámicas',
        'Preview',
        'Versiones'
      ]}
    />
  )
}
