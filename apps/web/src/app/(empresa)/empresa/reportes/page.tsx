import EnConstruccion from '@/components/ui/UnderConstruction'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Reportes Empresariales | MentalFit',
  description: 'Generación de reportes'
}

export default function PaginaReportesEmpresariales() {
  return (
    <EnConstruccion
      titulo="Reportes Empresariales"
      descripcion="Generación de reportes"
      funcionalidadesEsperadas={[
        'Reportes predefinidos',
        'Constructor personalizado',
        'Programar envíos',
        'Compartir con stakeholders',
        'Exportar múltiples formatos',
        'Historial de reportes'
      ]}
    />
  )
}
