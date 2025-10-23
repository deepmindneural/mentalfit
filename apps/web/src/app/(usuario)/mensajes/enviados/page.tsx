import EnConstruccion from '@/components/ui/UnderConstruction'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Mensajes Enviados | MentalFit',
  description: 'Mensajes que has enviado'
}

export default function PaginaMensajesEnviados() {
  return (
    <EnConstruccion
      titulo="Mensajes Enviados"
      descripcion="Mensajes que has enviado"
      funcionalidadesEsperadas={[
        'Lista de enviados',
        'Buscar',
        'Filtrar',
        'Ver conversación',
        'Eliminar',
        'Exportar'
      ]}
    />
  )
}
