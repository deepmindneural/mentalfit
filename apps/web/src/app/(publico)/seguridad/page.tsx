import EnConstruccion from '@/components/ui/UnderConstruction'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Centro de Seguridad | MentalFit',
  description: 'Protección de datos y privacidad'
}

export default function PaginaCentrodeSeguridad() {
  return (
    <EnConstruccion
      titulo="Centro de Seguridad"
      descripcion="Protección de datos y privacidad"
      funcionalidadesEsperadas={[
        'Encriptación end-to-end',
        'Autenticación de dos factores',
        'Políticas de contraseñas',
        'Monitoreo de seguridad 24/7',
        'Gestión de incidentes',
        'Mejores prácticas de seguridad'
      ]}
    />
  )
}
