import EnConstruccion from '@/components/ui/UnderConstruction'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Experiencia | MentalFit',
  description: 'Trayectoria profesional'
}

export default function PaginaExperiencia() {
  return (
    <EnConstruccion
      titulo="Experiencia"
      descripcion="Trayectoria profesional"
      funcionalidadesEsperadas={[
        'Años de experiencia',
        'Instituciones previas',
        'Áreas de especialización',
        'Poblaciones atendidas',
        'Enfoques terapéuticos',
        'Actualizar'
      ]}
    />
  )
}
