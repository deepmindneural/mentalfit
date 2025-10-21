-- ============================================
-- LIMPIEZA TOTAL DE BASE DE DATOS - MENTALFIT
-- ============================================
-- PRECAUCIÓN: Elimina TODO del schema public
-- ============================================

DO $$
DECLARE
    r RECORD;
BEGIN
    -- Deshabilitar triggers
    SET session_replication_role = 'replica';

    RAISE NOTICE 'Iniciando limpieza total...';

    -- 1. ELIMINAR TODAS LAS VISTAS MATERIALIZADAS
    RAISE NOTICE 'Eliminando vistas materializadas...';
    FOR r IN (SELECT matviewname FROM pg_matviews WHERE schemaname = 'public') LOOP
        EXECUTE 'DROP MATERIALIZED VIEW IF EXISTS ' || quote_ident(r.matviewname) || ' CASCADE';
        RAISE NOTICE '  ✓ Vista materializada eliminada: %', r.matviewname;
    END LOOP;

    -- 2. ELIMINAR TODAS LAS VISTAS
    RAISE NOTICE 'Eliminando vistas...';
    FOR r IN (SELECT viewname FROM pg_views WHERE schemaname = 'public') LOOP
        EXECUTE 'DROP VIEW IF EXISTS ' || quote_ident(r.viewname) || ' CASCADE';
        RAISE NOTICE '  ✓ Vista eliminada: %', r.viewname;
    END LOOP;

    -- 3. ELIMINAR TODAS LAS FUNCIONES
    RAISE NOTICE 'Eliminando funciones...';
    FOR r IN (
        SELECT
            n.nspname as schema_name,
            p.proname as function_name,
            pg_get_function_identity_arguments(p.oid) as args
        FROM pg_proc p
        JOIN pg_namespace n ON p.pronamespace = n.oid
        WHERE n.nspname = 'public'
    ) LOOP
        EXECUTE 'DROP FUNCTION IF EXISTS ' || quote_ident(r.schema_name) || '.' ||
                quote_ident(r.function_name) || '(' || r.args || ') CASCADE';
        RAISE NOTICE '  ✓ Función eliminada: %(%)', r.function_name, r.args;
    END LOOP;

    -- 4. ELIMINAR TODOS LOS TRIGGERS
    RAISE NOTICE 'Eliminando triggers...';
    FOR r IN (
        SELECT
            event_object_table as table_name,
            trigger_name
        FROM information_schema.triggers
        WHERE trigger_schema = 'public'
    ) LOOP
        EXECUTE 'DROP TRIGGER IF EXISTS ' || quote_ident(r.trigger_name) ||
                ' ON ' || quote_ident(r.table_name) || ' CASCADE';
        RAISE NOTICE '  ✓ Trigger eliminado: % en tabla %', r.trigger_name, r.table_name;
    END LOOP;

    -- 5. ELIMINAR TODAS LAS TABLAS
    RAISE NOTICE 'Eliminando tablas...';
    FOR r IN (
        SELECT tablename
        FROM pg_tables
        WHERE schemaname = 'public'
    ) LOOP
        EXECUTE 'DROP TABLE IF EXISTS ' || quote_ident(r.tablename) || ' CASCADE';
        RAISE NOTICE '  ✓ Tabla eliminada: %', r.tablename;
    END LOOP;

    -- 6. ELIMINAR TODOS LOS ÍNDICES HUÉRFANOS
    RAISE NOTICE 'Eliminando índices huérfanos...';
    FOR r IN (
        SELECT
            schemaname,
            indexname
        FROM pg_indexes
        WHERE schemaname = 'public'
    ) LOOP
        BEGIN
            EXECUTE 'DROP INDEX IF EXISTS ' || quote_ident(r.schemaname) || '.' ||
                    quote_ident(r.indexname) || ' CASCADE';
            RAISE NOTICE '  ✓ Índice eliminado: %', r.indexname;
        EXCEPTION WHEN OTHERS THEN
            -- Ignorar errores si el índice ya no existe
            NULL;
        END;
    END LOOP;

    -- 7. ELIMINAR TODOS LOS TIPOS CUSTOM
    RAISE NOTICE 'Eliminando tipos personalizados...';
    FOR r IN (
        SELECT
            n.nspname as schema,
            t.typname as typename
        FROM pg_type t
        JOIN pg_namespace n ON t.typnamespace = n.oid
        WHERE n.nspname = 'public'
        AND t.typtype = 'e' -- solo enums
    ) LOOP
        BEGIN
            EXECUTE 'DROP TYPE IF EXISTS ' || quote_ident(r.schema) || '.' ||
                    quote_ident(r.typename) || ' CASCADE';
            RAISE NOTICE '  ✓ Tipo eliminado: %', r.typename;
        EXCEPTION WHEN OTHERS THEN
            NULL;
        END;
    END LOOP;

    -- 8. ELIMINAR TODAS LAS SECUENCIAS
    RAISE NOTICE 'Eliminando secuencias...';
    FOR r IN (
        SELECT
            schemaname,
            sequencename
        FROM pg_sequences
        WHERE schemaname = 'public'
    ) LOOP
        EXECUTE 'DROP SEQUENCE IF EXISTS ' || quote_ident(r.schemaname) || '.' ||
                quote_ident(r.sequencename) || ' CASCADE';
        RAISE NOTICE '  ✓ Secuencia eliminada: %', r.sequencename;
    END LOOP;

    -- Habilitar triggers nuevamente
    SET session_replication_role = 'origin';

    RAISE NOTICE '';
    RAISE NOTICE '========================================';
    RAISE NOTICE '✅ LIMPIEZA TOTAL COMPLETADA';
    RAISE NOTICE '========================================';
    RAISE NOTICE 'El schema public está completamente vacío';
    RAISE NOTICE 'Ahora puedes ejecutar schema.sql';
    RAISE NOTICE '';

END $$;

-- Verificar que todo está limpio
DO $$
DECLARE
    tabla_count INTEGER;
    func_count INTEGER;
    view_count INTEGER;
    index_count INTEGER;
BEGIN
    -- Contar tablas
    SELECT COUNT(*) INTO tabla_count FROM pg_tables WHERE schemaname = 'public';

    -- Contar funciones
    SELECT COUNT(*) INTO func_count
    FROM pg_proc p
    JOIN pg_namespace n ON p.pronamespace = n.oid
    WHERE n.nspname = 'public';

    -- Contar vistas
    SELECT COUNT(*) INTO view_count FROM pg_views WHERE schemaname = 'public';

    -- Contar índices
    SELECT COUNT(*) INTO index_count FROM pg_indexes WHERE schemaname = 'public';

    RAISE NOTICE '📊 RESUMEN:';
    RAISE NOTICE '   Tablas restantes: %', tabla_count;
    RAISE NOTICE '   Funciones restantes: %', func_count;
    RAISE NOTICE '   Vistas restantes: %', view_count;
    RAISE NOTICE '   Índices restantes: %', index_count;

    IF tabla_count = 0 AND func_count = 0 AND view_count = 0 AND index_count = 0 THEN
        RAISE NOTICE '';
        RAISE NOTICE '✅ Todo limpio! Listo para ejecutar schema.sql';
    ELSE
        RAISE WARNING '⚠️  Todavía quedan objetos. Ejecuta este script nuevamente.';
    END IF;
END $$;
