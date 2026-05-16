import { useState, useEffect, useRef } from "react";

/* ─────────────────────────────────────────────
   CONFIG — غيّر هنا فقط
───────────────────────────────────────────── */
// صورة Kimou الشخصية
const AVATAR_URL = "https://i.ibb.co/wZ8jDq4H/IMG-20260503-013608-936.webp";

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */
const SOCIALS = [
  {
    id: "instagram",
    label: "Instagram",
    handle: "@kimou_bfk",
    url: "https://www.instagram.com/kimou_bfk?igsh=a3dtY3VndXQ1ZzBo",
    color: "#E1306C",
    colorB: "#F77737",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
  },
  {
    id: "tiktok",
    label: "TikTok",
    handle: "@kimou",
    url: "#",
    color: "#010101",
    colorB: "#69C9D0",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.77a4.85 4.85 0 01-1.01-.08z" />
      </svg>
    ),
    soon: true,
  },
  {
    id: "facebook",
    label: "Facebook",
    handle: "Akram Bouferrouk",
    url: "https://www.facebook.com/akram.bouferrouk.3",
    color: "#1877F2",
    colorB: "#42A5F5",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    id: "twitter",
    label: "Twitter / X",
    handle: "@KBouferroukk",
    url: "https://x.com/KBouferroukk",
    color: "#000000",
    colorB: "#555555",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    id: "store",
    label: "المتجر",
    handle: "The Empire DZ",
    url: "https://the-empire-dz.vercel.app/",
    color: "#D4AF37",
    colorB: "#F5E6A3",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M2 6h19.418l-1.583 9.5A2 2 0 0117.853 17H6.147a2 2 0 01-1.982-1.5L2 6zM1 3h2.5l.5 2H22l-2 12a4 4 0 01-3.961 3.5H6a4 4 0 01-3.961-3.5L1 3zM9 20a1.5 1.5 0 110 3 1.5 1.5 0 010-3zm6 0a1.5 1.5 0 110 3 1.5 1.5 0 010-3z" />
      </svg>
    ),
    featured: true,
  },
];

/* ─────────────────────────────────────────────
   ANIMATED CURSOR GLOW
───────────────────────────────────────────── */
function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const move = (e: MouseEvent) => {
      if (ref.current) {
        ref.current.style.left = e.clientX + "px";
        ref.current.style.top = e.clientY + "px";
      }
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);
  return (
    <div
      ref={ref}
      className="pointer-events-none fixed z-0 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full"
      style={{
        background: "radial-gradient(circle, rgba(212,175,55,0.06) 0%, transparent 70%)",
        transition: "left 0.15s ease, top 0.15s ease",
      }}
    />
  );
}

/* ─────────────────────────────────────────────
   NOISE OVERLAY
───────────────────────────────────────────── */
function Noise() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 opacity-[0.03]"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        backgroundSize: "150px",
      }}
    />
  );
}

