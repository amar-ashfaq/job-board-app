import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://ynvcffxhbkackxbhaeqk.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InludmNmZnhoYmthY2t4YmhhZXFrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg1NjQwNDIsImV4cCI6MjA2NDE0MDA0Mn0.o1LYraBBKGm1R5lhN7ity2b_ryKOS95niBl0_LPWpnI";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
