#!/usr/bin/env python3
"""
Script para ejecutar SQL en Supabase usando la Management API
"""

import requests
import json
import sys
import os

# Configuración
SUPABASE_URL = "https://lasxxxsouafpqrxpwtzk.supabase.co"
SERVICE_ROLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxhc3h4eHNvdWFmcHFyeHB3dHprIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MDQ5NTU2MCwiZXhwIjoyMDc2MDcxNTYwfQ.UE6OX0Plnl5x43SZ7NCQlptzUxcbtG_pDT4r8K_x5fk"
PROJECT_REF = "lasxxxsouafpqrxpwtzk"

def ejecutar_sql_en_supabase(sql_content, description="SQL Query"):
    """Ejecuta SQL en Supabase usando la REST API"""

    # Endpoint de la REST API de Supabase
    url = f"{SUPABASE_URL}/rest/v1/rpc/exec_sql"

    headers = {
        "apikey": SERVICE_ROLE_KEY,
        "Authorization": f"Bearer {SERVICE_ROLE_KEY}",
        "Content-Type": "application/json",
        "Prefer": "return=representation"
    }

    # Payload
    payload = {
        "query": sql_content
    }

    print(f"\n{'='*60}")
    print(f"📋 Ejecutando: {description}")
    print(f"{'='*60}")

    try:
        # Intentar con Management API
        management_url = f"https://api.supabase.com/v1/projects/{PROJECT_REF}/database/query"

        response = requests.post(
            management_url,
            headers={
                "Authorization": f"Bearer {SERVICE_ROLE_KEY}",
                "Content-Type": "application/json"
            },
            json={"query": sql_content},
            timeout=120
        )

        if response.status_code == 200:
            print("✅ Ejecutado correctamente")
            return True, response.json()
        else:
            print(f"❌ Error ({response.status_code}): {response.text}")
            return False, response.text

    except Exception as e:
        print(f"❌ Error de conexión: {str(e)}")
        return False, str(e)

def leer_archivo_sql(ruta):
    """Lee el contenido de un archivo SQL"""
    try:
        with open(ruta, 'r', encoding='utf-8') as f:
            return f.read()
    except Exception as e:
        print(f"❌ Error al leer archivo {ruta}: {str(e)}")
        sys.exit(1)

def main():
    print("\n" + "="*60)
    print("🚀 EJECUTOR DE SQL EN SUPABASE")
    print("="*60)

    base_path = "/Volumes/StarkT7/Proyectos/CLIENETS/proyectos/ESCUCHODROMO/Mentalfit 2/mentalfit/apps/web/scripts"

    # 1. Ejecutar schema
    schema_path = os.path.join(base_path, "schema.sql")
    print(f"\n📄 Leyendo schema desde: {schema_path}")
    schema_sql = leer_archivo_sql(schema_path)

    success, result = ejecutar_sql_en_supabase(schema_sql, "Schema Completo (26 tablas)")

    if not success:
        print("\n⚠️  No se pudo ejecutar via API. Usa las instrucciones manuales.")
        print("📖 Ver: INSTRUCCIONES-EJECUTAR-SCHEMA.md")
        sys.exit(1)

    # 2. Ejecutar funciones
    funciones_path = os.path.join(base_path, "funciones-negocio.sql")
    print(f"\n📄 Leyendo funciones desde: {funciones_path}")
    funciones_sql = leer_archivo_sql(funciones_path)

    success, result = ejecutar_sql_en_supabase(funciones_sql, "Funciones de Negocio (20 funciones)")

    if not success:
        print("\n⚠️  No se pudo ejecutar via API. Usa las instrucciones manuales.")
        print("📖 Ver: INSTRUCCIONES-EJECUTAR-SCHEMA.md")
        sys.exit(1)

    print("\n" + "="*60)
    print("✅ SCHEMA Y FUNCIONES EJECUTADOS CORRECTAMENTE")
    print("="*60)
    print("\n📊 Próximo paso: Verificar tablas y funciones")
    print("📖 Ver: INSTRUCCIONES-EJECUTAR-SCHEMA.md (Pasos 4-8)")

if __name__ == "__main__":
    main()
