-- ==================================================
-- MENTALFIT - DATOS DE EJEMPLO (SEED)
-- ==================================================
-- Ejecuta este archivo DESPUÉS de supabase-setup.sql

-- 1. CREAR EMPRESAS DE EJEMPLO
-- ==================================================

INSERT INTO companies (id, name, plan, employee_count) VALUES
  ('550e8400-e29b-41d4-a716-446655440001', 'TechCorp Inc.', 'enterprise', 250),
  ('550e8400-e29b-41d4-a716-446655440002', 'StartupHub', 'pro', 45),
  ('550e8400-e29b-41d4-a716-446655440003', 'Healthcare Plus', 'basic', 80)
ON CONFLICT (id) DO NOTHING;

-- 2. CREAR USUARIOS DE EJEMPLO EN AUTH.USERS
-- ==================================================
-- Primero creamos los usuarios en auth.users

INSERT INTO auth.users (
  id,
  instance_id,
  email,
  encrypted_password,
  email_confirmed_at,
  created_at,
  updated_at,
  raw_app_meta_data,
  raw_user_meta_data,
  is_super_admin,
  role
)
SELECT
  id,
  '00000000-0000-0000-0000-000000000000',
  email,
  crypt('Password123!', gen_salt('bf')),
  NOW(),
  NOW(),
  NOW(),
  '{"provider":"email","providers":["email"]}',
  jsonb_build_object('full_name', full_name),
  FALSE,
  'authenticated'
FROM (VALUES
  ('650e8400-e29b-41d4-a716-446655440001'::uuid, 'admin@mentalfit.com', 'Admin Principal'),
  ('650e8400-e29b-41d4-a716-446655440002'::uuid, 'admin@techcorp.com', 'John Smith'),
  ('650e8400-e29b-41d4-a716-446655440003'::uuid, 'alice@techcorp.com', 'Alice Johnson'),
  ('650e8400-e29b-41d4-a716-446655440004'::uuid, 'bob@techcorp.com', 'Bob Williams'),
  ('650e8400-e29b-41d4-a716-446655440005'::uuid, 'dr.sarah@mentalfit.com', 'Dr. Sarah Wilson'),
  ('650e8400-e29b-41d4-a716-446655440006'::uuid, 'dr.michael@mentalfit.com', 'Dr. Michael Chen'),
  ('650e8400-e29b-41d4-a716-446655440007'::uuid, 'dr.emily@mentalfit.com', 'Dr. Emily Brown')
) AS t(id, email, full_name)
WHERE NOT EXISTS (SELECT 1 FROM auth.users WHERE auth.users.id = t.id);

-- 3. CREAR PERFILES DE EJEMPLO
-- ==================================================
-- El trigger automático debería crear los perfiles, pero los actualizamos manualmente

INSERT INTO profiles (id, email, full_name, role, company_id) VALUES
  ('650e8400-e29b-41d4-a716-446655440001', 'admin@mentalfit.com', 'Admin Principal', 'admin', NULL),
  ('650e8400-e29b-41d4-a716-446655440002', 'admin@techcorp.com', 'John Smith', 'company_admin', '550e8400-e29b-41d4-a716-446655440001'),
  ('650e8400-e29b-41d4-a716-446655440003', 'alice@techcorp.com', 'Alice Johnson', 'user', '550e8400-e29b-41d4-a716-446655440001'),
  ('650e8400-e29b-41d4-a716-446655440004', 'bob@techcorp.com', 'Bob Williams', 'user', '550e8400-e29b-41d4-a716-446655440001'),
  ('650e8400-e29b-41d4-a716-446655440005', 'dr.sarah@mentalfit.com', 'Dr. Sarah Wilson', 'professional', NULL),
  ('650e8400-e29b-41d4-a716-446655440006', 'dr.michael@mentalfit.com', 'Dr. Michael Chen', 'professional', NULL),
  ('650e8400-e29b-41d4-a716-446655440007', 'dr.emily@mentalfit.com', 'Dr. Emily Brown', 'professional', NULL)
ON CONFLICT (id) DO NOTHING;

-- 4. CREAR PROFESIONALES
-- ==================================================

INSERT INTO professionals (id, user_id, specialization, license_number, bio, rating, total_sessions, hourly_rate, years_experience) VALUES
  (
    '750e8400-e29b-41d4-a716-446655440001',
    '650e8400-e29b-41d4-a716-446655440005',
    'Clinical Psychology',
    'PSY-12345',
    'Especialista en terapia cognitivo-conductual con 10 años de experiencia. Me enfoco en ansiedad, depresión y manejo del estrés laboral.',
    4.8,
    156,
    120.00,
    10
  ),
  (
    '750e8400-e29b-41d4-a716-446655440002',
    '650e8400-e29b-41d4-a716-446655440006',
    'Organizational Psychology',
    'PSY-67890',
    'Psicólogo organizacional especializado en burnout y bienestar corporativo. 8 años de experiencia con empresas tech.',
    4.9,
    203,
    150.00,
    8
  ),
  (
    '750e8400-e29b-41d4-a716-446655440003',
    '650e8400-e29b-41d4-a716-446655440007',
    'Counseling Psychology',
    'PSY-54321',
    'Terapeuta con enfoque humanista. Especializada en desarrollo personal y gestión emocional.',
    4.7,
    124,
    110.00,
    6
  )