/* ─────────────────────────────────────────────
   SOCIAL CARD
───────────────────────────────────────────── */
function SocialCard({
  s,
  index,
}: {
  s: (typeof SOCIALS)[0];
  index: number;
}) {
  const [hovered, setHovered] = useState(false);
  const [ripple, setRipple] = useState(false);

  const handleClick = () => {
    setRipple(true);
    setTimeout(() => setRipple(false), 600);
  };

  const Wrapper = s.soon ? "div" : "a";
  const wrapperProps = s.soon
    ? { style: { cursor: "default" } }
    : {
        href: s.url,
        target: "_blank" as const,
        rel: "noopener noreferrer",
        onClick: handleClick,
        style: { textDecoration: "none", display: "block" },
      };

  return (
    <Wrapper
      {...(wrapperProps as any)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative group overflow-hidden block"
      style={{
        ...(wrapperProps as any).style,
        animationDelay: `${index * 0.1}s`,
      }}
    >
      {/* Card shell */}
      <div
        className="relative flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-500 overflow-hidden"
        style={{
          background: hovered
            ? `linear-gradient(135deg, ${s.color}18, ${s.colorB}10)`
            : "rgba(255,255,255,0.03)",
          border: `1px solid ${hovered ? s.color + "55" : "rgba(255,255,255,0.07)"}`,
          transform: hovered ? "translateY(-2px) scale(1.01)" : "scale(1)",
          boxShadow: hovered
            ? `0 8px 40px ${s.color}22, 0 2px 8px rgba(0,0,0,0.4)`
            : "0 2px 8px rgba(0,0,0,0.3)",
        }}
      >
        {/* Left accent line */}
        <div
          className="absolute left-0 top-0 bottom-0 w-0.5 rounded-full transition-all duration-500"
          style={{
            background: `linear-gradient(to bottom, ${s.color}, ${s.colorB})`,
            opacity: hovered ? 1 : 0,
          }}
        />

        {/* Icon bubble */}
        <div
          className="relative flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-500"
          style={{
            background: hovered
              ? `linear-gradient(135deg, ${s.color}, ${s.colorB})`
              : `${s.color}20`,
            color: hovered ? "#fff" : s.color,
            boxShadow: hovered ? `0 4px 20px ${s.color}55` : "none",
          }}
        >
          {s.icon}
        </div>

        {/* Text */}
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span
              className="font-semibold text-sm transition-colors duration-300"
              style={{
                color: hovered ? "#fff" : "rgba(255,255,255,0.85)",
                fontFamily: "Space Grotesk, sans-serif",
              }}
            >
              {s.label}
            </span>
            {s.soon && (
              <span
                className="text-[10px] px-2 py-0.5 rounded-full font-medium"
                style={{
                  background: "rgba(212,175,55,0.15)",
                  color: "#D4AF37",
                  border: "1px solid rgba(212,175,55,0.3)",
                }}
              >
                قريباً
              </span>
            )}
            {s.featured && (
              <span
                className="text-[10px] px-2 py-0.5 rounded-full font-medium"
                style={{
                  background: "rgba(212,175,55,0.15)",
                  color: "#D4AF37",
                  border: "1px solid rgba(212,175,55,0.3)",
                }}
              >
                ✦ مميز
              </span>
            )}
          </div>
          <p
            className="text-xs mt-0.5 transition-colors duration-300"
            style={{
              color: hovered ? s.color : "rgba(255,255,255,0.35)",
              fontFamily: "Space Grotesk, sans-serif",
            }}
          >
            {s.handle}
          </p>
        </div>

        {/* Arrow */}
        {!s.soon && (
          <div
            className="flex-shrink-0 transition-all duration-300"
            style={{
              color: hovered ? s.color : "rgba(255,255,255,0.2)",
              transform: hovered ? "translateX(2px)" : "translateX(0)",
            }}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
              />
            </svg>
          </div>
        )}

        {/* Ripple */}
        {ripple && (
          <div
            className="absolute inset-0 rounded-2xl"
            style={{
              background: `radial-gradient(circle at center, ${s.color}30, transparent)`,
              animation: "rippleOut 0.6s ease-out forwards",
            }}
          />
        )}
      </div>
    </Wrapper>
  );
}

/* ─────────────────────────────────────────────
   AVATAR RING
───────────────────────────────────────────── */
function AvatarRing() {
  const [angle, setAngle] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setAngle((a) => (a + 0.5) % 360), 16);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="relative w-28 h-28 mx-auto mb-5">
      {/* Spinning gradient ring */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 112 112"
        style={{ transform: `rotate(${angle}deg)` }}
      >
        <defs>
          <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#D4AF37" />
            <stop offset="40%" stopColor="#8b5cf6" />
            <stop offset="80%" stopColor="#E1306C" />
            <stop offset="100%" stopColor="#D4AF37" />
          </linearGradient>
        </defs>
        <circle
          cx="56"
          cy="56"
          r="53"
          fill="none"
          stroke="url(#ringGrad)"
          strokeWidth="2.5"
          strokeDasharray="280 60"
          strokeLinecap="round"
        />
      </svg>

      {/* Avatar */}
      <div className="absolute inset-1.5 rounded-full overflow-hidden bg-gray-900 border border-white/5">
        <img
                    src={AVATAR_URL}
                    alt="Kimou"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "/images/avatar.png";
                    }}
                  />
      </div>

      {/* Online dot */}
      <div className="absolute bottom-1 right-1 w-4 h-4 rounded-full bg-emerald-400 border-2 border-gray-950 shadow-lg shadow-emerald-400/60" />
    </div>
  );
}

