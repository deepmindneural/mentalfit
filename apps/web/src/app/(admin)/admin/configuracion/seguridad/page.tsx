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
        'Políticas de contraseñas',
        '2FA obligatorio',
        'Sesiones y timeouts',
        'IP whitelist',
        'Logs de seguridad',
        'Incidentes de seguridad'
      ]}
    />
  )
}
