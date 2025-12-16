import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join } from 'path';

const configPath = join(process.cwd(), '.vercel/output/functions/_render.func/.vc-config.json');

if (existsSync(configPath)) {
  const config = JSON.parse(readFileSync(configPath, 'utf-8'));
  config.runtime = 'nodejs20.x';
  writeFileSync(configPath, JSON.stringify(config, null, '\t'));
  console.log('✓ Updated Vercel runtime to nodejs20.x');
} else {
  console.log('⚠ Vercel config file not found, skipping runtime fix');
}
