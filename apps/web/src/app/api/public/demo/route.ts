import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

/**
 * API Route: POST /api/public/demo
 *
 * Recibe solicitudes de demostración del producto
 * No requiere autenticación - acceso público
 *
 * Body esperado:
 * {
 *   nombre: string (requerido),
 *   email: string (requerido),
 *   telefono: string (opcional),
 *   empresa: string (requerido),
 *   tamano_empresa: '1-50' | '51-200' | '201-500' | '501-1000' | '1000+' (opcional),
 *   cargo: string (opcional),
 *   mensaje: string (opcional)
 * }
 */
export async function POST(request: NextRequest) {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    // Parsear el body
    const body = await request.json();
    const { nombre, email, telefono, empresa, tamano_empresa, cargo, mensaje } = body;

    // Validaciones
    if (!nombre || nombre.trim().length < 2) {
      return NextResponse.json(
        { error: 'El nombre es requerido y debe tener al menos 2 caracteres' },
        { status: 400 }
      );
    }

    if (!email || !email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      return NextResponse.json(
        { error: 'Email inválido' },
        { status: 400 }
      );
    }

    if (!empresa || empresa.trim().length < 2) {
      return NextResponse.json(
        { error: 'El nombre de la empresa es requerido' },
        { status: 400 }
      );
    }

    // Validar tamaño de empresa si se proporciona
    const tamanosValidos = ['1-50', '51-200', '201-500', '501-1000', '1000+'];
    if (tamano_empresa && !tamanosValidos.includes(tamano_empresa)) {
      return NextResponse.json(
        {
          error: 'Tamaño de empresa inválido',
          tamanos_validos: tamanosValidos
        },
        { status: 400 }
      );
    }

    // Capturar IP y User-Agent para análisis
    const ip_address = request.headers.get('x-forwarded-for') ||
                       request.headers.get('x-real-ip') ||
                       'unknown';
    const user_agent = request.headers.get('user-agent') || 'unknown';

    // Insertar solicitud en la base de datos
    const { data, error } = await supabase
      .from('solicitudes_demo')
      .insert([
        {
          nombre: nombre.trim(),
          email: email.toLowerCase().trim(),
          telefono: telefono?.trim() || null,
          empresa: empresa.trim(),
          tamano_empresa: tamano_empresa || null,
          cargo: cargo?.trim() || null,
          mensaje: mensaje?.trim() || null,
          estado: 'pendiente',
          ip_address,
          user_agent,
        }
      ])
      .select()
      .single();

    if (error) {
      console.error('Error insertando solicitud de demo:', error);

      // Verificar si es un duplicado (mismo email recientemente)
      if (error.code === '23505') {
        return NextResponse.json(
          { error: 'Ya existe una solicitud con este email. Te contactaremos pronto.' },
          { status: 409 }
        );
      }

      return NextResponse.json(
        { error: 'Error al enviar solicitud. Intenta nuevamente.' },
        { status: 500 }
      );
    }

    // TODO: Aquí podrías agregar notificación por email al equipo de ventas
    // await enviarNotificacionVentas(data);

    return NextResponse.json(
      {
        mensaje: 'Solicitud enviada exitosamente. Te contactaremos pronto.',
        solicitud_id: data.id,
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('Error en API demo:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
