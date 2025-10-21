import { readFileSync } from 'fs';
import { createClient } from '@supabase/supabase-js';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Credenciales de Supabase
const supabaseUrl = 'https://lasxxxsouafpqrxpwtzk.supabase.co';
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxhc3h4eHNvdWFmcHFyeHB3dHprIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MDQ5NTU2MCwiZXhwIjoyMDc2MDcxNTYwfQ.UE6OX0Plnl5x43SZ7NCQlptzUxcbtG_pDT4r8K_x5fk';

async function setupSupabase() {
  console.log('🚀 Iniciando setup de Supabase...\n');

  try {
    // Leer el archivo SQL
    const sqlFile = join(__dirname, 'supabase-setup.sql');
    const sql = readFileSync(sqlFile, 'utf-8');

    console.log('📄 Archivo SQL cargado');
    console.log(`📊 Ejecutando ${sql.split(';').length} comandos SQL...\n`);

    // Crear cliente de Supabase con Service Role
    const supabase = createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    });

    // Dividir el SQL en comandos individuales
    const commands = sql
      .split(';')
      .map(cmd => cmd.trim())
      .filter(cmd => cmd.length > 0 && !cmd.startsWith('--'));

    let successCount = 0;
    let errorCount = 0;

    // Ejecutar cada comando
    for (let i = 0; i < commands.length; i++) {
      const command = commands[i] + ';';

      // Saltar comentarios largos
      if (command.includes('==================================================')) {
        continue;
      }

      try {
        const { error } = await supabase.rpc('query', { query_text: command });

        if (error) {
          // Ignorar errores de "already exists"
          if (error.message.includes('already exists') ||
              error.message.includes('duplicate')) {
            console.log(`⚠️  [${i+1}/${commands.length}] Ya existe (saltando)`);
          } else {
            console.log(`❌ [${i+1}/${commands.length}] Error:`, error.message.substring(0, 100));
            errorCount++;
          }
        } else {
          successCount++;
          if (i % 10 === 0) {
            console.log(`✅ [${i+1}/${commands.length}] Ejecutados ${successCount} comandos...`);
          }
        }
      } catch (err) {
        console.log(`❌ Error ejecutando comando ${i+1}:`, err.message.substring(0, 100));
        errorCount++;
      }
    }

    console.log(`\n📊 Resumen:`);
    console.log(`   ✅ Exitosos: ${successCount}`);
    console.log(`   ❌ Errores: ${errorCount}`);
    console.log(`\n✨ Setup completado!`);

  } catch (error) {
    console.error('❌ Error fatal:', error.message);
    process.exit(1);
  }
}

setupSupabase()
  .then(() => {
    console.log('\n🎉 Base de datos lista para usar!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n💥 Error:', error);
    process.exit(1);
  });
