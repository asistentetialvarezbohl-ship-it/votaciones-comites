import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://uskfhvogzpuwqixxqwnn.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVza2Zodm9nenB1d3FpeHhxd25uIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE1MjE1NzksImV4cCI6MjA4NzA5NzU3OX0.oypEArhyGUDlAyxKpr7Qp3B2HRS2NhmIsMqr4IilKqE';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
