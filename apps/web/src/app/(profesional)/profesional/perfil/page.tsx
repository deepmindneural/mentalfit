import EnConstruccion from '@/components/ui/UnderConstruction'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Mi Perfil Profesional | MentalFit',
  description: 'Información pública'
}

export default function PaginaMiPerfilProfesional() {
  return (
    <EnConstruccion
      titulo="Mi Perfil Profesional"
      descripcion="Información pública"
      funcionalidadesEsperadas={[
        'Foto y datos personales',
        'Biografía profesional',
        'Especialidades',
        'Idiomas',
        'Certificaciones',
        'Preview de perfil público'
      ]}
    />
  )
}
