import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

/**
 * API Route: POST /api/public/contacto
 *
 * Recibe mensajes del formulario de contacto general
 * No requiere autenticación - acceso público
 *
 * Body esperado:
 * {
 *   nombre: string (requerido),
 *   email: string (requerido),
 *   telefono: string (opcional),
 *   empresa: string (opcional),
 *   departamento: 'ventas' | 'soporte' | 'prensa' | 'otros' (requerido),
 *   asunto: string (requerido),
 *   mensaje: string (requerido)
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
    const { nombre, email, telefono, empresa, departamento, asunto, mensaje } = body;

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

    const departamentosValidos = ['ventas', 'soporte', 'prensa', 'otros'];
    if (!departamento || !departamentosValidos.includes(departamento)) {
      return NextResponse.json(
        {
          error: 'Departamento inválido',
          departamentos_validos: departamentosValidos
        },
        { status: 400 }
      );
    }

    if (!asunto || asunto.trim().length < 5) {
      return NextResponse.json(
        { error: 'El asunto es requerido y debe tener al menos 5 caracteres' },
        { status: 400 }
      );
    }

    if (!mensaje || mensaje.trim().length < 10) {
      return NextResponse.json(
        { error: 'El mensaje es requerido y debe tener al menos 10 caracteres' },
        { status: 400 }
      );
    }

    // Capturar IP y User-Agent
    const ip_address = request.headers.get('x-forwarded-for') ||
                       request.headers.get('x-real-ip') ||
                       'unknown';
    const user_agent = request.headers.get('user-agent') || 'unknown';

    // Insertar solicitud de contacto
    const { data, error } = await supabase
      .from('solicitudes_contacto')
      .insert([
        {
          nombre: nombre.trim(),
          email: email.toLowerCase().trim(),
          telefono: telefono?.trim() || null,
          empresa: empresa?.trim() || null,
          departamento,
          asunto: asunto.trim(),
          mensaje: mensaje.trim(),
          estado: 'pendiente',
          ip_address,
          user_agent,
        }
      ])
      .select()
      .single();

    if (error) {
      console.error('Error insertando solicitud de contacto:', error);
      return NextResponse.json(
        { error: 'Error al enviar mensaje. Intenta nuevamente.' },
        { status: 500 }
      );
    }

    // TODO: Enviar notificación al departamento correspondiente
    // await notificarDepartamento(departamento, data);

    return NextResponse.json(
      {
        mensaje: 'Mensaje enviado exitosamente. Te responderemos pronto.',
        solicitud_id: data.id,
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('Error en API contacto:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
