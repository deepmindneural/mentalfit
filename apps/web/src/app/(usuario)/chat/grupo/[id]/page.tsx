import EnConstruccion from '@/components/ui/UnderConstruction'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Grupo de Apoyo | MentalFit',
  description: 'Chat grupal'
}

export default function PaginaGrupoApoyo() {
  return (
    <EnConstruccion
      titulo="Grupo de Apoyo"
      descripcion="Chat grupal"
      funcionalidadesEsperadas={[
        'Mensajes del grupo',
        'Participantes',
        'Reglas del grupo',
        'Moderación',
        'Participar',
        'Salir del grupo'
      ]}
    />
  )
}
