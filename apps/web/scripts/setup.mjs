import pg from 'pg';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const { Client } = pg;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Conexión a través del Session Pooler IPv4 de Supabase
const connectionString = 'postgresql://postgres.lasxxxsouafpqrxpwtzk:4nBShUbrGUSAr4@aws-1-us-east-2.pooler.supabase.com:5432/postgres';

async function setupDatabase() {
  console.log('🚀 Conectando a Supabase PostgreSQL...\n');

  const client = new Client({
    connectionString,
    ssl: { rejectUnauthorized: false }
  });

  try {
    await client.connect();
    console.log('✅ Conexión establecida\n');

    // Leer el archivo SQL
    const sqlFile = join(__dirname, 'supabase-setup.sql');
    const sql = readFileSync(sqlFile, 'utf-8');

    console.log('📄 Ejecutando script SQL...\n');

    // Ejecutar todo el SQL
    await client.query(sql);

    console.log('✅ Tablas creadas exitosamente');
    console.log('✅ Índices creados');
    console.log('✅ RLS habilitado');
    console.log('✅ Políticas de seguridad configuradas');
    console.log('✅ Triggers y funciones creadas');

    console.log('\n✨ Setup completado exitosamente!');

  } catch (error) {
    console.error('❌ Error:', error.message);
    console.error('\nDetalles:', error);
    throw error;
  } finally {
    await client.end();
  }
}

// Ejecutar setup
setupDatabase()
  .then(() => {
    console.log('\n🎉 Base de datos lista para usar!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n💥 Error fatal:', error.message);
    process.exit(1);
  });
