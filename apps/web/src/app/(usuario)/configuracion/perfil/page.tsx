import EnConstruccion from '@/components/ui/UnderConstruction'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Configuración de Perfil | MentalFit',
  description: 'Ajustes personales'
}

export default function PaginaConfiguracióndePerfil() {
  return (
    <EnConstruccion
      titulo="Configuración de Perfil"
      descripcion="Ajustes personales"
      funcionalidadesEsperadas={[
        'Editar datos',
        'Foto de perfil',
        'Información de contacto',
        'Verificación',
        'Eliminar cuenta',
        'Guardar cambios'
      ]}
    />
  )
}
