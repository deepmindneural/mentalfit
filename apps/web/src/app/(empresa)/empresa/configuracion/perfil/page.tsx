import EnConstruccion from '@/components/ui/UnderConstruction'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Perfil Corporativo | MentalFit',
  description: 'Datos de la organización'
}

export default function PaginaPerfilCorporativo() {
  return (
    <EnConstruccion
      titulo="Perfil Corporativo"
      descripcion="Datos de la organización"
      funcionalidadesEsperadas={[
        'Información de la empresa',
        'Logo y branding',
        'Datos de contacto',
        'Dominio corporativo',
        'Información fiscal',
        'Actualizar datos'
      ]}
    />
  )
}
