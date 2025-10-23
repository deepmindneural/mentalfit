import EnConstruccion from '@/components/ui/UnderConstruction'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Mi Perfil | MentalFit',
  description: 'Información personal'
}

export default function PaginaMiPerfil() {
  return (
    <EnConstruccion
      titulo="Mi Perfil"
      descripcion="Información personal"
      funcionalidadesEsperadas={[
        'Datos personales',
        'Foto de perfil',
        'Información de contacto',
        'Preferencias',
        'Editar perfil',
        'Verificación de cuenta'
      ]}
    />
  )
}
