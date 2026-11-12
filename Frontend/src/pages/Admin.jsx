import { useState, useEffect, useCallback, useMemo } from 'react';
import PageIntro from '../components/ui/PageIntro';
import useDocumentMeta from '../hooks/useDocumentMeta';
import { supabase } from '../lib/supabase';

const BOOKING_STATUSES = ['all', 'new', 'contacted', 'stitching', 'ready', 'delivered'];

const statusBadgeStyles = {
    new: 'border-gold-500/50 bg-gold-500/10 text-gold-300',
    contacted: 'border-blue-500/50 bg-blue-500/10 text-blue-300',
    stitching: 'border-purple-500/50 bg-purple-500/10 text-purple-300',
    ready: 'border-emerald-500/50 bg-emerald-500/10 text-emerald-300',
    delivered: 'border-white/20 bg-white/5 text-white/70',
};

const Admin = () => {
    useDocumentMeta('Shop Administration', 'Administer customer bookings, status transitions, and tailoring orders.');

    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filterStatus, setFilterStatus] = useState('all');
    const [updatingId, setUpdatingId] = useState(null);
    const [feedback, setFeedback] = useState({ type: '', message: '' });

    const fetchAllBookings = useCallback(async () => {
        if (!supabase) {
            setLoading(false);
            return;
        }

        try {
            const { data, error } = await supabase
                .from('bookings')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) {
                setFeedback({ type: 'error', message: error.message });
            } else if (data) {
                setBookings(data);
            }
        } catch (err) {
            setFeedback({ type: 'error', message: err.message || 'Failed to fetch bookings.' });
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchAllBookings();
    }, [fetchAllBookings]);

    const handleStatusChange = async (bookingId, newStatus) => {
        if (!supabase) return;
        setUpdatingId(bookingId);
        setFeedback({ type: '', message: '' });

        try {
            const { error } = await supabase
                .from('bookings')
                .update({ status: newStatus })
                .eq('id', bookingId);

            if (error) {
                setFeedback({ type: 'error', message: error.message || 'Failed to update status.' });
            } else {
                setBookings((prev) =>
                    prev.map((b) => (b.id === bookingId ? { ...b, status: newStatus } : b))
                );
                setFeedback({ type: 'success', message: `Booking #${bookingId} updated to ${newStatus}.` });
                setTimeout(() => setFeedback({ type: '', message: '' }), 3000);
            }
        } catch (err) {
            setFeedback({ type: 'error', message: err.message || 'Failed to update status.' });
        } finally {
            setUpdatingId(null);
        }
    };

    const filteredBookings = useMemo(() => {
        if (filterStatus === 'all') return bookings;
        return bookings.filter((b) => b.status === filterStatus);
    }, [bookings, filterStatus]);

    const counts = useMemo(() => {
        const c = { all: bookings.length, new: 0, contacted: 0, stitching: 0, ready: 0, delivered: 0 };
        bookings.forEach((b) => {
            if (c[b.status] !== undefined) c[b.status] += 1;
        });
        return c;
    }, [bookings]);

    return (
        <div className="bg-black-950 pb-20 md:pb-28">
            <PageIntro
                title="Shop Administration"
                lead="Manage customer stitching requests, follow up with measurements, and track garments from cut to delivery."
            />

            <div className="container mx-auto px-6 max-w-6xl">
                {/* Stats Row */}
                <div className="grid grid-cols-2 md:grid-cols-6 gap-3 mb-8">
                    {BOOKING_STATUSES.map((status) => (
                        <button
                            key={status}
                            type="button"
                            onClick={() => setFilterStatus(status)}
                            className={`p-4 border text-left transition-colors ${
                                filterStatus === status
                                    ? 'border-gold-500 bg-gold-500/10'
                                    : 'border-white/10 bg-black-900 hover:border-white/30'
                            }`}
                        >
                            <span className="block text-xs uppercase tracking-wider text-black-300 font-bold mb-1">
                                {status}
                            </span>
                            <span className="font-serif text-2xl font-bold text-white">
                                {counts[status] ?? 0}
                            </span>
                        </button>
                    ))}
                </div>

                {feedback.message && (
                    <div
                        className={`mb-6 p-4 border text-sm flex items-center justify-between ${
                            feedback.type === 'error'
                                ? 'border-red-500/40 bg-red-950/20 text-red-300'
                                : 'border-emerald-500/40 bg-emerald-950/20 text-emerald-300'
                        }`}
                    >
                        <span>{feedback.message}</span>
                        <button
                            type="button"
                            onClick={() => setFeedback({ type: '', message: '' })}
                            className="text-xs uppercase hover:underline ml-4"
                        >
                            Dismiss
                        </button>
                    </div>
                )}

                {/* Bookings Management Table */}
                <div className="zari-frame bg-black-900 p-6 md:p-8">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 pb-4 border-b border-white/10">
                        <div>
                            <h2 className="font-serif font-semibold text-xl text-white">
                                Customer Bookings ({filteredBookings.length})
                            </h2>
                            <p className="text-black-300 text-xs mt-1">
                                Update garment statuses as they progress through tailoring stages.
                            </p>
                        </div>
                        <button
                            type="button"
                            onClick={fetchAllBookings}
                            disabled={loading}
                            className="btn-outline-gold !py-2 !px-4 text-xs font-bold"
                        >
                            {loading ? 'Refreshing...' : 'Refresh List'}
                        </button>
                    </div>

                    {loading ? (
                        <div className="py-16 text-center" role="status">
                            <div className="w-8 h-8 mx-auto border-2 border-gold-500/30 border-t-gold-500 rounded-full animate-spin" />
                            <p className="text-black-300 text-xs mt-3">Loading shop orders...</p>
                        </div>
                    ) : filteredBookings.length === 0 ? (
                        <div className="py-16 px-4 text-center border border-dashed border-white/15">
                            <p className="text-black-200 text-sm">
                                No bookings found for status &ldquo;{filterStatus}&rdquo;.
                            </p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {filteredBookings.map((b) => (
                                <div
                                    key={b.id}
                                    className="p-5 bg-black-950 border border-white/10 flex flex-col lg:flex-row lg:items-center justify-between gap-6 hover:border-gold-500/30 transition-colors"
                                >
                                    <div className="space-y-1.5 flex-1">
                                        <div className="flex flex-wrap items-center gap-3">
                                            <span className="font-mono text-xs text-gold-400 font-bold">
                                                #{b.id}
                                            </span>
                                            <h3 className="font-serif font-semibold text-lg text-white">
                                                {b.garment}
                                            </h3>
                                            <span
                                                className={`text-xs px-2.5 py-0.5 font-bold uppercase tracking-wider border ${
                                                    statusBadgeStyles[b.status] || 'border-white/20 text-white'
                                                }`}
                                            >
                                                {b.status}
                                            </span>
                                        </div>

                                        <div className="flex flex-wrap gap-x-6 gap-y-1 text-xs text-black-300 pt-1">
                                            <span>
                                                Customer: <strong className="text-white">{b.name}</strong>
                                            </span>
                                            <span>
                                                Phone:{' '}
                                                <a
                                                    href={`tel:${b.phone}`}
                                                    className="text-gold-300 hover:underline font-mono"
                                                >
                                                    {b.phone}
                                                </a>
                                            </span>
                                            {b.area && <span>Area: {b.area}</span>}
                                            {b.preferred_date && (
                                                <span>
                                                    Preferred Date:{' '}
                                                    <span className="text-white">
                                                        {new Date(b.preferred_date).toLocaleDateString('en-IN', {
                                                            month: 'short',
                                                            day: 'numeric',
                                                            year: 'numeric',
                                                        })}
                                                    </span>
                                                </span>
                                            )}
                                        </div>

                                        {b.notes && (
                                            <p className="text-xs text-black-200 italic pt-1 bg-black-900/60 p-2.5 border-l-2 border-gold-500/40">
                                                &ldquo;{b.notes}&rdquo;
                                            </p>
                                        )}

                                        <p className="text-[11px] text-black-400">
                                            Received {new Date(b.created_at).toLocaleString('en-IN')}
                                        </p>
                                    </div>

                                    {/* Action dropdown */}
                                    <div className="flex items-center gap-3 shrink-0">
                                        <label htmlFor={`status-select-${b.id}`} className="text-xs text-black-300">
                                            Status:
                                        </label>
                                        <select
                                            id={`status-select-${b.id}`}
                                            value={b.status}
                                            disabled={updatingId === b.id}
                                            onChange={(e) => handleStatusChange(b.id, e.target.value)}
                                            className="bg-black-900 border border-gold-500/50 text-white px-3 py-2 text-xs font-bold focus:border-gold-300 cursor-pointer disabled:opacity-50"
                                        >
                                            <option value="new">new</option>
                                            <option value="contacted">contacted</option>
                                            <option value="stitching">stitching</option>
                                            <option value="ready">ready</option>
                                            <option value="delivered">delivered</option>
                                        </select>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Admin;