ON CONFLICT (id) DO NOTHING;

-- 5. CREAR DISPONIBILIDAD DE PROFESIONALES
-- ==================================================

-- Dr. Sarah - Lunes a Viernes 9am-5pm
INSERT INTO availability (professional_id, day_of_week, start_time, end_time) VALUES
  ('750e8400-e29b-41d4-a716-446655440001', 1, '09:00', '17:00'), -- Lunes
  ('750e8400-e29b-41d4-a716-446655440001', 2, '09:00', '17:00'), -- Martes
  ('750e8400-e29b-41d4-a716-446655440001', 3, '09:00', '17:00'), -- Miércoles
  ('750e8400-e29b-41d4-a716-446655440001', 4, '09:00', '17:00'), -- Jueves
  ('750e8400-e29b-41d4-a716-446655440001', 5, '09:00', '17:00')  -- Viernes
ON CONFLICT DO NOTHING;

-- Dr. Michael - Martes a Sábado 10am-6pm
INSERT INTO availability (professional_id, day_of_week, start_time, end_time) VALUES
  ('750e8400-e29b-41d4-a716-446655440002', 2, '10:00', '18:00'),
  ('750e8400-e29b-41d4-a716-446655440002', 3, '10:00', '18:00'),
  ('750e8400-e29b-41d4-a716-446655440002', 4, '10:00', '18:00'),
  ('750e8400-e29b-41d4-a716-446655440002', 5, '10:00', '18:00'),
  ('750e8400-e29b-41d4-a716-446655440002', 6, '10:00', '18:00')
ON CONFLICT DO NOTHING;

-- 6. CREAR SESIONES DE EJEMPLO
-- ==================================================

INSERT INTO sessions (id, user_id, professional_id, scheduled_at, duration, status, type, notes) VALUES
  (
    '850e8400-e29b-41d4-a716-446655440001',
    '650e8400-e29b-41d4-a716-446655440003', -- Alice
    '750e8400-e29b-41d4-a716-446655440001', -- Dr. Sarah
    NOW() + INTERVAL '2 days',
    50,
    'scheduled',
    'individual',
    'Primera sesión - evaluación inicial'
  ),
  (
    '850e8400-e29b-41d4-a716-446655440002',
    '650e8400-e29b-41d4-a716-446655440004', -- Bob
    '750e8400-e29b-41d4-a716-446655440002', -- Dr. Michael
    NOW() - INTERVAL '3 days',
    50,
    'completed',
    'individual',
    'Sesión de seguimiento - manejo de estrés'
  ),
  (
    '850e8400-e29b-41d4-a716-446655440003',
    '650e8400-e29b-41d4-a716-446655440003', -- Alice
    '750e8400-e29b-41d4-a716-446655440001', -- Dr. Sarah
    NOW() - INTERVAL '7 days',
    50,
    'completed',
    'individual',
    'Sesión completada - progreso positivo'
  )
ON CONFLICT (id) DO NOTHING;

-- 7. CREAR EVALUACIONES DE EJEMPLO
-- ==================================================

INSERT INTO assessments (user_id, type, score, results, interpretation, severity) VALUES
  (
    '650e8400-e29b-41d4-a716-446655440003', -- Alice
    'PHQ-9',
    8,
    '{"q1": 1, "q2": 1, "q3": 1, "q4": 1, "q5": 1, "q6": 1, "q7": 1, "q8": 1, "q9": 0}',
    'Depresión leve. Se recomienda seguimiento y terapia de apoyo.',
    'mild'
  ),
  (
    '650e8400-e29b-41d4-a716-446655440003', -- Alice
    'GAD-7',
    6,
    '{"q1": 1, "q2": 1, "q3": 1, "q4": 1, "q5": 1, "q6": 1, "q7": 0}',
    'Ansiedad leve. Monitoreo regular recomendado.',
    'mild'
  ),
  (
    '650e8400-e29b-41d4-a716-446655440004', -- Bob
    'PHQ-9',
    12,
    '{"q1": 2, "q2": 1, "q3": 2, "q4": 1, "q5": 2, "q6": 1, "q7": 1, "q8": 1, "q9": 1}',
    'Depresión moderada. Terapia y seguimiento médico recomendados.',
    'moderate'
  )
ON CONFLICT DO NOTHING;

