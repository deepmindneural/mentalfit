-- ==================================================
-- MENTALFIT - SUPABASE DATABASE SETUP
-- ==================================================

-- 1. CREAR TABLAS
-- ==================================================

-- Tabla de empresas
CREATE TABLE IF NOT EXISTS companies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  plan TEXT NOT NULL DEFAULT 'basic',
  employee_count INTEGER DEFAULT 0,
  stripe_customer_id TEXT,
  stripe_subscription_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla de perfiles de usuario (extendida desde auth.users)
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  role TEXT NOT NULL DEFAULT 'user', -- 'admin', 'company_admin', 'user', 'professional'
  company_id UUID REFERENCES companies(id),
  avatar_url TEXT,
  phone TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla de profesionales
CREATE TABLE IF NOT EXISTS professionals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE UNIQUE,
  specialization TEXT,
  license_number TEXT,
  bio TEXT,
  rating DECIMAL(3,2) DEFAULT 0,
  total_sessions INTEGER DEFAULT 0,
  hourly_rate DECIMAL(10,2),
  available BOOLEAN DEFAULT TRUE,
  years_experience INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla de sesiones
CREATE TABLE IF NOT EXISTS sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id),
  professional_id UUID REFERENCES professionals(id),
  scheduled_at TIMESTAMP WITH TIME ZONE,
  duration INTEGER DEFAULT 50, -- minutos
  status TEXT DEFAULT 'scheduled', -- 'scheduled', 'completed', 'cancelled', 'in_progress'
  type TEXT DEFAULT 'individual', -- 'individual', 'group', 'crisis', 'wellness'
  notes TEXT,
  meeting_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla de evaluaciones
CREATE TABLE IF NOT EXISTS assessments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id),
  type TEXT NOT NULL, -- 'PHQ-9', 'GAD-7', 'stress', 'burnout'
  score INTEGER,
  results JSONB,
  interpretation TEXT,
  severity TEXT, -- 'minimal', 'mild', 'moderate', 'severe'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla de conversaciones de chat
CREATE TABLE IF NOT EXISTS chat_conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id),
  professional_id UUID REFERENCES professionals(id),
  status TEXT DEFAULT 'active', -- 'active', 'archived', 'closed'
  last_message_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla de mensajes de chat
CREATE TABLE IF NOT EXISTS chat_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id UUID REFERENCES chat_conversations(id) ON DELETE CASCADE,
  sender_id UUID REFERENCES profiles(id),
  content TEXT NOT NULL,
  sentiment JSONB, -- {score: -1 to 1, label: 'positive'/'neutral'/'negative'}
  read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla de notificaciones
CREATE TABLE IF NOT EXISTS notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  type TEXT NOT NULL, -- 'session', 'message', 'assessment', 'system'
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
  user_id UUID REFERENCES profiles(id),
  amount DECIMAL(10,2) NOT NULL,
  status TEXT DEFAULT 'pending', -- 'pending', 'completed', 'failed', 'refunded'
  type TEXT DEFAULT 'subscription', -- 'subscription', 'session', 'one_time'
  stripe_payment_id TEXT,
  invoice_url TEXT,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla de disponibilidad de profesionales
