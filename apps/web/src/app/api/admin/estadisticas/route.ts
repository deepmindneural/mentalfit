import { NextRequest, NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import type { Database } from '@/types/supabase';

/**
 * GET /api/admin/estadisticas
 * Obtiene las estadísticas globales de la plataforma (solo super_admin)
 */
export async function GET(request: NextRequest) {
  try {
    const supabase = createRouteHandlerClient<Database>({ cookies });

    // Verificar autenticación
    const { data: { session }, error: errorAuth } = await supabase.auth.getSession();

    if (errorAuth || !session) {
      return NextResponse.json(
        { error: 'No autenticado' },
        { status: 401 }
      );
    }

    // Verificar que el usuario es super_admin
    const { data: usuario } = await supabase
      .from('usuarios')
      .select('rol')
      .eq('id', session.user.id)
      .single();

    if (!usuario || usuario.rol !== 'super_admin') {
      return NextResponse.json(
        { error: 'No autorizado' },
        { status: 403 }
      );
    }

    // Obtener empresas activas
    const { count: totalEmpresas } = await supabase
      .from('empresas')
      .select('*', { count: 'exact', head: true })
      .eq('estado_suscripcion', 'activa');

    // Obtener usuarios totales
    const { count: totalUsuarios } = await supabase
      .from('usuarios')
      .select('*', { count: 'exact', head: true })
      .eq('activo', true);

    // Obtener profesionales activos
    const { count: totalProfesionales } = await supabase
      .from('profesionales')
      .select('*', { count: 'exact', head: true })
      .eq('estado_verificacion', 'verificado');

    // Calcular ingresos MRR (Monthly Recurring Revenue)
    const { data: empresas } = await supabase
      .from('empresas')
      .select('numero_empleados, plan_suscripcion')
      .eq('estado_suscripcion', 'activa');

    let ingresosMRR = 0;
    empresas?.forEach((empresa) => {
      // Tarifa base por plan
      const tarifas: Record<string, number> = {
        basico: 10,
        profesional: 15,
        empresarial: 20,
      };

      const tarifaPorEmpleado = tarifas[empresa.plan_suscripcion] || 15;
      ingresosMRR += empresa.numero_empleados * tarifaPorEmpleado;
    });

    // Obtener datos de ingresos de los últimos 6 meses
    const datosIngresos = [];
    for (let i = 5; i >= 0; i--) {
      const fecha = new Date();
      fecha.setMonth(fecha.getMonth() - i);
      fecha.setDate(1);
      fecha.setHours(0, 0, 0, 0);

      const fechaFin = new Date(fecha);
      fechaFin.setMonth(fechaFin.getMonth() + 1);

      const meses = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];

      // Contar usuarios activos en ese mes
      const { count: usuariosMes } = await supabase
        .from('usuarios')
        .select('*', { count: 'exact', head: true })
        .gte('fecha_creacion', fecha.toISOString())
        .lt('fecha_creacion', fechaFin.toISOString());

      // Calcular ingresos del mes (sesiones pagadas)
      const { data: pagosMes } = await supabase
        .from('pagos')
        .select('monto')
        .eq('estado', 'completado')
        .gte('fecha_pago', fecha.toISOString())
        .lt('fecha_pago', fechaFin.toISOString());

      const ingresosMes = pagosMes?.reduce((total, pago) => total + pago.monto, 0) || 0;

      datosIngresos.push({
        nombre: meses[fecha.getMonth()],
        ingresos: Math.round(ingresosMes),
        usuarios: usuariosMes || 0,
      });
    }

    // Obtener distribución de empresas por tamaño
    const { data: todasEmpresas } = await supabase
      .from('empresas')
      .select('numero_empleados')
      .eq('estado_suscripcion', 'activa');

    const distribucion = {
      '1-50': 0,
      '51-200': 0,
      '201-500': 0,
      '500+': 0,
    };

    todasEmpresas?.forEach((empresa) => {
      const num = empresa.numero_empleados;
      if (num <= 50) distribucion['1-50']++;
      else if (num <= 200) distribucion['51-200']++;
      else if (num <= 500) distribucion['201-500']++;
      else distribucion['500+']++;
    });

    const datosEmpresas = Object.entries(distribucion).map(([nombre, cantidad]) => ({
      nombre,
      cantidad,
    }));

    // Obtener empresas recientes
    const { data: empresasRecientes } = await supabase
      .from('empresas')
      .select('nombre, numero_empleados, plan_suscripcion, fecha_creacion')
      .order('fecha_creacion', { ascending: false })
      .limit(3);

    // Obtener profesionales pendientes de verificación
    const { data: profesionalesPendientes } = await supabase
      .from('profesionales')
      .select(`
        id,
        especialidades,
        fecha_creacion,
        usuarios (
          nombre_completo
        )
      `)
      .eq('estado_verificacion', 'pendiente')
      .order('fecha_creacion', { ascending: false })
      .limit(3);

    return NextResponse.json({
      estadisticas: {
        totalEmpresas: totalEmpresas || 0,
        totalUsuarios: totalUsuarios || 0,
        totalProfesionales: totalProfesionales || 0,
        ingresosMRR,
      },
      datosIngresos,
      datosEmpresas,
      empresasRecientes: empresasRecientes?.map((e) => ({
        nombre: e.nombre,
        empleados: e.numero_empleados,
        plan: e.plan_suscripcion,
        fecha: e.fecha_creacion,
      })) || [],
      profesionalesPendientes: profesionalesPendientes?.map((p: any) => ({
        id: p.id,
        nombre: p.usuarios?.nombre_completo || 'Sin nombre',
        especialidad: p.especialidades?.[0] || 'No especificada',
        fecha: p.fecha_creacion,
      })) || [],
    });
  } catch (error: any) {
    console.error('Error al obtener estadísticas admin:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
