/** Central progression config. Change here only. */
export const PROG = {
  MAX_LEVEL: 25, BASE_XP: 2000, XP_PER_KM: 12, TIMER_BONUS: 300,
  /** How XP needed to go from level L -> L+1 is computed:
   *  'linear'  : BASE_XP + (L-1) * STEP
   *  'percent' : BASE_XP * (1 + (L-1) * GROWTH)   (additive %, NOT compounding)
   *  'table'   : TABLE[L] (explicit per-level values, falls back to BASE_XP)
   *  Each level is computed independently; nothing is silently multiplied cumulatively. */
  MODE: 'percent' as 'linear' | 'percent' | 'table', STEP: 500, GROWTH: 0.25,
  TABLE: {} as Record<number, number>,
  LOAN_RATE: 0.15, MAX_LOAN: 50000, START_BALANCE: 25000,
};
export function xpForLevel(l: number): number {
  switch (PROG.MODE) {
    case 'linear': return PROG.BASE_XP + (l - 1) * PROG.STEP;
    case 'table': return PROG.TABLE[l] ?? PROG.BASE_XP;
    default: return Math.round(PROG.BASE_XP * (1 + (l - 1) * PROG.GROWTH));
  }
}
