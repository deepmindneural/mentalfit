import { createClient } from '@supabase/supabase-js';

// Usar el Service Role Key para operaciones administrativas
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

async function setupDatabase() {
  console.log('🚀 Iniciando setup de Supabase...\n');

  try {
    // 1. Crear tablas
    console.log('📊 Creando tablas...');

    const { error: createTablesError } = await supabase.rpc('exec_sql', {
      sql: `
        -- Tabla de empresas
        CREATE TABLE IF NOT EXISTS companies (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          name TEXT NOT NULL,
          plan TEXT NOT NULL DEFAULT 'basic',
          employee_count INTEGER DEFAULT 0,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );

        -- Tabla de usuarios (extendida desde auth.users)
        CREATE TABLE IF NOT EXISTS profiles (
          id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
          email TEXT UNIQUE NOT NULL,
          full_name TEXT,
          role TEXT NOT NULL DEFAULT 'user',
          company_id UUID REFERENCES companies(id),
          avatar_url TEXT,
          phone TEXT,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );

        -- Tabla de profesionales
        CREATE TABLE IF NOT EXISTS professionals (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
          specialization TEXT,
          license_number TEXT,
          bio TEXT,
          rating DECIMAL(3,2) DEFAULT 0,
          total_sessions INTEGER DEFAULT 0,
          hourly_rate DECIMAL(10,2),
          available BOOLEAN DEFAULT TRUE,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );

        -- Tabla de sesiones
        CREATE TABLE IF NOT EXISTS sessions (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          user_id UUID REFERENCES profiles(id),
          professional_id UUID REFERENCES professionals(id),
          scheduled_at TIMESTAMP WITH TIME ZONE,
          duration INTEGER DEFAULT 50,
          status TEXT DEFAULT 'scheduled',
          type TEXT DEFAULT 'individual',
          notes TEXT,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );

        -- Tabla de evaluaciones
        CREATE TABLE IF NOT EXISTS assessments (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          user_id UUID REFERENCES profiles(id),
          type TEXT NOT NULL,
          score INTEGER,
          results JSONB,
          interpretation TEXT,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );

        -- Tabla de conversaciones de chat
        CREATE TABLE IF NOT EXISTS chat_conversations (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          user_id UUID REFERENCES profiles(id),
          professional_id UUID REFERENCES professionals(id),
          status TEXT DEFAULT 'active',
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );

        -- Tabla de mensajes de chat
        CREATE TABLE IF NOT EXISTS chat_messages (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          conversation_id UUID REFERENCES chat_conversations(id) ON DELETE CASCADE,
          sender_id UUID REFERENCES profiles(id),
          content TEXT NOT NULL,
          sentiment JSONB,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );

        -- Tabla de notificaciones
        CREATE TABLE IF NOT EXISTS notifications (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          user_id UUID REFERENCES profiles(id),
          type TEXT NOT NULL,
          title TEXT NOT NULL,
          message TEXT,
          read BOOLEAN DEFAULT FALSE,
          link TEXT,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );

        -- Tabla de pagos
        CREATE TABLE IF NOT EXISTS payments (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          company_id UUID REFERENCES companies(id),
          amount DECIMAL(10,2),
          status TEXT DEFAULT 'pending',
          stripe_payment_id TEXT,
          invoice_url TEXT,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );

        -- Tabla de disponibilidad de profesionales
        CREATE TABLE IF NOT EXISTS availability (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          professional_id UUID REFERENCES professionals(id) ON DELETE CASCADE,
          day_of_week INTEGER NOT NULL,
          start_time TIME NOT NULL,
          end_time TIME NOT NULL,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );

        -- Tabla de reseñas
        CREATE TABLE IF NOT EXISTS reviews (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          session_id UUID REFERENCES sessions(id),
          professional_id UUID REFERENCES professionals(id),
          user_id UUID REFERENCES profiles(id),
          rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
          comment TEXT,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
      `
    });

    if (createTablesError && !createTablesError.message.includes('already exists')) {
      throw createTablesError;
    }

    console.log('✅ Tablas creadas exitosamente\n');

    // 2. Habilitar RLS
    console.log('🔒 Configurando Row Level Security...');

    const { error: rlsError } = await supabase.rpc('exec_sql', {
      sql: `
        -- Habilitar RLS en todas las tablas
        ALTER TABLE companies ENABLE ROW LEVEL SECURITY;
        ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
        ALTER TABLE professionals ENABLE ROW LEVEL SECURITY;
        ALTER TABLE sessions ENABLE ROW LEVEL SECURITY;
        ALTER TABLE assessments ENABLE ROW LEVEL SECURITY;
        ALTER TABLE chat_conversations ENABLE ROW LEVEL SECURITY;
        ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;
        ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
        ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
        ALTER TABLE availability ENABLE ROW LEVEL SECURITY;
        ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

        -- Políticas para profiles
        CREATE POLICY IF NOT EXISTS "Users can view own profile"
          ON profiles FOR SELECT
          USING (auth.uid() = id);

        CREATE POLICY IF NOT EXISTS "Users can update own profile"
          ON profiles FOR UPDATE
          USING (auth.uid() = id);

        -- Políticas para companies
        CREATE POLICY IF NOT EXISTS "Users can view own company"
          ON companies FOR SELECT
          USING (id IN (SELECT company_id FROM profiles WHERE id = auth.uid()));

        -- Políticas para sessions
        CREATE POLICY IF NOT EXISTS "Users can view own sessions"
          ON sessions FOR SELECT
          USING (
            user_id = auth.uid() OR
            professional_id IN (SELECT id FROM professionals WHERE user_id = auth.uid())
          );

        -- Políticas para assessments
        CREATE POLICY IF NOT EXISTS "Users can view own assessments"
          ON assessments FOR SELECT
          USING (user_id = auth.uid());

        CREATE POLICY IF NOT EXISTS "Users can create own assessments"
          ON assessments FOR INSERT
          WITH CHECK (user_id = auth.uid());

        -- Políticas para notifications
        CREATE POLICY IF NOT EXISTS "Users can view own notifications"
          ON notifications FOR SELECT
          USING (user_id = auth.uid());

        CREATE POLICY IF NOT EXISTS "Users can update own notifications"
          ON notifications FOR UPDATE
          USING (user_id = auth.uid());

        -- Políticas para chat
        CREATE POLICY IF NOT EXISTS "Users can view own conversations"
          ON chat_conversations FOR SELECT
          USING (
            user_id = auth.uid() OR
            professional_id IN (SELECT id FROM professionals WHERE user_id = auth.uid())
          );

        CREATE POLICY IF NOT EXISTS "Users can view messages in own conversations"
          ON chat_messages FOR SELECT
          USING (
            conversation_id IN (
              SELECT id FROM chat_conversations
              WHERE user_id = auth.uid() OR
              professional_id IN (SELECT id FROM professionals WHERE user_id = auth.uid())
            )
          );
      `
    });

    if (rlsError && !rlsError.message.includes('already exists')) {
      console.log('⚠️  Advertencia al configurar RLS:', rlsError.message);
    } else {
      console.log('✅ RLS configurado exitosamente\n');
    }

    console.log('✨ Setup completado exitosamente!');

  } catch (error) {
    console.error('❌ Error durante el setup:', error);
    throw error;
  }
}

// Ejecutar setup
setupDatabase()
  .then(() => {
    console.log('\n🎉 Base de datos lista para usar!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n💥 Error fatal:', error);
    process.exit(1);
  });
