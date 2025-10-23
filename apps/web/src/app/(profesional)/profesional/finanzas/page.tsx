import { Metadata } from 'next'
import EnConstruccion from '@/components/ui/UnderConstruction'

export const metadata: Metadata = {
  title: 'Finanzas - Profesional MentalFit',
  description: 'Panel financiero.',
}

export default function Pagina() {
  return (
    <EnConstruccion
      titulo="Finanzas"
      descripcion="Administra tus finanzas."
      funcionalidadesEsperadas={[
        'Resumen financiero',
        'Ingresos del mes',
        'Pagos pendientes',
        'Acceso a subsecciones',
        'Proyecciones',
      ]}
    />
  )
}