/* ─────────────────────────────────────────────
   FOLLOW POPUP
───────────────────────────────────────────── */
function FollowPopup({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Sheet */}
      <div
        className="relative w-full max-w-sm rounded-3xl p-7 text-center z-10"
        style={{
          background: "linear-gradient(160deg, #141414 0%, #0d0d0d 100%)",
          border: "1px solid rgba(212,175,55,0.25)",
          boxShadow: "0 0 80px rgba(212,175,55,0.08), 0 40px 80px rgba(0,0,0,0.8)",
          animation: "slideUp 0.45s cubic-bezier(0.34,1.56,0.64,1) forwards",
        }}
      >
        {/* Gold line top */}
        <div
          className="absolute top-0 left-8 right-8 h-px rounded-full"
          style={{ background: "linear-gradient(to right, transparent, #D4AF37, transparent)" }}
        />

        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/30 hover:text-white/80 transition-colors"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="w-14 h-14 mx-auto mb-4 rounded-2xl flex items-center justify-center text-2xl"
          style={{ background: "linear-gradient(135deg, #E1306C22, #F7773722)", border: "1px solid #E1306C33" }}>
          👋
        </div>

        <p
          className="text-xs uppercase tracking-[0.2em] mb-2"
          style={{ color: "#D4AF37", fontFamily: "Space Grotesk, sans-serif" }}
        >
          مرحباً بك
        </p>
        <h2
          className="text-xl font-bold text-white mb-3"
          style={{ fontFamily: "Playfair Display, serif" }}
        >
          لا تفوّت أي جديد
        </h2>
        <p className="text-white/40 text-sm mb-6 leading-relaxed" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
          تابعني على إنستغرام للحصول على أحدث المحتوى والعروض الحصرية
        </p>

        <a
          href="https://www.instagram.com/kimou_bfk?igsh=a3dtY3VndXQ1ZzBo"
          target="_blank"
          rel="noopener noreferrer"
          onClick={onClose}
          className="flex items-center justify-center gap-3 w-full py-3.5 rounded-2xl font-semibold text-white text-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
          style={{
            background: "linear-gradient(135deg, #E1306C, #F77737)",
            boxShadow: "0 4px 20px rgba(225,48,108,0.35)",
            fontFamily: "Space Grotesk, sans-serif",
          }}
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
          </svg>
          تابع الآن على إنستغرام
        </a>

        <button
          onClick={onClose}
          className="mt-3 w-full py-2.5 text-white/25 text-xs hover:text-white/50 transition-colors"
          style={{ fontFamily: "Space Grotesk, sans-serif" }}
        >
          ربما لاحقاً
        </button>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   MAIN APP
───────────────────────────────────────────── */
export default function App() {
  const [popup, setPopup] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // entrance animation
    const t1 = setTimeout(() => setVisible(true), 100);
    // popup after 3s
    const t2 = setTimeout(() => setPopup(true), 3000);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  return (
    <div
      className="min-h-screen w-full relative flex flex-col items-center justify-center px-4 py-14 overflow-hidden"
      style={{ background: "#090909" }}
    >
      {/* Background image subtle */}
      <div
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: "url('/images/bg.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.04,
        }}
      />

      {/* Grid overlay */}
      <div
        className="fixed inset-0 z-0 opacity-[0.025]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Gold radial glow top-center */}
      <div
        className="fixed top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] pointer-events-none z-0"
        style={{
          background: "radial-gradient(ellipse at top, rgba(212,175,55,0.07) 0%, transparent 70%)",
        }}
      />

      <CursorGlow />
      <Noise />

      {/* ── CONTENT ── */}
      <div
        className="relative z-10 w-full max-w-[380px] transition-all duration-700"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(24px)",
        }}
      >
        {/* ─── HEADER ─── */}
        <div className="text-center mb-8">
          <AvatarRing />

          {/* Name */}
          <h1
            className="text-3xl font-bold tracking-wide text-white mb-1"
            style={{ fontFamily: "Playfair Display, serif" }}
          >
            Kimou
          </h1>

          {/* Gold divider */}
          <div className="flex items-center justify-center gap-3 my-3">
            <div className="h-px w-12" style={{ background: "linear-gradient(to right, transparent, #D4AF37)" }} />
            <span style={{ color: "#D4AF37", fontSize: 10, letterSpacing: "0.25em", fontFamily: "Space Grotesk" }}>
              THE EMPIRE DZ
            </span>
            <div className="h-px w-12" style={{ background: "linear-gradient(to left, transparent, #D4AF37)" }} />
          </div>

          {/* Tags */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-3">
            {["🇩🇿 الجزائر", "Content Creator", "E-Commerce"].map((tag) => (
              <span
                key={tag}
                className="text-[11px] px-3 py-1 rounded-full"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  color: "rgba(255,255,255,0.5)",
                  fontFamily: "Space Grotesk, sans-serif",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* ─── SECTION LABEL ─── */}
        <p
          className="text-[10px] uppercase tracking-[0.3em] mb-4 text-center"
          style={{ color: "rgba(255,255,255,0.2)", fontFamily: "Space Grotesk, sans-serif" }}
        >
          تواصل معي
        </p>

        {/* ─── SOCIAL CARDS ─── */}
        <div className="flex flex-col gap-2.5">
          {SOCIALS.map((s, i) => (
            <SocialCard key={s.id} s={s} index={i} />
          ))}
        </div>

        {/* ─── FEATURED STORE BANNER ─── */}
        <a
          href="https://the-empire-dz.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="group relative mt-5 flex items-center gap-4 px-5 py-4 rounded-2xl overflow-hidden transition-all duration-500 hover:scale-[1.02] hover:-translate-y-0.5 block"
          style={{
            background: "linear-gradient(135deg, rgba(212,175,55,0.12) 0%, rgba(212,175,55,0.05) 100%)",
            border: "1px solid rgba(212,175,55,0.3)",
            boxShadow: "0 4px 30px rgba(212,175,55,0.08)",
          }}
        >
          {/* Shimmer */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
            style={{
              background: "linear-gradient(105deg, transparent 30%, rgba(212,175,55,0.08) 50%, transparent 70%)",
              animation: "shimmer 2s ease infinite",
            }}
          />

          <div
            className="flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center text-xl"
            style={{ background: "rgba(212,175,55,0.15)", border: "1px solid rgba(212,175,55,0.3)" }}
          >
            🛒
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-white" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
              زر متجري الإلكتروني
            </p>
            <p className="text-xs mt-0.5" style={{ color: "#D4AF37", fontFamily: "Space Grotesk, sans-serif" }}>
              the-empire-dz.vercel.app ✦
            </p>
          </div>
          <svg viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth={2} className="w-4 h-4 flex-shrink-0 group-hover:translate-x-1 transition-transform">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
        </a>

        {/* ─── FOOTER ─── */}
        <div className="text-center mt-8">
          <div className="h-px w-32 mx-auto mb-4" style={{ background: "linear-gradient(to right, transparent, rgba(255,255,255,0.08), transparent)" }} />
          <p className="text-[11px]" style={{ color: "rgba(255,255,255,0.15)", fontFamily: "Space Grotesk, sans-serif" }}>
            © 2025 Kimou · The Empire DZ
          </p>
        </div>
      </div>

      {/* ── POPUP ── */}
      {popup && <FollowPopup onClose={() => setPopup(false)} />}

      {/* ── GLOBAL STYLES ── */}
      <style>{`
        @keyframes rippleOut {
          0% { opacity: 1; transform: scale(1); }
          100% { opacity: 0; transform: scale(1.05); }
        }
        @keyframes slideUp {
          0% { opacity: 0; transform: translateY(40px) scale(0.96); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        * { -webkit-tap-highlight-color: transparent; }
        ::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  );
}
