import EnConstruccion from '@/components/ui/UnderConstruction'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Archivos | MentalFit',
  description: 'Documentos del paciente'
}

export default function PaginaArchivosPaciente() {
  return (
    <EnConstruccion
      titulo="Archivos"
      descripcion="Documentos del paciente"
      funcionalidadesEsperadas={[
        'Archivos subidos',
        'Consentimientos',
        'Evaluaciones en PDF',
        'Recursos compartidos',
        'Subir nuevo archivo',
        'Gestión de privacidad'
      ]}
    />
  )
}
