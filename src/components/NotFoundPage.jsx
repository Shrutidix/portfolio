import React from 'react';
import { Home, ArrowLeft, Terminal, AlertTriangle } from 'lucide-react';

export default function NotFoundPage({ onReturnHome }) {
  const currentPath = typeof window !== 'undefined' ? window.location.pathname : '/404';

  const handleGoHome = () => {
    if (onReturnHome) {
      onReturnHome();
    } else {
      window.location.href = './';
    }
  };

  return (
    <div className="min-h-screen bg-[#221713] text-[#FAF6EF] flex items-center justify-center p-4 sm:p-8 font-sans selection:bg-[#7E9387] selection:text-[#FAF6EF]">
      {/* Decorative Grid Lines */}
      <div
        className="fixed inset-0 opacity-15 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(126, 147, 135, 0.25) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(126, 147, 135, 0.25) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />

      <div className="relative max-w-2xl w-full">
        {/* Paper Container */}
        <div className="rounded-2xl bg-[#FAF6EF] text-[#1C1512] shadow-2xl border border-black/20 p-8 sm:p-12 relative overflow-hidden">
          
          {/* Top Stamp Header */}
          <div className="flex items-center justify-between pb-4 border-b border-black/15 mb-6 text-xs font-mono font-bold">
            <div className="flex items-center gap-2 text-[#3F6253] uppercase tracking-wider">
              <span className="w-2.5 h-2.5 rounded-full bg-[#3F6253]" />
              <span>HTTP 404 // DATA ANOMALY</span>
            </div>
            <span className="text-[#53453E]">RECORD ERROR</span>
          </div>

          {/* Large Headline (Own H1 preserved as required) */}
          <div className="space-y-2 mb-6">
            <div className="text-6xl sm:text-7xl font-display font-extrabold text-[#1C1512] tracking-tight">
              404
            </div>
            <h1 className="text-2xl sm:text-3xl font-display font-bold text-[#3F6253]">
              Page Not Found
            </h1>
            <p className="font-serif text-base sm:text-lg text-[#3B2F2A] leading-relaxed pt-1">
              The requested record <code className="bg-black/5 px-2 py-0.5 rounded text-xs font-mono font-bold text-[#1C1512]">{currentPath}</code> does not exist or has been relocated.
            </p>
          </div>

          {/* SQL Terminal Query Block */}
          <div className="rounded-xl bg-[#1C1512] text-[#FAF6EF] p-4 font-mono text-xs space-y-1.5 shadow-inner mb-8">
            <div className="flex items-center gap-2 text-[#7E9387] border-b border-white/10 pb-2 mb-2">
              <Terminal className="w-3.5 h-3.5 text-[#22D3EE]" />
              <span>QUERY EXECUTION LOG</span>
            </div>
            <div className="text-white/60">
              <span className="text-[#22D3EE]">SELECT</span> route_id, title, status <br />
              <span className="text-[#22D3EE]">FROM</span> portfolio_routes <br />
              <span className="text-[#22D3EE]">WHERE</span> path = <span className="text-[#FFB020]">'{currentPath}'</span>;
            </div>
            <div className="text-amber-400 pt-1 flex items-center gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>SQL Warning: 0 rows returned. Key lookup failed.</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-black/15">
            <button
              onClick={handleGoHome}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#222B31] hover:bg-black text-[#FAF6EF] font-mono text-xs font-bold tracking-wider uppercase flex items-center justify-center gap-2 transition-colors shadow-sm"
            >
              <Home className="w-4 h-4 text-[#22D3EE]" />
              <span>Return Home</span>
            </button>

            <button
              onClick={handleGoHome}
              className="text-xs font-mono font-bold text-[#3F6253] hover:text-[#1C1512] flex items-center gap-1 underline"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Portfolio</span>
            </button>
          </div>

          {/* Footnote */}
          <div className="mt-8 pt-3 border-t border-black/10 flex items-center justify-between text-[11px] font-mono text-[#53453E]">
            <span>SHRUTI DIXIT &bull; DATA ANALYST</span>
            <span>SYSTEM ROUTE 404</span>
          </div>
        </div>
      </div>
    </div>
  );
}
