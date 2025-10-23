import EnConstruccion from '@/components/ui/UnderConstruction'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Cambiar Contraseña | MentalFit',
  description: 'Actualizar contraseña'
}

export default function PaginaCambiarContraseña() {
  return (
    <EnConstruccion
      titulo="Cambiar Contraseña"
      descripcion="Actualizar contraseña"
      funcionalidadesEsperadas={[
        'Contraseña actual',
        'Nueva contraseña',
        'Confirmar contraseña',
        'Requisitos de seguridad',
        'Cerrar otras sesiones',
        'Actualizar contraseña'
      ]}
    />
  )
}
