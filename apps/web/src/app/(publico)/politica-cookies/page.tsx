import EnConstruccion from '@/components/ui/UnderConstruction'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Política de Cookies | MentalFit',
  description: 'Uso de cookies en nuestra plataforma'
}

export default function PaginaPolíticadeCookies() {
  return (
    <EnConstruccion
      titulo="Política de Cookies"
      descripcion="Uso de cookies en nuestra plataforma"
      funcionalidadesEsperadas={[
        'Tipos de cookies utilizadas',
        'Finalidad de cada cookie',
        'Cookies de terceros',
        'Gestión de preferencias',
        'Cookies esenciales vs opcionales',
        'Desactivación de cookies'
      ]}
    />
  )
}
