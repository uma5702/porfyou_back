import { Injectable } from '@nestjs/common';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);

@Injectable()
export class UsersService {
  async findAll() {
    const { data, error } = await supabase.from('users').select('*');
    if (error) throw new Error(error.message);
    return data;
  }

  async remove(id: string) {
    const { error } = await supabase.from('users').delete().eq('id', id);
    if (error) throw new Error(error.message);
    return { message: 'User deleted' };
  }
}
