import EnConstruccion from '@/components/ui/UnderConstruction'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Documentos | MentalFit',
  description: 'Gestión de credenciales'
}

export default function PaginaDocumentosProfesional() {
  return (
    <EnConstruccion
      titulo="Documentos"
      descripcion="Gestión de credenciales"
      funcionalidadesEsperadas={[
        'Documentos subidos',
        'Estado de verificación',
        'Vencimientos',
        'Solicitar documentación',
        'Aprobar o rechazar',
        'Historial documental'
      ]}
    />
  )
}
