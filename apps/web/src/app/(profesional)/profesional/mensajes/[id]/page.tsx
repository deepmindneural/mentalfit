import EnConstruccion from '@/components/ui/UnderConstruction'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Conversación | MentalFit',
  description: 'Chat con paciente específico'
}

export default function PaginaConversacionMensaje() {
  return (
    <EnConstruccion
      titulo="Conversación"
      descripcion="Chat con paciente específico"
      funcionalidadesEsperadas={[
        'Historial de mensajes',
        'Enviar mensaje',
        'Adjuntar archivo',
        'Contexto del paciente',
        'Marcar como leído',
        'Archivar conversación'
      ]}
    />
  )
}
