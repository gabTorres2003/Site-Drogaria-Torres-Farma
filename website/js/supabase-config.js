const { createClient } = supabase;

const supabaseUrl = "https://rwbgdgixiylrkvpfmhfp.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ3YmdkZ2l4aXlscmt2cGZtaGZwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk5MjM3MTIsImV4cCI6MjA3NTQ5OTcxMn0.54J4MGxW5FTTRyl8w7kkMogfCBU3lG8veTy5rliYYT8";

export const supabase = createClient(supabaseUrl, supabaseKey);