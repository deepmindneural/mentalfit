import EnConstruccion from '@/components/ui/UnderConstruction'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Comisiones | MentalFit',
  description: 'Desglose de comisiones'
}

export default function PaginaComisiones() {
  return (
    <EnConstruccion
      titulo="Comisiones"
      descripcion="Desglose de comisiones"
      funcionalidadesEsperadas={[
        'Comisión de plataforma',
        'Cálculo de comisiones',
        'Historial mensual',
        'Detalle por sesión',
        'Políticas de comisión',
        'Exportar'
      ]}
    />
  )
}
