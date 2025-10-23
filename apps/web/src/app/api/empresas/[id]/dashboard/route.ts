import { NextRequest, NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import type { Database } from '@/types/supabase';

/**
 * GET /api/empresas/[id]/dashboard
 * Obtiene los datos del dashboard de una empresa
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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

    const empresaId = params.id;

    // Verificar autorización
    const { data: usuario } = await supabase
      .from('usuarios')
      .select('rol')
      .eq('id', session.user.id)
      .single();

    if (!usuario || !['admin_empresa', 'super_admin'].includes(usuario.rol)) {
      return NextResponse.json(
        { error: 'No autorizado' },
        { status: 403 }
      );
    }

    // Obtener datos de la empresa
    const { data: empresa, error: errorEmpresa } = await supabase
      .from('empresas')
      .select('*')
      .eq('id', empresaId)
      .single();

    if (errorEmpresa || !empresa) {
      return NextResponse.json(
        { error: 'Empresa no encontrada' },
        { status: 404 }
      );
    }

    // Obtener empleados totales (pacientes asociados a la empresa)
    const { count: totalEmpleados } = await supabase
      .from('pacientes')
      .select('*', { count: 'exact', head: true })
      .eq('empresa_id', empresaId)
      .eq('estado', 'activo');

    // Obtener fecha de inicio del mes actual
    const fechaInicioMes = new Date();
    fechaInicioMes.setDate(1);
    fechaInicioMes.setHours(0, 0, 0, 0);

    // Obtener sesiones este mes de empleados de la empresa
    const { data: pacientesEmpresa } = await supabase
      .from('pacientes')
      .select('id')
      .eq('empresa_id', empresaId);

    const pacienteIds = pacientesEmpresa?.map(p => p.id) || [];

    let sesionesEsteMes = 0;
    if (pacienteIds.length > 0) {
      const { count } = await supabase
        .from('sesiones')
        .select('*', { count: 'exact', head: true })
        .in('paciente_id', pacienteIds)
        .gte('fecha_hora_inicio', fechaInicioMes.toISOString());

      sesionesEsteMes = count || 0;
    }

    // Calcular índice de bienestar promedio (basado en evaluaciones recientes)
    let indiceBienestar = 0;
    if (pacienteIds.length > 0) {
      const hace30Dias = new Date();
      hace30Dias.setDate(hace30Dias.getDate() - 30);

      const { data: evaluaciones } = await supabase
        .from('evaluaciones')
        .select('puntuacion_total')
        .in('paciente_id', pacienteIds)
        .gte('fecha_evaluacion', hace30Dias.toISOString());

      if (evaluaciones && evaluaciones.length > 0) {
        const suma = evaluaciones.reduce((acc, e) => acc + (e.puntuacion_total || 0), 0);
        indiceBienestar = Math.round(suma / evaluaciones.length);
      }
    }

    // Calcular inversión mensual (tarifa * empleados)
    const tarifaPorEmpleado = 15; // USD por empleado
    const inversionMensual = (totalEmpleados || 0) * tarifaPorEmpleado;

    // Obtener datos de uso de los últimos 5 meses
    const datosUso = [];
    for (let i = 4; i >= 0; i--) {
      const fecha = new Date();
      fecha.setMonth(fecha.getMonth() - i);
      fecha.setDate(1);
      fecha.setHours(0, 0, 0, 0);

      const fechaFin = new Date(fecha);
      fechaFin.setMonth(fechaFin.getMonth() + 1);

      const meses = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];

      let sesiones = 0;
      let usuarios = 0;

      if (pacienteIds.length > 0) {
        const { count: countSesiones } = await supabase
          .from('sesiones')
          .select('*', { count: 'exact', head: true })
          .in('paciente_id', pacienteIds)
          .gte('fecha_hora_inicio', fecha.toISOString())
          .lt('fecha_hora_inicio', fechaFin.toISOString());

        sesiones = countSesiones || 0;

        // Contar usuarios únicos con sesiones ese mes
        const { data: sesionesUsuarios } = await supabase
          .from('sesiones')
          .select('paciente_id')
          .in('paciente_id', pacienteIds)
          .gte('fecha_hora_inicio', fecha.toISOString())
          .lt('fecha_hora_inicio', fechaFin.toISOString());

        const usuariosUnicos = new Set(sesionesUsuarios?.map(s => s.paciente_id) || []);
        usuarios = usuariosUnicos.size;
      }

      datosUso.push({
        nombre: meses[fecha.getMonth()],
        sesiones,
        usuarios,
      });
    }

    // Obtener bienestar por departamento
    // Asumiendo que la información del departamento está en pacientes.ocupacion o en un campo adicional
    const { data: pacientesConDatos } = await supabase
      .from('pacientes')
      .select('id, ocupacion')
      .eq('empresa_id', empresaId)
      .eq('estado', 'activo');

    // Agrupar por departamento (usando ocupación como proxy)
    const departamentos: Record<string, { empleados: number; puntuacionTotal: number; cantidad: number }> = {};

    for (const paciente of pacientesConDatos || []) {
      const dept = paciente.ocupacion || 'Sin departamento';

      if (!departamentos[dept]) {
        departamentos[dept] = { empleados: 0, puntuacionTotal: 0, cantidad: 0 };
      }

      departamentos[dept].empleados += 1;

      // Obtener evaluación más reciente
      const { data: evaluacion } = await supabase
        .from('evaluaciones')
        .select('puntuacion_total')
        .eq('paciente_id', paciente.id)
        .order('fecha_evaluacion', { ascending: false })
        .limit(1)
        .single();

      if (evaluacion?.puntuacion_total) {
        departamentos[dept].puntuacionTotal += evaluacion.puntuacion_total;
        departamentos[dept].cantidad += 1;
      }
    }

    const datosDepartamentos = Object.entries(departamentos).map(([nombre, datos]) => ({
      nombre,
      empleados: datos.empleados,
      bienestar: datos.cantidad > 0 ? Math.round(datos.puntuacionTotal / datos.cantidad) : 0,
    }));

    return NextResponse.json({
      empresa: {
        id: empresa.id,
        nombre: empresa.nombre,
        logo: empresa.logo_url,
        plan: empresa.plan_suscripcion,
      },
      estadisticas: {
        totalEmpleados: totalEmpleados || 0,
        indiceBienestar,
        sesionesEsteMes,
        inversionMensual,
      },
      datosUso,
      datosDepartamentos,
    });
  } catch (error: any) {
    console.error('Error al obtener dashboard de empresa:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
