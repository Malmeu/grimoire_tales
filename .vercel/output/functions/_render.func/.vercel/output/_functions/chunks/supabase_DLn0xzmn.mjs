import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://ooevpxkcftpemofjantd.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9vZXZweGtjZnRwZW1vZmphbnRkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU3Njg3ODYsImV4cCI6MjA4MTM0NDc4Nn0.rbUanSpOKtwqcSs71eCLw_K2ywpuWSfG9Ae88hBmu6M";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export { supabase as s };
