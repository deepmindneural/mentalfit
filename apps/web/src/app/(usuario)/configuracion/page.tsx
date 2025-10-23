import EnConstruccion from '@/components/ui/UnderConstruction'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Configuración | MentalFit',
  description: 'Ajustes de la cuenta'
}

export default function PaginaConfiguración() {
  return (
    <EnConstruccion
      titulo="Configuración"
      descripcion="Ajustes de la cuenta"
      funcionalidadesEsperadas={[
        'Configuración general',
        'Perfil',
        'Privacidad',
        'Notificaciones',
        'Seguridad',
        'Preferencias'
      ]}
    />
  )
}
