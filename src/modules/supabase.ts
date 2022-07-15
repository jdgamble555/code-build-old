import { createClient } from '@supabase/supabase-js';

let process: any;

const p = process?.env ? process.env : import.meta.env;

const supabaseUrl = p.VITE_SUPABASE_URL;
const supabaseAnonKey = p.VITE_SUPABASE_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);