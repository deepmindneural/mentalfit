import { Metadata } from 'next'
import EnConstruccion from '@/components/ui/UnderConstruction'

export const metadata: Metadata = {
  title: 'Ingresos - Profesional MentalFit',
  description: 'Detalle de ingresos.',
}

export default function Pagina() {
  return (
    <EnConstruccion
      titulo="Ingresos"
      descripcion="Análisis detallado de ingresos."
      funcionalidadesEsperadas={[
        'Ingresos por período',
        'Desglose por paciente',
        'Tipos de sesión',
        'Gráficos de tendencias',
        'Exportar datos',
      ]}
    />
  )
}
