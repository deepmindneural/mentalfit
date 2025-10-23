import EnConstruccion from '@/components/ui/UnderConstruction'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Configuración Global | MentalFit',
  description: 'Ajustes del sistema'
}

export default function PaginaConfiguraciónGlobal() {
  return (
    <EnConstruccion
      titulo="Configuración Global"
      descripcion="Ajustes del sistema"
      funcionalidadesEsperadas={[
        'Configuración general',
        'Parámetros de negocio',
        'Límites y restricciones',
        'Features flags',
        'Mantenimiento',
        'Historial de cambios'
      ]}
    />
  )
}
