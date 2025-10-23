import EnConstruccion from '@/components/ui/UnderConstruction'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Asistente Virtual | MentalFit',
  description: 'Chatbot de soporte'
}

export default function PaginaAsistenteVirtual() {
  return (
    <EnConstruccion
      titulo="Asistente Virtual"
      descripcion="Chatbot de soporte"
      funcionalidadesEsperadas={[
        'Chat con IA',
        'Preguntas frecuentes',
        'Guías rápidas',
        'Recursos automáticos',
        'Derivar a humano',
        'Historial de conversación'
      ]}
    />
  )
}
