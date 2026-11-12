import { createContext, useContext, useEffect, useState, useMemo, useCallback } from 'react';
import { supabase } from '../lib/supabase';

const AuthContext = createContext({
    user: null,
    session: null,
    profile: null,
    loading: true,
    isConfigured: false,
    sendOtp: async () => ({ error: new Error('Not initialized') }),
    verifyOtp: async () => ({ error: new Error('Not initialized') }),
    signInWithPassword: async () => ({ error: new Error('Not initialized') }),
    signOut: async () => {},
    updateProfile: async () => ({ error: new Error('Not initialized') }),
    refreshProfile: async () => {},
});

export const AuthProvider = ({ children }) => {
    const [session, setSession] = useState(null);
    const [user, setUser] = useState(null);
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    const isConfigured = Boolean(supabase);

    const fetchProfile = useCallback(async (userId, fallbackEmail = '') => {
        if (!supabase || !userId) {
            setProfile(null);
            return;
        }

        try {
            const { data, error } = await supabase
                .from('profiles')
                .select('id, email, name, phone, role, created_at')
                .eq('id', userId)
                .maybeSingle();

            if (error) {
                // If profile table hasn't been created yet or query fails, provide a minimal fallback profile
                setProfile({ id: userId, email: fallbackEmail, role: 'customer' });
            } else if (data) {
                setProfile(data);
            } else {
                setProfile({ id: userId, email: fallbackEmail, role: 'customer' });
            }
        } catch {
            setProfile({ id: userId, email: fallbackEmail, role: 'customer' });
        }
    }, []);

    useEffect(() => {
        if (!supabase) {
            setLoading(false);
            return;
        }

        let isMounted = true;

        // 1. Initial session check
        supabase.auth.getSession().then(({ data: { session: initialSession } }) => {
            if (!isMounted) return;
            setSession(initialSession);
            setUser(initialSession?.user ?? null);

            if (initialSession?.user) {
                fetchProfile(initialSession.user.id, initialSession.user.email).finally(() => {
                    if (isMounted) setLoading(false);
                });
            } else {
                setLoading(false);
            }
        });

        // 2. Auth state change listener (login, logout, token refresh)
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
            async (_event, currentSession) => {
                if (!isMounted) return;
                setSession(currentSession);
                setUser(currentSession?.user ?? null);

                if (currentSession?.user) {
                    await fetchProfile(currentSession.user.id, currentSession.user.email);
                } else {
                    setProfile(null);
                }
                setLoading(false);
            }
        );

        return () => {
            isMounted = false;
            subscription?.unsubscribe();
        };
    }, [fetchProfile]);

    const sendOtp = useCallback(async (email) => {
        if (!supabase) return { error: new Error('Supabase client is not configured') };
        const redirectTo = typeof window !== 'undefined' ? `${window.location.origin}/account` : undefined;
        return supabase.auth.signInWithOtp({
            email,
            options: {
                emailRedirectTo: redirectTo,
                shouldCreateUser: true,
            },
        });
    }, []);

    const verifyOtp = useCallback(async (email, token) => {
        if (!supabase) return { error: new Error('Supabase client is not configured') };
        return supabase.auth.verifyOtp({
            email,
            token,
            type: 'email',
        });
    }, []);

    const signInWithPassword = useCallback(async (email, password) => {
        if (!supabase) return { error: new Error('Supabase client is not configured') };
        return supabase.auth.signInWithPassword({
            email,
            password,
        });
    }, []);

    const signOut = useCallback(async () => {
        if (!supabase) return;
        await supabase.auth.signOut();
        setSession(null);
        setUser(null);
        setProfile(null);
    }, []);

    const updateProfile = useCallback(async ({ name, phone }) => {
        if (!supabase || !user) {
            return { error: new Error('Must be logged in to update profile') };
        }

        const updates = {};
        if (typeof name === 'string') updates.name = name.trim();
        if (typeof phone === 'string') updates.phone = phone.trim();

        const { data, error } = await supabase
            .from('profiles')
            .update(updates)
            .eq('id', user.id)
            .select()
            .single();

        if (!error && data) {
            setProfile(data);
        }

        return { data, error };
    }, [user]);

    const refreshProfile = useCallback(async () => {
        if (user) {
            await fetchProfile(user.id, user.email);
        }
    }, [user, fetchProfile]);

    const value = useMemo(
        () => ({
            user,
            session,
            profile,
            loading,
            isConfigured,
            sendOtp,
            verifyOtp,
            signInWithPassword,
            signOut,
            updateProfile,
            refreshProfile,
        }),
        [
            user,
            session,
            profile,
            loading,
            isConfigured,
            sendOtp,
            verifyOtp,
            signInWithPassword,
            signOut,
            updateProfile,
            refreshProfile,
        ]
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
