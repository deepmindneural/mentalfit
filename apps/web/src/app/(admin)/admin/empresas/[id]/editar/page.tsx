import EnConstruccion from '@/components/ui/UnderConstruction'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Editar Empresa | MentalFit',
  description: 'Modificar datos de organización'
}

export default function PaginaEditarEmpresa() {
  return (
    <EnConstruccion
      titulo="Editar Empresa"
      descripcion="Modificar datos de organización"
      funcionalidadesEsperadas={[
        'Actualizar información',
        'Cambiar plan',
        'Ajustar límites',
        'Configurar beneficios',
        'Modificar facturación',
        'Historial de cambios'
      ]}
    />
  )
}
