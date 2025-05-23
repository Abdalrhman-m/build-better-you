
// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://qybepnwrsjgkxaqnqmyc.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF5YmVwbndyc2pna3hhcW5xbXljIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY3OTM3OTMsImV4cCI6MjA2MjM2OTc5M30.EJaUW8uoI_aly0Bkvi9X9iNHHfBbOdF0mfUb98zLn9Y";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
  }
});
