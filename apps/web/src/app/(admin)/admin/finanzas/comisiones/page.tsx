import EnConstruccion from '@/components/ui/UnderConstruction'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Comisiones | MentalFit',
  description: 'Gestión de comisiones'
}

export default function PaginaComisiones() {
  return (
    <EnConstruccion
      titulo="Comisiones"
      descripcion="Gestión de comisiones"
      funcionalidadesEsperadas={[
        'Comisiones por pagar',
        'Comisiones pagadas',
        'Comisiones por profesional',
        'Tasas de comisión',
        'Ajustes manuales',
        'Exportar reportes'
      ]}
    />
  )
}
