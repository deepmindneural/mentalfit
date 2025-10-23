import EnConstruccion from '@/components/ui/UnderConstruction'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contraseña Actualizada | MentalFit',
  description: 'Tu contraseña ha sido cambiada'
}

export default function PaginaContraseñaActualizada() {
  return (
    <EnConstruccion
      titulo="Contraseña Actualizada"
      descripcion="Tu contraseña ha sido cambiada"
      funcionalidadesEsperadas={[
        'Confirmación de cambio',
        'Iniciar sesión',
        'Configurar 2FA',
        'Revisar sesiones activas',
        'Consejos de seguridad',
        'Volver al perfil'
      ]}
    />
  )
}
