const fs = require('fs'); const { Client } = require('pg');
const sql = fs.readFileSync(__dirname + '/schema.sql','utf8');
const url = process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/dunning_db';
(async ()=>{ const c = new Client({connectionString:url}); await c.connect(); await c.query(sql); console.log('migrations applied'); await c.end(); })().catch(e=>{ console.error(e); process.exit(1); });
