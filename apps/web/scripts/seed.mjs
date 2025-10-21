import pg from 'pg';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const { Client } = pg;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Conexión a través del Session Pooler IPv4 de Supabase
const connectionString = 'postgresql://postgres.lasxxxsouafpqrxpwtzk:4nBShUbrGUSAr4@aws-1-us-east-2.pooler.supabase.com:5432/postgres';

async function seedDatabase() {
  console.log('🌱 Insertando datos de ejemplo...\n');

  const client = new Client({
    connectionString,
    ssl: { rejectUnauthorized: false }
  });

  try {
    await client.connect();
    console.log('✅ Conexión establecida\n');

    // Leer el archivo SQL de seed
    const sqlFile = join(__dirname, 'seed-data.sql');
    const sql = readFileSync(sqlFile, 'utf-8');

    console.log('📄 Ejecutando script de datos de ejemplo...\n');

    // Ejecutar todo el SQL
    await client.query(sql);

    console.log('✅ Empresas creadas (3)');
    console.log('✅ Perfiles de usuario creados (7)');
    console.log('✅ Profesionales creados (3)');
    console.log('✅ Horarios de disponibilidad configurados');
    console.log('✅ Sesiones de ejemplo creadas (3)');
    console.log('✅ Evaluaciones de ejemplo creadas (3)');
    console.log('✅ Reseñas creadas (2)');
    console.log('✅ Notificaciones creadas (3)');
    console.log('✅ Recursos educativos creados (3)');
    console.log('✅ Conversación de chat creada con mensajes');

    console.log('\n✨ Datos de ejemplo insertados exitosamente!');

  } catch (error) {
    console.error('❌ Error:', error.message);
    console.error('\nDetalles:', error);
    throw error;
  } finally {
    await client.end();
  }
}

// Ejecutar seed
seedDatabase()
  .then(() => {
    console.log('\n🎉 Base de datos poblada con datos de ejemplo!');
    console.log('\n💡 Ahora puedes:');
    console.log('   1. Ejecutar la app: pnpm dev');
    console.log('   2. Ir a http://localhost:3000');
    console.log('   3. Ver las tablas en Supabase Dashboard\n');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n💥 Error fatal:', error.message);
    process.exit(1);
  });
