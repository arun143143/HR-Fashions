import { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import PageIntro from '../components/ui/PageIntro';
import useDocumentMeta from '../hooks/useDocumentMeta';
import { useAuth } from '../context/AuthContext';

const inputClass =
    'w-full bg-black-950 border border-white/25 text-white px-4 py-3.5 transition-colors hover:border-white/50 focus:border-gold-300';
const labelClass = 'block font-bold text-white mb-2 text-sm';

const Login = () => {
    useDocumentMeta(
        'Sign In',
        'Access your HR Fashions account to review orders, bookings, and profile details with a secure email verification code.'
    );

    const { user, sendOtp, verifyOtp, signInWithPassword, isConfigured } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const redirectPath = location.state?.from?.pathname || '/account';

    const [authMode, setAuthMode] = useState('otp'); // 'otp' | 'password'
    const [step, setStep] = useState('email'); // 'email' | 'verify'
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [password, setPassword] = useState('');

    const [submitting, setSubmitting] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const [infoMsg, setInfoMsg] = useState('');
    const [resendCooldown, setResendCooldown] = useState(0);

    // If user is already authenticated, redirect immediately
    useEffect(() => {
        if (user) {
            navigate(redirectPath, { replace: true });
        }
    }, [user, navigate, redirectPath]);

    // Resend countdown timer
    useEffect(() => {
        if (resendCooldown <= 0) return;
        const timer = setTimeout(() => setResendCooldown((prev) => prev - 1), 1000);
        return () => clearTimeout(timer);
    }, [resendCooldown]);

    const handleSendOtp = async (e) => {
        e.preventDefault();
        setErrorMsg('');
        setInfoMsg('');

        const cleanEmail = email.trim();
        if (!cleanEmail) {
            setErrorMsg('Please enter a valid email address.');
            return;
        }

        setSubmitting(true);
        try {
            const { error } = await sendOtp(cleanEmail);
            if (error) {
                setErrorMsg(error.message || 'Failed to send verification code. Please try again.');
            } else {
                setStep('verify');
                setResendCooldown(60);
                setInfoMsg(`We have sent a 6-digit login code to ${cleanEmail}. Enter it below to sign in.`);
            }
        } catch (err) {
            setErrorMsg(err.message || 'An unexpected error occurred.');
        } finally {
            setSubmitting(false);
        }
    };

    const handleVerifyOtp = async (e) => {
        e.preventDefault();
        setErrorMsg('');
        setInfoMsg('');

        const cleanOtp = otp.trim();
        if (!cleanOtp) {
            setErrorMsg('Please enter the 6-digit verification code.');
            return;
        }

        setSubmitting(true);
        try {
            const { error } = await verifyOtp(email.trim(), cleanOtp);
            if (error) {
                setErrorMsg(error.message || 'Invalid or expired code. Please request a new one.');
            } else {
                navigate(redirectPath, { replace: true });
            }
        } catch (err) {
            setErrorMsg(err.message || 'Failed to verify code.');
        } finally {
            setSubmitting(false);
        }
    };

    const handlePasswordLogin = async (e) => {
        e.preventDefault();
        setErrorMsg('');
        setInfoMsg('');

        setSubmitting(true);
        try {
            const { error } = await signInWithPassword(email.trim(), password);
            if (error) {
                setErrorMsg(error.message || 'Invalid email or password.');
            } else {
                navigate(redirectPath, { replace: true });
            }
        } catch (err) {
            setErrorMsg(err.message || 'Failed to sign in.');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="bg-black-950 pb-20 md:pb-28">
            <PageIntro
                title="Account sign in"
                lead="Sign in to view your bookings, update measurement contacts, or access administrator tailoring tools."
            />

            <div className="container mx-auto px-6 max-w-lg">
                {!isConfigured && (
                    <div className="mb-8 p-4 border border-gold-500/30 bg-black-900 text-sm text-gold-300">
                        Notice: Supabase environment credentials (<code className="text-white">VITE_SUPABASE_URL</code>) are not configured. The form below operates in offline demonstration mode.
                    </div>
                )}

                <div className="zari-frame bg-black-900 p-6 md:p-10">
                    {/* Method Tabs */}
                    <div className="flex border-b border-white/10 mb-8 pb-1">
                        <button
                            type="button"
                            onClick={() => {
                                setAuthMode('otp');
                                setErrorMsg('');
                                setInfoMsg('');
                            }}
                            className={`pb-3 px-4 font-bold text-sm transition-colors border-b-2 -mb-[5px] ${
                                authMode === 'otp'
                                    ? 'border-gold-500 text-gold-300'
                                    : 'border-transparent text-black-300 hover:text-white'
                            }`}
                        >
                            Email Code (OTP)
                        </button>
                        <button
                            type="button"
                            onClick={() => {
                                setAuthMode('password');
                                setErrorMsg('');
                                setInfoMsg('');
                            }}
                            className={`pb-3 px-4 font-bold text-sm transition-colors border-b-2 -mb-[5px] ${
                                authMode === 'password'
                                    ? 'border-gold-500 text-gold-300'
                                    : 'border-transparent text-black-300 hover:text-white'
                            }`}
                        >
                            Password
                        </button>
                    </div>

                    {/* Messages */}
                    {errorMsg && (
                        <div className="mb-6 p-4 border border-red-500/40 bg-red-950/20 text-red-300 text-sm">
                            {errorMsg}
                        </div>
                    )}
                    {infoMsg && (
                        <div className="mb-6 p-4 border border-gold-500/40 bg-gold-950/20 text-gold-200 text-sm">
                            {infoMsg}
                        </div>
                    )}

                    {authMode === 'otp' ? (
                        step === 'email' ? (
                            <form className="space-y-6" onSubmit={handleSendOtp}>
                                <div>
                                    <label htmlFor="login-email" className={labelClass}>
                                        Email address
                                    </label>
                                    <div className="relative">
                                        <input
                                            id="login-email"
                                            type="email"
                                            required
                                            autoComplete="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className={inputClass}
                                            placeholder="your.email@example.com"
                                        />
                                    </div>
                                    <p className="mt-2 text-xs text-black-300">
                                        We will send you a secure one-time 6-digit code. No password needed.
                                    </p>
                                </div>

                                <button
                                    type="submit"
                                    disabled={submitting}
                                    className="btn-gold w-full text-center disabled:opacity-50"
                                >
                                    {submitting ? 'Sending code...' : 'Send login code'}
                                </button>
                            </form>
                        ) : (
                            <form className="space-y-6" onSubmit={handleVerifyOtp}>
                                <div>
                                    <div className="flex justify-between items-baseline mb-2">
                                        <label htmlFor="login-otp" className={labelClass}>
                                            6-digit verification code
                                        </label>
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setStep('email');
                                                setErrorMsg('');
                                                setInfoMsg('');
                                            }}
                                            className="text-xs text-gold-400 hover:underline"
                                        >
                                            Change email
                                        </button>
                                    </div>
                                    <input
                                        id="login-otp"
                                        type="text"
                                        inputMode="numeric"
                                        pattern="[0-9]{6}"
                                        maxLength={6}
                                        required
                                        autoFocus
                                        value={otp}
                                        onChange={(e) => setOtp(e.target.value)}
                                        className={`${inputClass} tracking-widest text-center text-xl font-mono`}
                                        placeholder="123456"
                                    />
                                    <p className="mt-2 text-xs text-black-300">
                                        Sent to <span className="text-white font-medium">{email}</span>
                                    </p>
                                </div>

                                <button
                                    type="submit"
                                    disabled={submitting}
                                    className="btn-gold w-full text-center disabled:opacity-50"
                                >
                                    {submitting ? 'Verifying...' : 'Verify & sign in'}
                                </button>

                                <div className="text-center pt-2">
                                    <button
                                        type="button"
                                        disabled={resendCooldown > 0 || submitting}
                                        onClick={handleSendOtp}
                                        className="text-xs text-gold-300 hover:underline disabled:text-black-400 disabled:no-underline"
                                    >
                                        {resendCooldown > 0
                                            ? `Resend code in ${resendCooldown}s`
                                            : 'Resend verification code'}
                                    </button>
                                </div>
                            </form>
                        )
                    ) : (
                        <form className="space-y-6" onSubmit={handlePasswordLogin}>
                            <div>
                                <label htmlFor="pwd-email" className={labelClass}>
                                    Email address
                                </label>
                                <input
                                    id="pwd-email"
                                    type="email"
                                    required
                                    autoComplete="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className={inputClass}
                                    placeholder="your.email@example.com"
                                />
                            </div>

                            <div>
                                <label htmlFor="pwd-password" className={labelClass}>
                                    Password
                                </label>
                                <input
                                    id="pwd-password"
                                    type="password"
                                    required
                                    autoComplete="current-password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className={inputClass}
                                    placeholder="••••••••"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={submitting}
                                className="btn-gold w-full text-center disabled:opacity-50"
                            >
                                {submitting ? 'Signing in...' : 'Sign in'}
                            </button>
                        </form>
                    )}

                    <div className="mt-8 pt-6 border-t border-white/10 text-center text-xs text-black-300">
                        Need an appointment without an account?{' '}
                        <Link to="/book-appointment" className="text-gold-300 hover:underline">
                            Book an appointment directly
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
