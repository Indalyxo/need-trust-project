-- Migration to remove icon, stats_value, and stats_label columns from impacts table
ALTER TABLE impacts DROP COLUMN IF EXISTS icon;
ALTER TABLE impacts DROP COLUMN IF EXISTS stats_value;
ALTER TABLE impacts DROP COLUMN IF EXISTS stats_label;