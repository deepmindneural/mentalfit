import EnConstruccion from '@/components/ui/UnderConstruction'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Email Verificado | MentalFit',
  description: 'Tu correo ha sido confirmado'
}

export default function PaginaEmailVerificado() {
  return (
    <EnConstruccion
      titulo="Email Verificado"
      descripcion="Tu correo ha sido confirmado"
      funcionalidadesEsperadas={[
        'Confirmación de verificación',
        'Acceder a la plataforma',
        'Completar perfil',
        'Comenzar a usar MentalFit',
        'Buscar terapeuta',
        'Recursos disponibles'
      ]}
    />
  )
}
