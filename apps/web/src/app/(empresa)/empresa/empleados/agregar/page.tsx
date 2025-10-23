import EnConstruccion from '@/components/ui/UnderConstruction'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Agregar Empleados | MentalFit',
  description: 'Alta de nuevos usuarios'
}

export default function PaginaAgregarEmpleados() {
  return (
    <EnConstruccion
      titulo="Agregar Empleados"
      descripcion="Alta de nuevos usuarios"
      funcionalidadesEsperadas={[
        'Alta individual',
        'Enviar invitación',
        'Asignar departamento',
        'Configurar límites',
        'Activación inmediata',
        'Confirmación'
      ]}
    />
  )
}
