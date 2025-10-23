import EnConstruccion from '@/components/ui/UnderConstruction'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Ayuda para Empleados | MentalFit',
  description: 'Guías para usuarios'
}

export default function PaginaAyudaparaEmpleados() {
  return (
    <EnConstruccion
      titulo="Ayuda para Empleados"
      descripcion="Guías para usuarios"
      funcionalidadesEsperadas={[
        'Primeros pasos en la plataforma',
        'Cómo buscar un terapeuta',
        'Agendar y asistir a sesiones',
        'Uso de evaluaciones',
        'Recursos disponibles',
        'Gestión de perfil'
      ]}
    />
  )
}
