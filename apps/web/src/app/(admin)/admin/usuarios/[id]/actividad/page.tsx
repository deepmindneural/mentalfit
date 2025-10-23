import EnConstruccion from '@/components/ui/UnderConstruction'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Actividad Usuario | MentalFit',
  description: 'Log de acciones'
}

export default function PaginaActividadUsuario() {
  return (
    <EnConstruccion
      titulo="Actividad Usuario"
      descripcion="Log de acciones"
      funcionalidadesEsperadas={[
        'Registro de actividad',
        'Logins y accesos',
        'Uso de recursos',
        'Interacciones',
        'Dispositivos utilizados',
        'Timeline completo'
      ]}
    />
  )
}
