// One place that reads environment settings. No other file reads import.meta.env directly.
export const config = {
    supabaseUrl: import.meta.env.VITE_SUPABASE_URL || '',
    supabaseAnonKey: import.meta.env.VITE_SUPABASE_ANON_KEY || '',
    siteUrl: import.meta.env.VITE_SITE_URL || '',
};
