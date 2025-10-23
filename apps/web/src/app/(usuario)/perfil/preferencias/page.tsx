import EnConstruccion from '@/components/ui/UnderConstruction'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Preferencias | MentalFit',
  description: 'Configuración personal'
}

export default function PaginaPreferencias() {
  return (
    <EnConstruccion
      titulo="Preferencias"
      descripcion="Configuración personal"
      funcionalidadesEsperadas={[
        'Idioma preferido',
        'Zona horaria',
        'Tipo de terapia preferida',
        'Género de terapeuta',
        'Especialidades de interés',
        'Guardar preferencias'
      ]}
    />
  )
}
