import { createClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';

// DİKKAT: Bu bilgileri Supabase panelinden alıp buraya yapıştıracaksın.
// Project Settings -> API kısmında bulabilirsin.
const supabaseUrl = 'https://uesfohmujayzeftcoavi.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVlc2ZvaG11amF5emVmdGNvYXZpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU4ODQyMzEsImV4cCI6MjA4MTQ2MDIzMX0.2FXUXOfzEBJ_leUClanJlZB0mgRM8r6oRz7XOQH8Eic';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});