import EnConstruccion from '@/components/ui/UnderConstruction'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Límites de Uso | MentalFit',
  description: 'Configuración de restricciones'
}

export default function PaginaLímitesdeUso() {
  return (
    <EnConstruccion
      titulo="Límites de Uso"
      descripcion="Configuración de restricciones"
      funcionalidadesEsperadas={[
        'Sesiones mensuales',
        'Duración de sesiones',
        'Tipos de terapia',
        'Excepciones',
        'Aprobaciones requeridas',
        'Aplicar cambios'
      ]}
    />
  )
}
