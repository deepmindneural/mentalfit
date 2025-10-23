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
        'Modificar datos',
        'Cambiar foto',
        'Actualizar contacto',
        'Preferencias personales',
        'Guardar cambios',
        'Cancelar edición'
      ]}
    />
  )
}
