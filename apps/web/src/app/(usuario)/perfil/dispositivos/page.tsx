import EnConstruccion from '@/components/ui/UnderConstruction'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Dispositivos Conectados | MentalFit',
  description: 'Gestión de accesos'
}

export default function PaginaDispositivosConectados() {
  return (
    <EnConstruccion
      titulo="Dispositivos Conectados"
      descripcion="Gestión de accesos"
      funcionalidadesEsperadas={[
        'Lista de dispositivos',
        'Última actividad',
        'Ubicación aproximada',
        'Cerrar sesión remota',
        'Dispositivo actual',
        'Historial de conexiones'
      ]}
    />
  )
}
