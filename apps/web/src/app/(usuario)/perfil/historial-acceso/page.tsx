import EnConstruccion from '@/components/ui/UnderConstruction'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Historial de Accesos | MentalFit',
  description: 'Log de actividad'
}

export default function PaginaHistorialdeAccesos() {
  return (
    <EnConstruccion
      titulo="Historial de Accesos"
      descripcion="Log de actividad"
      funcionalidadesEsperadas={[
        'Registros de login',
        'Fecha y hora',
        'Dispositivo y ubicación',
        'IP address',
        'Eventos de seguridad',
        'Exportar historial'
      ]}
    />
  )
}
