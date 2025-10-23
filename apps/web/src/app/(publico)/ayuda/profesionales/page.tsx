import EnConstruccion from '@/components/ui/UnderConstruction'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Ayuda para Profesionales | MentalFit',
  description: 'Guías para terapeutas'
}

export default function PaginaAyudaparaProfesionales() {
  return (
    <EnConstruccion
      titulo="Ayuda para Profesionales"
      descripcion="Guías para terapeutas"
      funcionalidadesEsperadas={[
        'Onboarding de profesionales',
        'Gestión de agenda',
        'Sesiones virtuales',
        'Historial de pacientes',
        'Facturación y pagos',
        'Herramientas clínicas'
      ]}
    />
  )
}
