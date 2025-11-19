import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const SUPABASE_URL = 'https://rwbgdgixiylrkvpfmhfp.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ3YmdkZ2l4aXlscmt2cGZtaGZwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk5MjM3MTIsImV4cCI6MjA3NTQ5OTcxMn0.54J4MGxW5FTTRyl8w7kkMogfCBU3lG8veTy5rliYYT8';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