CREATE TABLE IF NOT EXISTS availability (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  professional_id UUID REFERENCES professionals(id) ON DELETE CASCADE,
  day_of_week INTEGER NOT NULL CHECK (day_of_week >= 0 AND day_of_week <= 6), -- 0=Sunday, 6=Saturday
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla de reseñas
CREATE TABLE IF NOT EXISTS reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID REFERENCES sessions(id) UNIQUE,
  professional_id UUID REFERENCES professionals(id),
  user_id UUID REFERENCES profiles(id),
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla de recursos/artículos
CREATE TABLE IF NOT EXISTS resources (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  content TEXT,
  category TEXT, -- 'article', 'video', 'audio', 'guide'
  tags TEXT[],
  published BOOLEAN DEFAULT FALSE,
  author_id UUID REFERENCES profiles(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. CREAR ÍNDICES PARA MEJOR PERFORMANCE
-- ==================================================

CREATE INDEX IF NOT EXISTS idx_profiles_company ON profiles(company_id);
CREATE INDEX IF NOT EXISTS idx_profiles_role ON profiles(role);
CREATE INDEX IF NOT EXISTS idx_professionals_user ON professionals(user_id);
CREATE INDEX IF NOT EXISTS idx_sessions_user ON sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_sessions_professional ON sessions(professional_id);
CREATE INDEX IF NOT EXISTS idx_sessions_status ON sessions(status);
CREATE INDEX IF NOT EXISTS idx_sessions_scheduled ON sessions(scheduled_at);
CREATE INDEX IF NOT EXISTS idx_assessments_user ON assessments(user_id);
CREATE INDEX IF NOT EXISTS idx_chat_messages_conversation ON chat_messages(conversation_id);
CREATE INDEX IF NOT EXISTS idx_notifications_user ON notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_read ON notifications(read);

-- 3. HABILITAR ROW LEVEL SECURITY (RLS)
-- ==================================================

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
ALTER TABLE resources ENABLE ROW LEVEL SECURITY;

-- 4. CREAR POLÍTICAS DE SEGURIDAD
-- ==================================================

-- Políticas para profiles
DROP POLICY IF EXISTS "Users can view own profile" ON profiles;
CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users can insert own profile" ON profiles;
CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Políticas para companies
DROP POLICY IF EXISTS "Users can view own company" ON companies;
CREATE POLICY "Users can view own company"
  ON companies FOR SELECT
  USING (
    id IN (SELECT company_id FROM profiles WHERE id = auth.uid())
  );

-- Políticas para professionals (todos pueden ver profesionales disponibles)
DROP POLICY IF EXISTS "Anyone can view available professionals" ON professionals;
CREATE POLICY "Anyone can view available professionals"
  ON professionals FOR SELECT
  USING (available = TRUE OR user_id = auth.uid());

-- Políticas para sessions
DROP POLICY IF EXISTS "Users can view own sessions" ON sessions;
CREATE POLICY "Users can view own sessions"
  ON sessions FOR SELECT
  USING (
    user_id = auth.uid() OR
    professional_id IN (SELECT id FROM professionals WHERE user_id = auth.uid())
  );

DROP POLICY IF EXISTS "Users can create sessions" ON sessions;
CREATE POLICY "Users can create sessions"
  ON sessions FOR INSERT
  WITH CHECK (user_id = auth.uid());

DROP POLICY IF EXISTS "Users can update own sessions" ON sessions;
CREATE POLICY "Users can update own sessions"
  ON sessions FOR UPDATE
  USING (
    user_id = auth.uid() OR
    professional_id IN (SELECT id FROM professionals WHERE user_id = auth.uid())
  );

-- Políticas para assessments
DROP POLICY IF EXISTS "Users can view own assessments" ON assessments;
CREATE POLICY "Users can view own assessments"
  ON assessments FOR SELECT
  USING (user_id = auth.uid());

DROP POLICY IF EXISTS "Users can create own assessments" ON assessments;
CREATE POLICY "Users can create own assessments"
  ON assessments FOR INSERT
  WITH CHECK (user_id = auth.uid());

-- Políticas para notifications
DROP POLICY IF EXISTS "Users can view own notifications" ON notifications;
CREATE POLICY "Users can view own notifications"
  ON notifications FOR SELECT
  USING (user_id = auth.uid());

DROP POLICY IF EXISTS "Users can update own notifications" ON notifications;
CREATE POLICY "Users can update own notifications"
  ON notifications FOR UPDATE
  USING (user_id = auth.uid());

-- Políticas para chat conversations
DROP POLICY IF EXISTS "Users can view own conversations" ON chat_conversations;
CREATE POLICY "Users can view own conversations"
  ON chat_conversations FOR SELECT
  USING (
    user_id = auth.uid() OR
    professional_id IN (SELECT id FROM professionals WHERE user_id = auth.uid())
  );

-- Políticas para chat messages
DROP POLICY IF EXISTS "Users can view messages in own conversations" ON chat_messages;
CREATE POLICY "Users can view messages in own conversations"
  ON chat_messages FOR SELECT
  USING (
    conversation_id IN (
      SELECT id FROM chat_conversations
      WHERE user_id = auth.uid() OR
      professional_id IN (SELECT id FROM professionals WHERE user_id = auth.uid())
    )
  );

DROP POLICY IF EXISTS "Users can send messages" ON chat_messages;
CREATE POLICY "Users can send messages"
  ON chat_messages FOR INSERT
  WITH CHECK (
    sender_id = auth.uid() AND
    conversation_id IN (
      SELECT id FROM chat_conversations
      WHERE user_id = auth.uid() OR
      professional_id IN (SELECT id FROM professionals WHERE user_id = auth.uid())
    )
  );

-- Políticas para availability
DROP POLICY IF EXISTS "Anyone can view availability" ON availability;
CREATE POLICY "Anyone can view availability"
  ON availability FOR SELECT
  USING (TRUE);

DROP POLICY IF EXISTS "Professionals can manage own availability" ON availability;
CREATE POLICY "Professionals can manage own availability"
  ON availability FOR ALL
  USING (
    professional_id IN (SELECT id FROM professionals WHERE user_id = auth.uid())
  );

-- Políticas para reviews
DROP POLICY IF EXISTS "Anyone can view reviews" ON reviews;
CREATE POLICY "Anyone can view reviews"
  ON reviews FOR SELECT
  USING (TRUE);

DROP POLICY IF EXISTS "Users can create reviews for own sessions" ON reviews;
CREATE POLICY "Users can create reviews for own sessions"
  ON reviews FOR INSERT
  WITH CHECK (
    user_id = auth.uid() AND
    session_id IN (SELECT id FROM sessions WHERE user_id = auth.uid() AND status = 'completed')
  );

-- Políticas para resources
DROP POLICY IF EXISTS "Anyone can view published resources" ON resources;
CREATE POLICY "Anyone can view published resources"
  ON resources FOR SELECT
  USING (published = TRUE OR author_id = auth.uid());

-- 5. CREAR FUNCIONES Y TRIGGERS
-- ==================================================

-- Función para actualizar updated_at automáticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers para updated_at
DROP TRIGGER IF EXISTS update_companies_updated_at ON companies;
CREATE TRIGGER update_companies_updated_at
  BEFORE UPDATE ON companies
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_profiles_updated_at ON profiles;
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_professionals_updated_at ON professionals;
CREATE TRIGGER update_professionals_updated_at
  BEFORE UPDATE ON professionals
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_sessions_updated_at ON sessions;
CREATE TRIGGER update_sessions_updated_at
  BEFORE UPDATE ON sessions
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_chat_conversations_updated_at ON chat_conversations;
CREATE TRIGGER update_chat_conversations_updated_at
  BEFORE UPDATE ON chat_conversations
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Función para crear perfil automáticamente cuando se crea un usuario
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data->>'full_name');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger para crear perfil automáticamente
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- ✅ Setup completado!
