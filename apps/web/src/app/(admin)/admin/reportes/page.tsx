import EnConstruccion from '@/components/ui/UnderConstruction'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Reportes | MentalFit',
  description: 'Generación de reportes personalizados'
}

export default function PaginaReportes() {
  return (
    <EnConstruccion
      titulo="Reportes"
      descripcion="Generación de reportes personalizados"
      funcionalidadesEsperadas={[
        'Reportes predefinidos',
        'Constructor de reportes custom',
        'Programar reportes automáticos',
        'Exportar en múltiples formatos',
        'Compartir reportes',
        'Historial de reportes'
      ]}
    />
  )
}
