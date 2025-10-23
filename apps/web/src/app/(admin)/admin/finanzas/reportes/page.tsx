import EnConstruccion from '@/components/ui/UnderConstruction'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Reportes Financieros | MentalFit',
  description: 'Análisis financiero'
}

export default function PaginaReportesFinancieros() {
  return (
    <EnConstruccion
      titulo="Reportes Financieros"
      descripcion="Análisis financiero"
      funcionalidadesEsperadas={[
        'Reportes predefinidos',
        'Constructor de reportes',
        'Programar envíos',
        'Exportar formatos',
        'Compartir',
        'Historial'
      ]}
    />
  )
}
