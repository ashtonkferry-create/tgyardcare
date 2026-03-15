-- Phase 1 Revenue Engine: Database Schema Migration
-- Creates tables and adds columns required by all Phase 1 workflows
-- Applied: 2026-03-14

-- ============================================================
-- 1. fertilizer_schedule — 5-step annual fertilizer program
-- ============================================================
CREATE TABLE IF NOT EXISTS fertilizer_schedule (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id UUID REFERENCES leads(id),
  customer_name TEXT,
  customer_phone TEXT,
  customer_email TEXT,
  plan_year INTEGER NOT NULL DEFAULT 2026,
  step_number INTEGER NOT NULL CHECK (step_number BETWEEN 1 AND 5),
  step_name TEXT NOT NULL,
  scheduled_date DATE NOT NULL,
  reminder_sent_at TIMESTAMPTZ,
  service_completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(lead_id, plan_year, step_number)
);

-- ============================================================
-- 2. missed_calls — Twilio missed call tracking for auto-SMS
-- ============================================================
CREATE TABLE IF NOT EXISTS missed_calls (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  call_sid TEXT UNIQUE NOT NULL,
  from_phone TEXT NOT NULL,
  to_phone TEXT NOT NULL,
  caller_name TEXT,
  call_status TEXT,
  sms_sent_at TIMESTAMPTZ,
  sms_response TEXT,
  lead_created BOOLEAN DEFAULT FALSE,
  lead_id UUID REFERENCES leads(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- 3. jobber_email_events — extend CHECK to allow quote_sent, visit_confirmed
-- ============================================================
ALTER TABLE jobber_email_events DROP CONSTRAINT IF EXISTS jobber_email_events_parsed_event_type_check;
ALTER TABLE jobber_email_events ADD CONSTRAINT jobber_email_events_parsed_event_type_check
  CHECK (parsed_event_type IS NULL OR parsed_event_type IN (
    'new_request', 'job_scheduled', 'job_completed', 'invoice_sent', 'payment_received',
    'quote_sent', 'visit_confirmed'
  ));

-- ============================================================
-- 4. customer_subscriptions — renewal reminder tracking
-- ============================================================
ALTER TABLE customer_subscriptions
  ADD COLUMN IF NOT EXISTS renewal_reminder_30d_sent TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS renewal_reminder_14d_sent TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS renewal_reminder_3d_sent TIMESTAMPTZ;

-- ============================================================
-- 5. estimates — quote followup tracking (TG-83)
-- ============================================================
ALTER TABLE estimates
  ADD COLUMN IF NOT EXISTS followup_status TEXT,
  ADD COLUMN IF NOT EXISTS followup_enrolled_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS followup_sms_day2_sent_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS followup_email_day7_sent_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS followup_expired_at TIMESTAMPTZ;

-- ============================================================
-- 6. invoices — collections tracking (TG-84)
-- ============================================================
ALTER TABLE invoices
  ADD COLUMN IF NOT EXISTS collections_status TEXT,
  ADD COLUMN IF NOT EXISTS collections_enrolled_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS collections_sms_day3_sent_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS collections_email_day10_sent_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS collections_sms_day17_sent_at TIMESTAMPTZ;

-- ============================================================
-- 7. RLS policies for new tables
-- ============================================================
ALTER TABLE fertilizer_schedule ENABLE ROW LEVEL SECURITY;
CREATE POLICY "service_role_all" ON fertilizer_schedule FOR ALL USING (true) WITH CHECK (true);

ALTER TABLE missed_calls ENABLE ROW LEVEL SECURITY;
CREATE POLICY "service_role_all" ON missed_calls FOR ALL USING (true) WITH CHECK (true);
