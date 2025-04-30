import * as bcrypt from 'bcrypt';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);

async function seedAdmin() {
  const hash = await bcrypt.hash('admin1234', 10);
  const { error } = await supabase.from('users').insert([
    { email: 'admin@domain.com', password: hash, role: 'admin' },
  ]);
  if (error) console.error(error);
  else console.log('Admin user created');
}

seedAdmin();
