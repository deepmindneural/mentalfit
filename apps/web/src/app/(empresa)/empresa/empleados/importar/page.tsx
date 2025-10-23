import EnConstruccion from '@/components/ui/UnderConstruction'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Importación Masiva | MentalFit',
  description: 'Cargar múltiples empleados'
}

export default function PaginaImportaciónMasiva() {
  return (
    <EnConstruccion
      titulo="Importación Masiva"
      descripcion="Cargar múltiples empleados"
      funcionalidadesEsperadas={[
        'Descargar template CSV',
        'Subir archivo',
        'Validar datos',
        'Preview de importación',
        'Confirmar y procesar',
        'Reporte de resultados'
      ]}
    />
  )
}
