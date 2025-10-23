import EnConstruccion from '@/components/ui/UnderConstruction'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'MentalFit para Empresas | MentalFit',
  description: 'Soluciones de salud mental para tu organización'
}

export default function PaginaEmpresas() {
  return (
    <EnConstruccion
      titulo="MentalFit para Empresas"
      descripcion="Potencia el bienestar de tus colaboradores"
      funcionalidadesEsperadas={[
        'Planes corporativos y beneficios',
        'Dashboard de métricas organizacionales',
        'ROI y análisis de impacto',
        'Programas de bienestar personalizados',
        'Soporte dedicado para RRHH',
        'Integraciones con plataformas empresariales'
      ]}
    />
  )
}
