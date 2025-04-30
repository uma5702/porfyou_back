import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { SignInDto } from './dto/signin.dto';
import { SignUpDto } from './dto/signup.dto';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async signIn(dto: SignInDto) {
    const { data, error } = await supabase.auth.signInWithPassword({
        email: dto.email,
        password: dto.password,
      });

    if (error || !data) throw new UnauthorizedException('Invalid credentials');

    return { accessToken: data.session?.access_token };
  }

  async signUp(dto: SignUpDto) {
    const hash = await bcrypt.hash(dto.password, 10);

    const { error } = await  supabase.auth.admin.createUser({
       email: dto.email, password: dto.password, user_metadata: { role: dto.role },email_confirm: true, 
    });
    
    if (error)
    {
        console.log("users error",error.message);
        throw new UnauthorizedException(error.message);
    }

    return { message: 'User created successfully' };
  }
}
