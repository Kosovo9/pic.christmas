-- RUN THIS IN SUPABASE SQL EDITOR

-- Tabla 1: Registrar todas las generaciones
-- Esta tabla guardará cada intento de generación exitoso para calcular costos y frecuencia.
CREATE TABLE IF NOT EXISTS generation_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT NOT NULL,
  format_id TEXT NOT NULL,
  price_usd DECIMAL(10, 2), -- Precio estimado del costo de API
  prompt_length INTEGER,
  image_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Tabla 2: Configuración del sistema
-- Permite ajustar límites dinámicamente sin redeployar.
CREATE TABLE IF NOT EXISTS system_config (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  kill_switch_start_time TIMESTAMPTZ, -- Cuándo empezó la oferta viral
  max_spend_usd DECIMAL(10, 2) DEFAULT 50, -- Límite de seguridad
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Índices para performance rápida
CREATE INDEX IF NOT EXISTS idx_user_id ON generation_requests(user_id);
CREATE INDEX IF NOT EXISTS idx_created_at ON generation_requests(created_at);

-- Insertar configuración inicial (Empezando AHORA)
INSERT INTO system_config (kill_switch_start_time, max_spend_usd)
VALUES (now(), 50);
