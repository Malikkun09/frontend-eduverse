import { useState, useEffect } from 'react';

const stages = [
  { status: 'CONNECTING TO SERVER', code: 'HANDSHAKE_INIT' },
  { status: 'AUTHENTICATING', code: 'AUTH_PENDING' },
  { status: 'LOADING ASSETS', code: 'CACHE_FETCH' },
  { status: 'VERIFYING INTEGRITY', code: 'HASH_CHECK' },
  { status: 'SYNCING PROFILE', code: 'PROFILE_SYNC' },
  { status: 'RETRYING CONNECTION', code: 'TIMEOUT_ERR' },
];

const MaintenanceScreen = () => {
  const [stageIdx, setStageIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStageIdx((prev) => (prev + 1) % stages.length);
    }, 1400);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <style>{`
        .maintenance-screen * { margin: 0; padding: 0; box-sizing: border-box; }
        .maintenance-screen {
          height: 100%;
          min-height: 100vh;
          overflow: hidden;
          font-family: 'Space Mono', 'Courier New', monospace;
          background: #000;
          position: relative;
          color: #fff;
        }
        .ms-bg-blur {
          position: fixed;
          top: -100px; left: -100px;
          width: calc(100% + 200px);
          height: calc(100% + 200px);
          background:
            radial-gradient(circle at 20% 30%, #2a1a4e 0%, transparent 40%),
            radial-gradient(circle at 80% 70%, #4e1a3e 0%, transparent 40%),
            radial-gradient(circle at 50% 80%, #1a3e4e 0%, transparent 40%),
            radial-gradient(circle at 90% 20%, #3e2a1a 0%, transparent 40%),
            linear-gradient(45deg, #1a1a1a, #050505);
          filter: blur(70px);
          z-index: 0;
        }
        .ms-shape {
          position: fixed;
          border-radius: 50%;
          filter: blur(90px);
          z-index: 0;
          opacity: 0.35;
          pointer-events: none;
        }
        .ms-shape1 { width: 420px; height: 420px; background: #FF69B4; top: 8%; left: 8%; animation: ms-float1 16s ease-in-out infinite; }
        .ms-shape2 { width: 360px; height: 360px; background: #87CEEB; bottom: 12%; right: 8%; animation: ms-float2 19s ease-in-out infinite; }
        .ms-shape3 { width: 300px; height: 300px; background: #6a4ee0; top: 55%; left: 45%; animation: ms-float3 22s ease-in-out infinite; }
        @keyframes ms-float1 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(60px,40px)} }
        @keyframes ms-float2 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(-60px,-40px)} }
        @keyframes ms-float3 { 0%,100%{transform:translate(-50%,-50%)} 50%{transform:translate(-30%,-70%)} }
        .ms-noise {
          position: fixed;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E");
          opacity: 0.08;
          z-index: 1;
          pointer-events: none;
          mix-blend-mode: overlay;
        }
        .ms-container {
          position: relative;
          z-index: 2;
          height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: stretch;
        }
        .ms-bar {
          width: 100%;
          height: 65px;
          background: repeating-linear-gradient(90deg, #87CEEB 0px, #87CEEB 60px, #000 60px, #000 120px, #FF69B4 120px, #FF69B4 180px);
          background-size: 180px 100%;
          border-top: 6px solid #fff;
          border-bottom: 6px solid #fff;
          box-shadow: 0 0 35px rgba(255,255,255,0.25);
          flex-shrink: 0;
        }
        .ms-bar-top { animation: ms-rtl 1.2s linear infinite; }
        .ms-bar-bottom { animation: ms-ltr 1.2s linear infinite; }
        @keyframes ms-rtl { from { background-position: 0 0; } to { background-position: -180px 0; } }
        @keyframes ms-ltr { from { background-position: 0 0; } to { background-position: 180px 0; } }
        .ms-text-block {
          flex: 1;
          width: 100%;
          padding: 30px 16px;
          text-align: center;
          background: rgba(0,0,0,0.78);
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          position: relative;
          overflow: hidden;
        }
        .ms-main-text {
          font-family: 'Archivo Black', 'Arial Black', sans-serif;
          color: #fff;
          font-size: clamp(2.2rem, 11vw, 8rem);
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: -3px;
          line-height: 0.92;
          text-shadow: 4px 4px 0 #FF69B4, 8px 8px 0 #87CEEB, 12px 12px 0 #000;
          position: relative;
          animation: ms-jitter 4s infinite;
        }
        @keyframes ms-jitter {
          0%,100% { transform: translate(0,0); }
          92%     { transform: translate(0,0); }
          93%     { transform: translate(-2px, 1px); }
          94%     { transform: translate(2px, -1px); }
          95%     { transform: translate(-1px, 2px); }
          96%     { transform: translate(1px, -2px); }
          97%     { transform: translate(0,0); }
        }
        .ms-subtitle {
          color: #87CEEB;
          font-size: clamp(0.8rem, 2vw, 1.2rem);
          margin-top: 28px;
          letter-spacing: 8px;
          text-transform: uppercase;
          font-weight: 700;
        }
        .ms-dots {
          color: #FF69B4;
          font-size: clamp(2rem, 5vw, 3rem);
          margin-top: 30px;
          letter-spacing: 10px;
          font-weight: 700;
        }
        .ms-status {
          color: #888;
          font-size: clamp(0.7rem, 1.5vw, 0.95rem);
          margin-top: 22px;
          letter-spacing: 3px;
          font-weight: 700;
          padding: 0 8px;
        }
        .ms-blink { color: #FF69B4; animation: ms-blink-anim 0.7s steps(2) infinite; }
        .ms-ok { color: #87CEEB; }
        @keyframes ms-blink-anim { 50% { opacity: 0; } }
        .ms-corner {
          position: fixed;
          width: 45px; height: 45px;
          border: 6px solid #fff;
          z-index: 5;
          pointer-events: none;
        }
        .ms-corner-tl { top: 15px; left: 15px; border-right: none; border-bottom: none; }
        .ms-corner-tr { top: 15px; right: 15px; border-left: none; border-bottom: none; }
        .ms-corner-bl { bottom: 15px; left: 15px; border-right: none; border-top: none; }
        .ms-corner-br { bottom: 15px; right: 15px; border-left: none; border-top: none; }
        .ms-top-label {
          position: fixed;
          top: 22px; left: 50%;
          transform: translateX(-50%);
          color: #FF69B4;
          font-size: clamp(0.65rem, 1.5vw, 0.9rem);
          letter-spacing: 4px;
          z-index: 6;
          background: #000;
          padding: 8px 18px;
          border: 3px solid #FF69B4;
          font-weight: 700;
          max-width: calc(100% - 32px);
          text-align: center;
        }
        .ms-bottom-label {
          position: fixed;
          bottom: 22px; left: 50%;
          transform: translateX(-50%);
          color: #87CEEB;
          font-size: clamp(0.65rem, 1.5vw, 0.9rem);
          letter-spacing: 4px;
          z-index: 6;
          background: #000;
          padding: 8px 18px;
          border: 3px solid #87CEEB;
          font-weight: 700;
          max-width: calc(100% - 32px);
          text-align: center;
        }
        .ms-side {
          position: fixed;
          top: 50%;
          color: #555;
          font-size: 0.7rem;
          letter-spacing: 4px;
          z-index: 5;
          font-weight: 700;
          white-space: nowrap;
          display: none;
        }
        @media (min-width: 640px) { .ms-side { display: block; } }
        .ms-side-left { left: 25px; transform: translateY(-50%) rotate(-90deg); transform-origin: left center; }
        .ms-side-right { right: 25px; transform: translateY(-50%) rotate(90deg); transform-origin: right center; }
        .ms-scanlines {
          position: fixed;
          inset: 0;
          background: repeating-linear-gradient(0deg, rgba(0,0,0,0) 0px, rgba(0,0,0,0) 2px, rgba(0,0,0,0.15) 3px, rgba(0,0,0,0) 4px);
          pointer-events: none;
          z-index: 3;
          mix-blend-mode: multiply;
        }
      `}</style>

      <div className="maintenance-screen">
        <div className="ms-bg-blur" />
        <div className="ms-shape ms-shape1" />
        <div className="ms-shape ms-shape2" />
        <div className="ms-shape ms-shape3" />
        <div className="ms-noise" />
        <div className="ms-scanlines" />

        <div className="ms-corner ms-corner-tl" />
        <div className="ms-corner ms-corner-tr" />
        <div className="ms-corner ms-corner-bl" />
        <div className="ms-corner ms-corner-br" />

        <div className="ms-top-label">[ ERROR_503: SERVICE_UNAVAILABLE ]</div>
        <div className="ms-bottom-label">[ MAINTENANCE_MODE_ACTIVE ]</div>

        <div className="ms-side ms-side-left">// BRUTALIST_UI_v1.0 // BUILD_2024 //</div>
        <div className="ms-side ms-side-right">// AUTH_SERVER_OFFLINE // RETRY_QUEUE_FULL //</div>

        <div className="ms-container">
          <div className="ms-bar ms-bar-top" />
          <div className="ms-text-block">
            <div className="ms-main-text">SEDANG MAINTENANCE</div>
            <div className="ms-subtitle">// SYSTEM_UNAVAILABLE //</div>
            <div className="ms-dots">. . .</div>
            <div className="ms-status">
              [ STATUS: <span className="ms-blink">{stages[stageIdx].status}</span> ]
              — <span className="ms-ok">{stages[stageIdx].code}</span>
            </div>
          </div>
          <div className="ms-bar ms-bar-bottom" />
        </div>
      </div>
    </>
  );
};

export default MaintenanceScreen;
