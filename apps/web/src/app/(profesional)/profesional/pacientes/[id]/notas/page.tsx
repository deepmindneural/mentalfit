import EnConstruccion from '@/components/ui/UnderConstruction'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Notas Clínicas | MentalFit',
  description: 'Gestión de notas de sesión'
}

export default function PaginaNotasPaciente() {
  return (
    <EnConstruccion
      titulo="Notas Clínicas"
      descripcion="Gestión de notas de sesión"
      funcionalidadesEsperadas={[
        'Notas por sesión',
        'Plantillas de notas',
        'Búsqueda de notas',
        'Editar notas',
        'Privacidad y encriptación',
        'Exportar'
      ]}
    />
  )
}
