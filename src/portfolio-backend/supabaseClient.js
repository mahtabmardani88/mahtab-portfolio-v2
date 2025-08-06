import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://nekbmfnryznprtevdlke.supabase.co"; 
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5la2JtZm5yeXpucHJ0ZXZkbGtlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ0ODUxOTcsImV4cCI6MjA3MDA2MTE5N30.VMxc8vjhdhlcYuvTZYwZr91HVo6q7Lql89sHs-CuF8c"; 
export const supabase = createClient(supabaseUrl, supabaseKey);
