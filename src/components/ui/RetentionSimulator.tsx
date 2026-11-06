import { useState } from 'react';
import { Activity, AlertTriangle, CheckCircle2, ChevronDown, ChevronUp, Sparkles } from 'lucide-react';

export function RetentionSimulator() {
  const [open, setOpen] = useState(false);
  const [contract, setContract] = useState<'month' | 'one-year' | 'two-year'>('month');
  const [tenure, setTenure] = useState(6);
  const [tickets, setTickets] = useState(2);
  const [monthlySpend, setMonthlySpend] = useState(65);

  // Survival analysis / Cox heuristic calculation based on RetentionIQ
  const calculateRisk = () => {
    let score = 45;
    if (contract === 'month') score += 20;
    if (contract === 'one-year') score -= 15;
    if (contract === 'two-year') score -= 32;

    score -= Math.min(tenure * 0.7, 28);
    score += tickets * 7.5;
    if (monthlySpend > 80) score += 6;
    if (monthlySpend < 40) score -= 4;

    return Math.max(5, Math.min(95, Math.round(score)));
  };

  const risk = calculateRisk();

  const getRiskTone = () => {
    if (risk < 30) return { label: 'Low Churn Risk', tone: 'mint', bg: 'bg-mint/40 text-emerald-800' };
    if (risk < 65) return { label: 'Moderate Risk', tone: 'sun', bg: 'bg-sun/40 text-amber-900' };
    return { label: 'High Churn Risk', tone: 'pop', bg: 'bg-pop/40 text-rose-900' };
  };

  const currentRisk = getRiskTone();

  const getRecommendation = () => {
    if (risk >= 65) {
      return 'X-Learner Uplift Recommendation: High Net ROI — Trigger immediate retention discount and schedule a proactive customer success call.';
    }
    if (risk >= 30) {
      return 'X-Learner Uplift Recommendation: Moderate Net ROI — Deliver automated product adoption email sequence and self-service tutorials.';
    }
    return 'X-Learner Uplift Recommendation: Low Net ROI — Healthy customer. Avoid intrusive discount interventions; offer loyalty perks.';
  };

  return (
    <div className="mt-8 rounded-2xl border-2 border-ink bg-card p-4 sm:p-6 shadow-pop">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex w-full items-center justify-between gap-3 text-left cursor-pointer"
        aria-expanded={open}
      >
        <div className="flex items-center gap-2.5 sm:gap-3">
          <span className="grid size-9 sm:size-10 shrink-0 place-items-center rounded-xl border-2 border-ink bg-accent text-white shadow-xs">
            <Activity size={18} strokeWidth={2.5} />
          </span>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-display text-sm sm:text-base font-black text-ink">
                Interactive ML Lab: Customer Retention Simulator
              </span>
              <span className="hidden sm:inline-flex items-center gap-1 rounded-full border border-ink bg-sun/40 px-2 py-0.5 text-[10px] font-bold text-ink uppercase tracking-wide">
                <Sparkles size={11} className="text-amber-700" />
                Live Demo
              </span>
            </div>
            <p className="text-xs text-muted-foreground font-medium">
              Simulate customer churn probability &amp; uplift intervention ranking (from RetentionIQ capstone)
            </p>
          </div>
        </div>

        <span className="grid size-8 place-items-center rounded-full border-2 border-ink bg-cream text-ink shadow-xs shrink-0">
          {open ? <ChevronUp size={16} strokeWidth={2.5} /> : <ChevronDown size={16} strokeWidth={2.5} />}
        </span>
      </button>

      {open ? (
        <div className="mt-6 pt-5 border-t-2 border-ink/10 grid gap-6 lg:grid-cols-12 animate-enter-up">
          {/* Controls Column */}
          <div className="space-y-4 lg:col-span-7">
            {/* Contract Type */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-ink/80 block mb-1.5">
                Contract Type
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'month', label: 'Month-to-Month' },
                  { id: 'one-year', label: '1-Year' },
                  { id: 'two-year', label: '2-Year' },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setContract(item.id as typeof contract)}
                    className={`rounded-xl border-1.5 border-ink py-1.5 px-2 text-xs font-bold transition-all ${
                      contract === item.id
                        ? 'bg-accent text-white shadow-[2px_2px_0_#1e293b]'
                        : 'bg-sand/70 text-ink hover:bg-cream'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Sliders Grid */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <div className="flex justify-between text-xs font-bold text-ink/80 mb-1">
                  <span>Tenure:</span>
                  <span className="font-mono text-accent">{tenure} months</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="48"
                  value={tenure}
                  onChange={(e) => setTenure(Number(e.target.value))}
                  className="w-full accent-accent cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold text-ink/80 mb-1">
                  <span>Support Tickets:</span>
                  <span className="font-mono text-pop">{tickets} tickets</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="8"
                  value={tickets}
                  onChange={(e) => setTickets(Number(e.target.value))}
                  className="w-full accent-pop cursor-pointer"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold text-ink/80 mb-1">
                <span>Monthly Charges:</span>
                <span className="font-mono text-emerald-700">${monthlySpend}/mo</span>
              </div>
              <input
                type="range"
                min="20"
                max="120"
                step="5"
                value={monthlySpend}
                onChange={(e) => setMonthlySpend(Number(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer"
              />
            </div>
          </div>

          {/* Model Inference Result Column */}
          <div className="rounded-xl border-2 border-ink bg-cream p-4 flex flex-col justify-between shadow-xs lg:col-span-5">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Inference Prediction
                </span>
                <span className={`inline-flex items-center gap-1 rounded-full border border-ink px-2.5 py-0.5 text-xs font-bold ${currentRisk.bg}`}>
                  {risk < 30 ? <CheckCircle2 size={12} /> : <AlertTriangle size={12} />}
                  {currentRisk.label}
                </span>
              </div>

              <div className="mt-3">
                <div className="flex items-baseline gap-2">
                  <span className="font-display text-3xl sm:text-4xl font-black text-ink">
                    {risk}%
                  </span>
                  <span className="text-xs font-semibold text-muted-foreground">
                    predicted churn probability
                  </span>
                </div>

                <div className="mt-2 h-2.5 w-full overflow-hidden rounded-full border border-ink bg-sand/60">
                  <div
                    className={`h-full transition-all duration-300 ${
                      risk < 30 ? 'bg-mint' : risk < 65 ? 'bg-sun' : 'bg-pop'
                    }`}
                    style={{ width: `${risk}%` }}
                  />
                </div>
              </div>

              <p className="mt-3 text-xs leading-relaxed font-medium text-ink/85 border-t border-ink/10 pt-2.5">
                {getRecommendation()}
              </p>
            </div>

            <p className="mt-3 font-mono text-[10px] text-muted-foreground">
              ⚡ Powered by Cox Proportional Hazards &amp; X-Learner logic from Rajan&apos;s Capstone.
            </p>
          </div>
        </div>
      ) : null}
    </div>
  );
}
