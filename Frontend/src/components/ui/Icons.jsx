// HR Fashions icon set. Drawn for this site: 24px grid, 1.5px line, round ends, in the current text colour.
// Tailoring icons (needle, tape measure, dress form, calendar) carry the running-stitch motif as a dashed line.
// Icons are decorative by default (hidden from screen readers). Pass `title` when an icon is the only label.

const Svg = ({ size = 24, strokeWidth = 1.5, title, className = '', children, ...rest }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width={size}
        height={size}
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        focusable="false"
        className={className}
        {...(title ? { role: 'img' } : { 'aria-hidden': true })}
        {...rest}
    >
        {title && <title>{title}</title>}
        {children}
    </svg>
);

// ---- Tailoring --------------------------------------------------------------------------

export const Needle = (p) => (
    <Svg {...p}>
        <path d="M4.5 19.5 17.2 6.8" />
        <path d="M17.2 6.8 19.6 4.4a1.1 1.1 0 0 0-1.6-1.6L15.6 5.2" />
        <path d="M18.6 4.8c-2.5 3.6-6.5 1.2-9 4.6s-3.6 6.3-6.1 6.6" strokeDasharray="1.6 2" />
    </Svg>
);

export const TapeMeasure = (p) => (
    <Svg {...p}>
        <circle cx="9" cy="11" r="6" />
        <circle cx="9" cy="11" r="1.6" />
        <path d="M9 17h12v-3.5h-6.2" />
        <path d="M18 17v-1.6M15 17v-1.6M12 17v-1.6" />
    </Svg>
);

export const DressForm = (p) => (
    <Svg {...p}>
        <path d="M9 3.5h6c0 1.8-.9 2.8-.9 4.2 0 1.9 2.9 2.9 2.9 6.6v.7H7v-.7c0-3.7 2.9-4.7 2.9-6.6 0-1.4-.9-2.4-.9-4.2Z" />
        <path d="M8.2 9.6h7.6" strokeDasharray="1.4 1.6" />
        <path d="M12 15v5M8.5 20.5h7" />
    </Svg>
);

export const CalendarStitch = (p) => (
    <Svg {...p}>
        <rect x="4" y="5" width="16" height="15" rx="1.5" />
        <path d="M8.5 3v4M15.5 3v4M4 10h16" />
        <path d="M7.5 15h9" strokeDasharray="2 2" />
    </Svg>
);

// A small zari diamond, used as a list bullet.
export const Diamond = (p) => (
    <Svg {...p}>
        <path d="M12 4.5 17 12l-5 7.5L7 12Z" />
    </Svg>
);

// ---- Contact ---------------------------------------------------------------------------

export const Phone = (p) => (
    <Svg {...p}>
        <path d="M6.2 3.8h2.6l1.7 4.3-2.1 1.4a10.4 10.4 0 0 0 6.1 6.1l1.4-2.1 4.3 1.7v2.6a1.9 1.9 0 0 1-2 1.9C10.6 19.2 4.8 13.4 4.3 5.8a1.9 1.9 0 0 1 1.9-2Z" />
    </Svg>
);

export const Mail = (p) => (
    <Svg {...p}>
        <rect x="3.5" y="5.5" width="17" height="13" rx="1.5" />
        <path d="m4 7 8 6 8-6" />
    </Svg>
);

export const MapPin = (p) => (
    <Svg {...p}>
        <path d="M12 21s-6.2-5.6-6.2-11.1a6.2 6.2 0 0 1 12.4 0C18.2 15.4 12 21 12 21Z" />
        <circle cx="12" cy="9.9" r="2.1" />
    </Svg>
);

export const Clock = (p) => (
    <Svg {...p}>
        <circle cx="12" cy="12" r="8.5" />
        <path d="M12 7.5V12l3 2" />
    </Svg>
);

export const Chat = (p) => (
    <Svg {...p}>
        <path d="M4.5 5.5h15a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H10l-4.5 3.5V16.5h-1a1 1 0 0 1-1-1v-9a1 1 0 0 1 1-1Z" />
        <path d="M8.5 11h.01M12 11h.01M15.5 11h.01" strokeWidth="2.4" />
    </Svg>
);

export const Instagram = (p) => (
    <Svg {...p}>
        <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
        <circle cx="12" cy="12" r="3.8" />
        <path d="M17 7h.01" strokeWidth="2.4" />
    </Svg>
);

export const Facebook = (p) => (
    <Svg {...p}>
        <path d="M14 20.5v-7.5h2.6l.4-3.2h-3V7.9c0-.9.3-1.6 1.6-1.6h1.6V3.5a20 20 0 0 0-2.4-.1c-2.4 0-4 1.4-4 4.1v2.3H8.2V13h2.6v7.5" />
    </Svg>
);

// ---- Interface -------------------------------------------------------------------------

// Two lines of different length: a menu, cut like a hem.
export const Menu = (p) => (
    <Svg {...p}>
        <path d="M4 8.5h16M4 15.5h10" />
    </Svg>
);

export const X = (p) => (
    <Svg {...p}>
        <path d="M6 6l12 12M18 6 6 18" />
    </Svg>
);

export const ChevronDown = (p) => (
    <Svg {...p}>
        <path d="m6 9.5 6 6 6-6" />
    </Svg>
);

export const ChevronLeft = (p) => (
    <Svg {...p}>
        <path d="M14.5 6 8.5 12l6 6" />
    </Svg>
);

export const ChevronRight = (p) => (
    <Svg {...p}>
        <path d="m9.5 6 6 6-6 6" />
    </Svg>
);

// ---- Account & Auth --------------------------------------------------------------------

export const User = (p) => (
    <Svg {...p}>
        <circle cx="12" cy="8" r="4" />
        <path d="M5.5 20a6.5 6.5 0 0 1 13 0" />
    </Svg>
);

export const Lock = (p) => (
    <Svg {...p}>
        <rect x="5" y="11" width="14" height="10" rx="1.5" />
        <path d="M8 11V7a4 4 0 0 1 8 0v4" />
    </Svg>
);

export const LogOut = (p) => (
    <Svg {...p}>
        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
        <path d="m16 17 5-5-5-5M21 12H9" />
    </Svg>
);

export const ShieldCheck = (p) => (
    <Svg {...p}>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
        <path d="m9 12 2 2 4-4" />
    </Svg>
);

export const Check = (p) => (
    <Svg {...p}>
        <path d="m5 13 4 4L19 7" />
    </Svg>
);

