import pg from 'pg';

const { Client } = pg;

// Conexión a través del Session Pooler IPv4 de Supabase
const connectionString = 'postgresql://postgres.lasxxxsouafpqrxpwtzk:4nBShUbrGUSAr4@aws-1-us-east-2.pooler.supabase.com:5432/postgres';

async function verifyDatabase() {
  console.log('🔍 Verificando configuración de Supabase...\n');

  const client = new Client({
    connectionString,
    ssl: { rejectUnauthorized: false }
  });

  try {
    await client.connect();
    console.log('✅ Conexión a Supabase establecida\n');

    // Verificar tablas
    console.log('📊 Verificando tablas...');
    const tables = await client.query(`
      SELECT table_name
      FROM information_schema.tables
      WHERE table_schema = 'public'
      AND table_type = 'BASE TABLE'
      ORDER BY table_name
    `);

    const tableNames = tables.rows.map(r => r.table_name);
    const expectedTables = [
      'companies', 'profiles', 'professionals', 'sessions',
      'assessments', 'chat_conversations', 'chat_messages',
      'notifications', 'payments', 'availability', 'reviews', 'resources'
    ];

    expectedTables.forEach(table => {
      if (tableNames.includes(table)) {
        console.log(`  ✅ ${table}`);
      } else {
        console.log(`  ❌ ${table} - FALTA`);
      }
    });

    // Contar registros
    console.log('\n📈 Contando registros...');

    const counts = await Promise.all([
      client.query('SELECT COUNT(*) FROM companies'),
      client.query('SELECT COUNT(*) FROM profiles'),
      client.query('SELECT COUNT(*) FROM professionals'),
      client.query('SELECT COUNT(*) FROM sessions'),
      client.query('SELECT COUNT(*) FROM assessments'),
      client.query('SELECT COUNT(*) FROM notifications'),
      client.query('SELECT COUNT(*) FROM resources'),
      client.query('SELECT COUNT(*) FROM chat_conversations'),
      client.query('SELECT COUNT(*) FROM chat_messages'),
    ]);

    console.log(`  Companies: ${counts[0].rows[0].count}`);
    console.log(`  Profiles: ${counts[1].rows[0].count}`);
    console.log(`  Professionals: ${counts[2].rows[0].count}`);
    console.log(`  Sessions: ${counts[3].rows[0].count}`);
    console.log(`  Assessments: ${counts[4].rows[0].count}`);
    console.log(`  Notifications: ${counts[5].rows[0].count}`);
    console.log(`  Resources: ${counts[6].rows[0].count}`);
    console.log(`  Chat Conversations: ${counts[7].rows[0].count}`);
    console.log(`  Chat Messages: ${counts[8].rows[0].count}`);

    // Verificar usuarios de auth
    console.log('\n👥 Verificando usuarios en auth.users...');
    const authUsers = await client.query('SELECT COUNT(*) FROM auth.users');
    console.log(`  Usuarios en auth.users: ${authUsers.rows[0].count}`);

    // Verificar RLS
    console.log('\n🔒 Verificando Row Level Security...');
    const rlsCheck = await client.query(`
      SELECT tablename, rowsecurity
      FROM pg_tables
      WHERE schemaname = 'public'
      AND tablename IN ('companies', 'profiles', 'professionals', 'sessions')
    `);

    rlsCheck.rows.forEach(row => {
      if (row.rowsecurity) {
        console.log(`  ✅ ${row.tablename} - RLS habilitado`);
      } else {
        console.log(`  ⚠️  ${row.tablename} - RLS deshabilitado`);
      }
    });

    console.log('\n✨ Verificación completada!\n');

  } catch (error) {
    console.error('❌ Error:', error.message);
    throw error;
  } finally {
    await client.end();
  }
}

// Ejecutar verificación
verifyDatabase()
  .then(() => {
    console.log('🎉 Tu base de datos está lista para usar!\n');
    console.log('📝 Usuarios de prueba (password: Password123!):');
    console.log('   - admin@mentalfit.com (admin)');
    console.log('   - admin@techcorp.com (company_admin)');
    console.log('   - alice@techcorp.com (user)');
    console.log('   - bob@techcorp.com (user)');
    console.log('   - dr.sarah@mentalfit.com (professional)');
    console.log('   - dr.michael@mentalfit.com (professional)');
    console.log('   - dr.emily@mentalfit.com (professional)\n');
    console.log('🚀 Ejecuta: pnpm dev');
    console.log('🌐 Ve a: http://localhost:3000\n');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n💥 Error fatal:', error.message);
    process.exit(1);
  });
