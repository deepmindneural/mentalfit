import EnConstruccion from '@/components/ui/UnderConstruction'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Seguridad | MentalFit',
  description: 'Configuración de seguridad'
}

export default function PaginaSeguridad() {
  return (
    <EnConstruccion
      titulo="Seguridad"
      descripcion="Configuración de seguridad"
      funcionalidadesEsperadas={[
        'Cambiar contraseña',
        'Autenticación de dos factores',
        'Sesiones activas',
        'Dispositivos conectados',
        'Historial de accesos',
        'Alertas de seguridad'
      ]}
    />
  )
}
