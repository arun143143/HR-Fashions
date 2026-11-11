import { createClient } from '@supabase/supabase-js';
import { config } from '../config';

// Null when the settings are missing, so the site still renders without a database.
export const supabase =
    config.supabaseUrl && config.supabaseAnonKey
        ? createClient(config.supabaseUrl, config.supabaseAnonKey)
        : null;
