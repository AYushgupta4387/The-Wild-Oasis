import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://zkboysilggqxasbrerom.supabase.co";

const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InprYm95c2lsZ2dxeGFzYnJlcm9tIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE5NTQ4NzksImV4cCI6MjA1NzUzMDg3OX0.KLk7-zHFkTdTVtd9jXT-OJcz80f9BE7dXmIgkCAk4ak";

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
