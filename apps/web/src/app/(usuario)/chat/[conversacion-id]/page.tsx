import EnConstruccion from '@/components/ui/UnderConstruction'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Conversación | MentalFit',
  description: 'Chat con profesional'
}

export default function PaginaConversacionChat() {
  return (
    <EnConstruccion
      titulo="Conversación"
      descripcion="Chat con profesional"
      funcionalidadesEsperadas={[
        'Historial de mensajes',
        'Enviar mensaje',
        'Adjuntar archivo',
        'Información del terapeuta',
        'Marcar como leído',
        'Archivar chat'
      ]}
    />
  )
}
