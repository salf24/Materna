import React from 'react'

/**
 * MaternLogo – renders your custom SVG logo if present,
 * otherwise falls back to styled text logo.
 *
 * Props:
 *   variant  – "full" | "icon" | "light"  (light = white version for dark bg)
 *   height   – pixel height (width scales automatically)
 *   className – extra class names
 *
 * To use your own SVG:
 *   1. Drop materna-logo.svg (dark version) into src/assets/logo/
 *   2. Drop materna-logo-light.svg (white version) into src/assets/logo/
 *   3. Uncomment the import lines below and remove the fallback component
 */

// ── Uncomment these when you have your SVG files ready ──────────────
// import logoFull  from '../../assets/logo/materna-logo.svg'
// import logoLight from '../../assets/logo/materna-logo-light.svg'
// import logoIcon  from '../../assets/logo/materna-icon.svg'
// ─────────────────────────────────────────────────────────────────────

const FallbackLogo = ({ height = 40, light = false }) => {
  const textColor = light ? '#ffffff' : '#1B365D'
  const taglineColor = light ? 'rgba(255,255,255,0.5)' : '#9ca3af'
  const iconBg = '#E67E96'

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, height }}>
      {/* SVG Icon Mark */}
      <svg
        width={height}
        height={height}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ flexShrink: 0 }}
      >
        <circle cx="24" cy="24" r="22" fill={iconBg} opacity="0.15" />
        <path
          d="M24 34s-11-7.5-11-14a7 7 0 0 1 11-5.74A7 7 0 0 1 35 20c0 6.5-11 14-11 14z"
          fill={iconBg}
        />
        {/* ECG pulse line */}
        <path
          d="M14 22h4l2-4 3 8 2-4h9"
          stroke="white"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      {/* Wordmark */}
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <span style={{
          fontFamily: "'Poppins', sans-serif",
          fontWeight: 700,
          fontSize: height * 0.37,
          color: textColor,
          letterSpacing: '-0.3px',
          lineHeight: 1.1,
        }}>
          Materna
        </span>
        <span style={{
          fontFamily: "'Open Sans', sans-serif",
          fontWeight: 400,
          fontSize: height * 0.2,
          color: taglineColor,
          letterSpacing: '0.4px',
          lineHeight: 1,
        }}>
          Maternal Health
        </span>
      </div>
    </div>
  )
}

const MaternLogo = ({ variant = 'full', height = 40, className = '' }) => {
  const isLight = variant === 'light'
  const isIcon = variant === 'icon'

  // ── When you have your custom SVG, replace this block ────────────────
  // if (isIcon)  return <img src={logoIcon}  alt="Materna" height={height} className={className} />
  // if (isLight) return <img src={logoLight} alt="Materna" height={height} className={className} />
  // return        <img src={logoFull}         alt="Materna" height={height} className={className} />
  // ─────────────────────────────────────────────────────────────────────

  if (isIcon) {
    return (
      <svg width={height} height={height} viewBox="0 0 48 48" fill="none" className={className}>
        <circle cx="24" cy="24" r="22" fill="#E67E96" opacity="0.15" />
        <path d="M24 34s-11-7.5-11-14a7 7 0 0 1 11-5.74A7 7 0 0 1 35 20c0 6.5-11 14-11 14z" fill="#E67E96" />
        <path d="M14 22h4l2-4 3 8 2-4h9" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  }

  return <FallbackLogo height={height} light={isLight} />
}

export default MaternLogo
