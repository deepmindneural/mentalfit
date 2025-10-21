# 🗄️ Setup de Base de Datos en Supabase

## Instrucciones

1. **Ir al SQL Editor de Supabase**
   - Accede a: https://app.supabase.com/project/lasxxxsouafpqrxpwtzk/sql
   - O desde tu proyecto → SQL Editor (en el menú lateral)

2. **Ejecutar el script SQL**
   - Copia todo el contenido del archivo `supabase-setup.sql`
   - Pégalo en el SQL Editor
   - Haz clic en "Run" (ejecutar)

3. **Verificar que todo se creó correctamente**
   - Ve a "Table Editor" en el menú lateral
   - Deberías ver todas las tablas creadas:
     - companies
     - profiles
     - professionals
     - sessions
     - assessments
     - chat_conversations
     - chat_messages
     - notifications
     - payments
     - availability
     - reviews
     - resources

## 📦 Tablas Creadas

- ✅ **companies** - Empresas/organizaciones
- ✅ **profiles** - Perfiles de usuario (extendido de auth.users)
- ✅ **professionals** - Profesionales de salud mental
- ✅ **sessions** - Sesiones terapéuticas
- ✅ **assessments** - Evaluaciones psicométricas
- ✅ **chat_conversations** - Conversaciones de chat
- ✅ **chat_messages** - Mensajes con análisis de sentimiento
- ✅ **notifications** - Notificaciones del sistema
- ✅ **payments** - Pagos y facturación
- ✅ **availability** - Disponibilidad de profesionales
- ✅ **reviews** - Reseñas de profesionales
- ✅ **resources** - Artículos y recursos

## 🔒 Seguridad

- ✅ Row Level Security (RLS) habilitado en todas las tablas
- ✅ Políticas de seguridad configuradas
- ✅ Triggers automáticos para `updated_at`
- ✅ Creación automática de perfil al registrarse

## 🎯 Próximos Pasos

Después de ejecutar el SQL:

1. **Verificar la autenticación**
   - Ve a Authentication → Settings
   - Asegúrate de que Email esté habilitado

2. **Insertar datos de prueba** (opcional)
   - Ejecuta el script `seed-data.sql` para datos de ejemplo

3. **Ejecutar la aplicación**
   ```bash
   pnpm dev
   ```

## 🐛 Troubleshooting

Si encuentras errores:

- **Error "already exists"**: Ignóralo, significa que la tabla ya existe
- **Error "permission denied"**: Asegúrate de estar usando el Service Role Key
- **Error "relation does not exist"**: Verifica que el SQL se ejecutó completamente

## 📝 Notas

- El trigger `on_auth_user_created` crea automáticamente un perfil cuando un usuario se registra
- Todas las tablas tienen timestamps automáticos (`created_at`, `updated_at`)
- RLS está configurado para proteger los datos de los usuarios
