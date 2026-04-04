# Database Migration Scripts

## Remove Impact Fields Migration

This migration removes the `icon`, `stats_value`, and `stats_label` columns from the `impacts` table.

### To run the migration:

1. Make sure your `.env.local` file has the correct `DATABASE_URL`
2. Run the migration script:

```bash
node scripts/migrate-impacts.js
```

### What this migration does:

- Removes the `icon` column from the impacts table
- Removes the `stats_value` column from the impacts table  
- Removes the `stats_label` column from the impacts table

The migration uses `DROP COLUMN IF EXISTS` so it's safe to run multiple times.