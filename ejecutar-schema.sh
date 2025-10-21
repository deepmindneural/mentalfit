#!/bin/bash

# Configuración
SUPABASE_URL="https://lasxxxsouafpqrxpwtzk.supabase.co"
SERVICE_ROLE_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxhc3h4eHNvdWFmcHFyeHB3dHprIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MDQ5NTU2MCwiZXhwIjoyMDc2MDcxNTYwfQ.UE6OX0Plnl5x43SZ7NCQlptzUxcbtG_pDT4r8K_x5fk"

echo "========================================"
echo "EJECUTANDO SCHEMA EN SUPABASE"
echo "========================================"

# Ejecutar schema.sql
echo ""
echo "📋 Ejecutando schema completo..."
PGPASSWORD="4nBShUbrGUSAr4" psql \
  "postgresql://postgres:4nBShUbrGUSAr4@db.lasxxxsouafpqrxpwtzk.supabase.co:5432/postgres?sslmode=require" \
  -f "/Volumes/StarkT7/Proyectos/CLIENETS/proyectos/ESCUCHODROMO/Mentalfit 2/mentalfit/apps/web/scripts/schema.sql" \
  2>&1

SCHEMA_EXIT_CODE=$?
if [ $SCHEMA_EXIT_CODE -eq 0 ]; then
  echo "✅ Schema ejecutado correctamente"
else
  echo "❌ Error al ejecutar schema (código: $SCHEMA_EXIT_CODE)"
  exit 1
fi

echo ""
echo "📋 Ejecutando funciones de negocio..."
PGPASSWORD="4nBShUbrGUSAr4" psql \
  "postgresql://postgres:4nBShUbrGUSAr4@db.lasxxxsouafpqrxpwtzk.supabase.co:5432/postgres?sslmode=require" \
  -f "/Volumes/StarkT7/Proyectos/CLIENETS/proyectos/ESCUCHODROMO/Mentalfit 2/mentalfit/apps/web/scripts/funciones-negocio.sql" \
  2>&1

FUNCIONES_EXIT_CODE=$?
if [ $FUNCIONES_EXIT_CODE -eq 0 ]; then
  echo "✅ Funciones ejecutadas correctamente"
else
  echo "❌ Error al ejecutar funciones (código: $FUNCIONES_EXIT_CODE)"
  exit 1
fi

echo ""
echo "========================================"
echo "✅ SCHEMA Y FUNCIONES EJECUTADOS"
echo "========================================"
