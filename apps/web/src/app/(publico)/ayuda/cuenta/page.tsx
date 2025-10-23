import EnConstruccion from '@/components/ui/UnderConstruction'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Ayuda con tu Cuenta | MentalFit',
  description: 'Gestión de cuenta y perfil'
}

export default function PaginaAyudacontuCuenta() {
  return (
    <EnConstruccion
      titulo="Ayuda con tu Cuenta"
      descripcion="Gestión de cuenta y perfil"
      funcionalidadesEsperadas={[
        'Recuperar contraseña',
        'Cambiar email',
        'Actualizar datos personales',
        'Configurar notificaciones',
        'Eliminar cuenta',
        'Exportar datos'
      ]}
    />
  )
}
