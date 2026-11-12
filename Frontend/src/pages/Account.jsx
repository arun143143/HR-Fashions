import { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PageIntro from '../components/ui/PageIntro';
import useDocumentMeta from '../hooks/useDocumentMeta';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';
import { User, LogOut, ShieldCheck, Check } from '../components/ui/Icons';

const inputClass =
    'w-full bg-black-950 border border-white/25 text-white px-4 py-3 transition-colors hover:border-white/50 focus:border-gold-300 text-sm';
const labelClass = 'block font-bold text-white mb-2 text-xs uppercase tracking-wider text-black-300';

const statusColors = {
    new: 'border-gold-500/50 bg-gold-500/10 text-gold-300',
    contacted: 'border-blue-500/50 bg-blue-500/10 text-blue-300',
    stitching: 'border-purple-500/50 bg-purple-500/10 text-purple-300',
    ready: 'border-emerald-500/50 bg-emerald-500/10 text-emerald-300',
    delivered: 'border-white/20 bg-white/5 text-white/70',
};

const Account = () => {
    useDocumentMeta('My Account', 'Manage your HR Fashions tailoring profile, update contact numbers, and view appointments.');

    const { user, profile, updateProfile, signOut } = useAuth();
    const navigate = useNavigate();

    const [name, setName] = useState(profile?.name || '');
    const [phone, setPhone] = useState(profile?.phone || '');
    const [savingProfile, setSavingProfile] = useState(false);
    const [profileFeedback, setProfileFeedback] = useState({ type: '', message: '' });

    const [bookings, setBookings] = useState([]);
    const [loadingBookings, setLoadingBookings] = useState(true);

    // Sync state when profile loads/updates
    useEffect(() => {
        if (profile) {
            setName(profile.name || '');
            setPhone(profile.phone || '');
        }
    }, [profile]);

    const fetchMyBookings = useCallback(async () => {
        if (!supabase || !user) {
            setLoadingBookings(false);
            return;
        }

        try {
            const { data, error } = await supabase
                .from('bookings')
                .select('*')
                .eq('user_id', user.id)
                .order('created_at', { ascending: false });

            if (!error && data) {
                setBookings(data);
            }
        } catch {
            // Silently handle offline/mock
        } finally {
            setLoadingBookings(false);
        }
    }, [user]);

    useEffect(() => {
        fetchMyBookings();
    }, [fetchMyBookings]);

    const handleSaveProfile = async (e) => {
        e.preventDefault();
        setSavingProfile(true);
        setProfileFeedback({ type: '', message: '' });

        const { error } = await updateProfile({ name, phone });

        if (error) {
            setProfileFeedback({
                type: 'error',
                message: error.message || 'Failed to update profile.',
            });
        } else {
            setProfileFeedback({
                type: 'success',
                message: 'Your profile details have been updated successfully.',
            });
            setTimeout(() => setProfileFeedback({ type: '', message: '' }), 4000);
        }
        setSavingProfile(false);
    };

    const handleSignOut = async () => {
        await signOut();
        navigate('/', { replace: true });
    };

    const isAdmin = profile?.role === 'admin';

    return (
        <div className="bg-black-950 pb-20 md:pb-28">
            <PageIntro
                title="My Account"
                lead={`Signed in as ${user?.email || 'Customer'}. Manage your profile and check the status of your tailoring appointments.`}
            />

            <div className="container mx-auto px-6 max-w-5xl">
                {/* Admin Quick Banner */}
                {isAdmin && (
                    <div className="mb-10 p-5 border border-gold-500/50 bg-black-900 flex flex-col sm:flex-row justify-between items-center gap-4">
                        <div className="flex items-center gap-3">
                            <ShieldCheck size={28} className="text-gold-400 shrink-0" />
                            <div>
                                <h3 className="font-serif font-bold text-white text-lg">Shop Administrator</h3>
                                <p className="text-black-300 text-xs">
                                    You have full management access over all customer bookings, services, and shop content.
                                </p>
                            </div>
                        </div>
                        <Link to="/admin" className="btn-gold !py-2.5 !px-5 text-sm whitespace-nowrap">
                            Open Admin Portal
                        </Link>
                    </div>
                )}

                <div className="grid gap-10 lg:grid-cols-12">
                    {/* Left Column: Profile Card & Edit Form */}
                    <div className="lg:col-span-5 space-y-6">
                        <div className="zari-frame bg-black-900 p-6 md:p-8">
                            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 bg-black-950 border border-gold-500/40 rounded-full flex items-center justify-center text-gold-400">
                                        <User size={22} />
                                    </div>
                                    <div>
                                        <h2 className="font-serif font-semibold text-lg text-white">
                                            {profile?.name || 'Customer'}
                                        </h2>
                                        <span className="inline-block uppercase tracking-wider text-[10px] font-bold px-2 py-0.5 rounded border border-gold-500/30 text-gold-400 bg-gold-950/30">
                                            {profile?.role || 'customer'}
                                        </span>
                                    </div>
                                </div>
                                <button
                                    type="button"
                                    onClick={handleSignOut}
                                    title="Sign out"
                                    className="p-2 text-black-300 hover:text-gold-300 transition-colors"
                                    aria-label="Sign out"
                                >
                                    <LogOut size={20} />
                                </button>
                            </div>

                            <form onSubmit={handleSaveProfile} className="space-y-4">
                                {profileFeedback.message && (
                                    <div
                                        className={`p-3 text-xs border ${
                                            profileFeedback.type === 'error'
                                                ? 'border-red-500/40 bg-red-950/20 text-red-300'
                                                : 'border-emerald-500/40 bg-emerald-950/20 text-emerald-300 flex items-center gap-2'
                                        }`}
                                    >
                                        {profileFeedback.type === 'success' && <Check size={14} />}
                                        {profileFeedback.message}
                                    </div>
                                )}

                                <div>
                                    <label htmlFor="account-email" className={labelClass}>
                                        Email
                                    </label>
                                    <input
                                        id="account-email"
                                        type="email"
                                        disabled
                                        value={user?.email || ''}
                                        className={`${inputClass} opacity-60 cursor-not-allowed`}
                                    />
                                </div>

                                <div>
                                    <label htmlFor="account-name" className={labelClass}>
                                        Full Name
                                    </label>
                                    <input
                                        id="account-name"
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className={inputClass}
                                        placeholder="e.g. Priya Sharma"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="account-phone" className={labelClass}>
                                        Contact Phone
                                    </label>
                                    <input
                                        id="account-phone"
                                        type="tel"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        className={inputClass}
                                        placeholder="+91 98765 43210"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={savingProfile}
                                    className="btn-gold w-full text-center !py-2.5 text-sm disabled:opacity-50 mt-4"
                                >
                                    {savingProfile ? 'Saving...' : 'Update Details'}
                                </button>
                            </form>
                        </div>

                        <button
                            type="button"
                            onClick={handleSignOut}
                            className="btn-outline-gold w-full text-center !py-2.5 text-sm flex items-center justify-center gap-2"
                        >
                            <LogOut size={16} /> Sign out of account
                        </button>
                    </div>

                    {/* Right Column: Bookings & Activity */}
                    <div className="lg:col-span-7">
                        <div className="zari-frame bg-black-900 p-6 md:p-8">
                            <div className="flex justify-between items-center mb-6 pb-4 border-b border-white/10">
                                <div>
                                    <h2 className="font-serif font-semibold text-xl text-white">My Appointments</h2>
                                    <p className="text-black-300 text-xs mt-1">
                                        Track the status of your bespoke stitching orders.
                                    </p>
                                </div>
                                <Link to="/book-appointment" className="btn-gold !py-2 !px-4 text-xs font-bold">
                                    New Booking
                                </Link>
                            </div>

                            {loadingBookings ? (
                                <div className="py-12 text-center" role="status">
                                    <div className="w-8 h-8 mx-auto border-2 border-gold-500/30 border-t-gold-500 rounded-full animate-spin" />
                                    <p className="text-black-300 text-xs mt-3">Loading orders...</p>
                                </div>
                            ) : bookings.length === 0 ? (
                                <div className="py-12 px-4 text-center border border-dashed border-white/15">
                                    <p className="text-black-200 text-sm mb-4">You have no stitching bookings yet.</p>
                                    <Link to="/book-appointment" className="text-gold-300 text-sm link-stitch hover:text-white font-bold">
                                        Book your first appointment &rarr;
                                    </Link>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {bookings.map((booking) => (
                                        <div
                                            key={booking.id}
                                            className="p-4 bg-black-950 border border-white/10 hover:border-gold-500/30 transition-colors"
                                        >
                                            <div className="flex flex-wrap items-baseline justify-between gap-2 mb-2">
                                                <h3 className="font-serif font-semibold text-white text-base">
                                                    {booking.garment}
                                                </h3>
                                                <span
                                                    className={`text-xs px-2.5 py-0.5 font-bold uppercase tracking-wider border rounded-none ${
                                                        statusColors[booking.status] || 'border-white/20 text-white'
                                                    }`}
                                                >
                                                    {booking.status}
                                                </span>
                                            </div>

                                            <div className="text-xs text-black-300 space-y-1">
                                                {booking.preferred_date && (
                                                    <p>
                                                        Preferred date:{' '}
                                                        <span className="text-white">
                                                            {new Date(booking.preferred_date).toLocaleDateString('en-IN', {
                                                                year: 'numeric',
                                                                month: 'short',
                                                                day: 'numeric',
                                                            })}
                                                        </span>
                                                    </p>
                                                )}
                                                {booking.notes && (
                                                    <p className="text-black-200 italic mt-1">"{booking.notes}"</p>
                                                )}
                                                <p className="text-[11px] text-black-400 pt-1">
                                                    Requested on {new Date(booking.created_at).toLocaleDateString('en-IN')}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Account;