-- 8. CREAR RESEÑAS
-- ==================================================

INSERT INTO reviews (session_id, professional_id, user_id, rating, comment) VALUES
  (
    '850e8400-e29b-41d4-a716-446655440002',
    '750e8400-e29b-41d4-a716-446655440002', -- Dr. Michael
    '650e8400-e29b-41d4-a716-446655440004', -- Bob
    5,
    'Excelente profesional, muy empático y con herramientas prácticas. ¡Altamente recomendado!'
  ),
  (
    '850e8400-e29b-41d4-a716-446655440003',
    '750e8400-e29b-41d4-a716-446655440001', -- Dr. Sarah
    '650e8400-e29b-41d4-a716-446655440003', -- Alice
    5,
    'La Dra. Sarah es increíble. Me ha ayudado muchísimo con mi ansiedad.'
  )
ON CONFLICT (session_id) DO NOTHING;

-- 9. CREAR NOTIFICACIONES
-- ==================================================

INSERT INTO notifications (user_id, type, title, message, read, link) VALUES
  (
    '650e8400-e29b-41d4-a716-446655440003', -- Alice
    'session',
    'Sesión programada',
    'Tu sesión con Dr. Sarah Wilson está programada para mañana a las 10:00 AM',
    FALSE,
    '/dashboard/sessions'
  ),
  (
    '650e8400-e29b-41d4-a716-446655440004', -- Bob
    'assessment',
    'Nueva evaluación disponible',
    'Completa tu evaluación mensual de bienestar',
    FALSE,
    '/dashboard/assessments'
  ),
  (
    '650e8400-e29b-41d4-a716-446655440002', -- Admin
    'system',
    'Bienvenido a MentalFit',
    'Gracias por unirte a nuestra plataforma de salud mental',
    TRUE,
    '/dashboard'
  )
ON CONFLICT DO NOTHING;

-- 10. CREAR RECURSOS
-- ==================================================

INSERT INTO resources (title, description, content, category, tags, published, author_id) VALUES
  (
    'Manejo del Estrés Laboral: 5 Técnicas Efectivas',
    'Aprende técnicas prácticas para reducir el estrés en el trabajo',
    'El estrés laboral es una de las principales causas de burnout...',
    'article',
    ARRAY['estrés', 'trabajo', 'burnout', 'técnicas'],
    TRUE,
    '650e8400-e29b-41d4-a716-446655440001'
  ),
  (
    'Meditación Guiada: 10 Minutos de Calma',
    'Audio de meditación guiada para reducir la ansiedad',
    'https://example.com/meditation-audio.mp3',
    'audio',
    ARRAY['meditación', 'mindfulness', 'ansiedad'],
    TRUE,
    '650e8400-e29b-41d4-a716-446655440005'
  ),
  (
    'Guía Completa de Bienestar Mental en el Trabajo',
    'Documento descargable con estrategias de bienestar',
    'Esta guía te ayudará a mantener tu salud mental en el entorno laboral...',
    'guide',
    ARRAY['bienestar', 'trabajo', 'salud mental'],
    TRUE,
    '650e8400-e29b-41d4-a716-446655440006'
  )
ON CONFLICT DO NOTHING;

-- 11. CREAR CONVERSACIÓN DE CHAT DE EJEMPLO
-- ==================================================

INSERT INTO chat_conversations (id, user_id, professional_id, status) VALUES
  (
    '950e8400-e29b-41d4-a716-446655440001',
    '650e8400-e29b-41d4-a716-446655440003', -- Alice
    '750e8400-e29b-41d4-a716-446655440001', -- Dr. Sarah
    'active'
  )
ON CONFLICT (id) DO NOTHING;

INSERT INTO chat_messages (conversation_id, sender_id, content, sentiment, read) VALUES
  (
    '950e8400-e29b-41d4-a716-446655440001',
    '650e8400-e29b-41d4-a716-446655440003', -- Alice
    'Hola Doctora, me gustaría agendar una sesión para esta semana',
    '{"score": 0.5, "label": "positive"}',
    TRUE
  ),
  (
    '950e8400-e29b-41d4-a716-446655440001',
    '650e8400-e29b-41d4-a716-446655440005', -- Dr. Sarah
    'Hola Alice, con gusto. ¿Qué días te vienen mejor?',
    '{"score": 0.7, "label": "positive"}',
    TRUE
  ),
  (
    '950e8400-e29b-41d4-a716-446655440001',
    '650e8400-e29b-41d4-a716-446655440003', -- Alice
    'El miércoles o jueves estaría bien',
    '{"score": 0.4, "label": "neutral"}',
    FALSE
  )
ON CONFLICT DO NOTHING;

-- ✅ Datos de ejemplo insertados correctamente!

SELECT 'Setup completado! Verifica las tablas en Table Editor' as mensaje;
