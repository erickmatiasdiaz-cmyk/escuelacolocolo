export default function MovingBall() {
  return (
    <div className="hero-moving-ball" aria-hidden="true">
      <svg viewBox="0 0 128 128" role="presentation">
        <defs>
          <radialGradient id="ball-body" cx="34%" cy="26%" r="74%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="54%" stopColor="#f7f9fb" />
            <stop offset="82%" stopColor="#dce3ea" />
            <stop offset="100%" stopColor="#b7c0ca" />
          </radialGradient>
          <radialGradient id="ball-dark-panel" cx="34%" cy="28%" r="78%">
            <stop offset="0%" stopColor="#2c3138" />
            <stop offset="58%" stopColor="#090c11" />
            <stop offset="100%" stopColor="#000000" />
          </radialGradient>
          <radialGradient id="ball-shade" cx="35%" cy="26%" r="76%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.28" />
            <stop offset="58%" stopColor="#ffffff" stopOpacity="0" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0.32" />
          </radialGradient>
          <clipPath id="ball-round-mask">
            <circle cx="64" cy="64" r="56" />
          </clipPath>
        </defs>

        <circle cx="64" cy="64" r="56" fill="url(#ball-body)" stroke="#111827" strokeWidth="3" />

        <g clipPath="url(#ball-round-mask)">
          <g className="ball-pattern">
            <path
              d="M64 34 83 48 76 71H52L45 48Z"
              fill="url(#ball-dark-panel)"
              stroke="#111827"
              strokeLinejoin="round"
              strokeWidth="2"
            />
            <path
              d="M64 0 78 16 74 34H54L50 16Z"
              fill="url(#ball-dark-panel)"
              stroke="#111827"
              strokeLinejoin="round"
              strokeWidth="2"
            />
            <path
              d="M13 28 33 22 48 38 42 57 22 57 7 43Z"
              fill="url(#ball-dark-panel)"
              stroke="#111827"
              strokeLinejoin="round"
              strokeWidth="2"
            />
            <path
              d="M115 28 95 22 80 38 86 57 106 57 121 43Z"
              fill="url(#ball-dark-panel)"
              stroke="#111827"
              strokeLinejoin="round"
              strokeWidth="2"
            />
            <path
              d="M31 105 29 83 47 72 64 84 61 105 45 117Z"
              fill="url(#ball-dark-panel)"
              stroke="#111827"
              strokeLinejoin="round"
              strokeWidth="2"
            />
            <path
              d="M97 105 99 83 81 72 64 84 67 105 83 117Z"
              fill="url(#ball-dark-panel)"
              stroke="#111827"
              strokeLinejoin="round"
              strokeWidth="2"
            />

            <path
              d="M54 34 50 16M74 34 78 16M45 48 42 57M83 48 86 57M52 71 47 72M76 71 81 72M64 84 52 71M64 84 76 71"
              fill="none"
              stroke="#b9c3cd"
              strokeLinecap="round"
              strokeWidth="2.7"
            />
            <path
              d="M48 38 45 48M80 38 83 48M33 22 50 16M95 22 78 16M29 83 22 57M99 83 106 57M47 72 29 83M81 72 99 83"
              fill="none"
              stroke="#b9c3cd"
              strokeLinecap="round"
              strokeWidth="2.7"
            />
          </g>

          <circle cx="64" cy="64" r="56" fill="url(#ball-shade)" />
        </g>

        <path
          d="M36 28c10-11 27-16 42-11"
          fill="none"
          stroke="rgba(255,255,255,0.82)"
          strokeLinecap="round"
          strokeWidth="5"
        />
        <circle cx="64" cy="64" r="56" fill="none" stroke="rgba(255,255,255,0.58)" strokeWidth="1.7" />
      </svg>
    </div>
  );
}
