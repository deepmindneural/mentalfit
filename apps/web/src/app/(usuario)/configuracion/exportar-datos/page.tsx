import EnConstruccion from '@/components/ui/UnderConstruction'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Exportar Datos | MentalFit',
  description: 'Descarga de información personal'
}

export default function PaginaExportarDatos() {
  return (
    <EnConstruccion
      titulo="Exportar Datos"
      descripcion="Descarga de información personal"
      funcionalidadesEsperadas={[
        'Solicitar exportación',
        'Tipos de datos incluidos',
        'Formato de descarga',
        'Privacidad y seguridad',
        'Confirmar solicitud',
        'Recibir enlace de descarga'
      ]}
    />
  )
}
