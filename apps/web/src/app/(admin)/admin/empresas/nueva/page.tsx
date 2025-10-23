import EnConstruccion from '@/components/ui/UnderConstruction'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Nueva Empresa | MentalFit',
  description: 'Registrar nueva organización'
}

export default function PaginaNuevaEmpresa() {
  return (
    <EnConstruccion
      titulo="Nueva Empresa"
      descripcion="Registrar nueva organización"
      funcionalidadesEsperadas={[
        'Formulario de alta de empresa',
        'Configuración inicial',
        'Asignación de plan',
        'Configurar administrador',
        'Límites y beneficios',
        'Activación inmediata'
      ]}
    />
  )
}
