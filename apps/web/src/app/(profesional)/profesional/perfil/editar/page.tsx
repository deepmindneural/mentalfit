import EnConstruccion from '@/components/ui/UnderConstruction'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Editar Perfil | MentalFit',
  description: 'Actualizar información'
}

export default function PaginaEditarPerfil() {
  return (
    <EnConstruccion
      titulo="Editar Perfil"
      descripcion="Actualizar información"
      funcionalidadesEsperadas={[
        'Actualizar datos',
        'Cambiar foto',
        'Modificar biografía',
        'Agregar especialidades',
        'Actualizar idiomas',
        'Guardar cambios'
      ]}
    />
  )
}
