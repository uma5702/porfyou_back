import { Injectable } from '@nestjs/common';
import { CreatePortfolioDto } from './dto/create-portfolio.dto';
import { UpdatePortfolioDto } from './dto/update-portfolio.dto';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_ANON_KEY!);
const tableName = 'portfolios';

@Injectable()
export class PortfolioService {
  //private portfolios: (CreatePortfolioDto & { id: number })[] = [];

  async create(dto: CreatePortfolioDto, userId: string) {
    const newItem = { id: Date.now(), ...dto };
    
    const title = dto.title
    const description = dto.description
    const github_url = dto.githubUrl

    const { data, error } = await supabase.from(tableName).insert({
      user_id: userId,
      title,
      description,
      github_url,
    })

    if (error) {      
      console.error('Supabase Insert Error:', error.code);
      throw new Error('Insert failed');
    }
   
    return data?.[0];
  }

  async findAll() {
    const { data, error } = await supabase.from(tableName).select('*');
    console.error('findAll Error:', error, data);
    if (error) throw new Error(error.message);
    return data;
  }

  async findOne(id: string) {
    console.error('findOne id:', id);
    const { data, error } = await supabase.from(tableName).select('*').eq('id', id).single();
    console.error('findOne Error:', error);
    if (error) throw new Error(error.message);
    return data;
  }
  async update(id: string, dto: UpdatePortfolioDto, user: any) {
    const { data, error } = await supabase
      .from(tableName)
      .update({ ...dto })
      .eq('id', id)
      .eq('user_id', user.id)
      .select()
      .single();

    if (error) {
      console.error('Update Error:', error);
      throw new Error(error.message);
    }
    return data;
  }

  async remove(id: string, user: any) {
    const { data, error } = await supabase
      .from(tableName)
      .delete()
      .eq('id', id)
      .eq('user_id', user.id)
      .select()
      .single();

    if (error) {
      console.error('Remove Error:', error);
      throw new Error(error.message);
    }
    return data;
  }
}