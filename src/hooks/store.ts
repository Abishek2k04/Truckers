import {useSyncExternalStore} from 'react';import {State,Job,Rec} from '../types';import {PROG,xpForLevel} from '../config/progression';import {seed,MODELS} from '../data/demoData';
const KEY='trucker-pro-demo-v1';
let s:State=(()=>{try{const r=localStorage.getItem(KEY);if(r)return JSON.parse(r)}catch{}return seed()})();
const subs=new Set<()=>void>();let toasts:{id:number;msg:string;ok:boolean}[]=[];let tid=0;
const emit=()=>{try{localStorage.setItem(KEY,JSON.stringify(s))}catch{};subs.forEach(f=>f())};
const sub=(f:()=>void)=>{subs.add(f);return()=>{subs.delete(f)}};
export const useS=()=>useSyncExternalStore(sub,()=>s);
export const useToasts=()=>useSyncExternalStore(sub,()=>toasts);
export function toast(msg:string,ok=true){const id=++tid;toasts=[...toasts,{id,msg,ok}];subs.forEach(f=>f());setTimeout(()=>{toasts=toasts.filter(t=>t.id!==id);subs.forEach(f=>f())},3500)}
const up=(p:Partial<State>)=>{s={...s,...p};emit()};
const today=()=>new Date().toISOString().slice(0,10);
const pay=(label:string,amt:number)=>({balance:s.balance+amt,tx:[{id:'x'+Date.now()+Math.random(),date:today(),label,amount:amt},...s.tx]});
function addXp(n:number){let xp=s.xp+n,lv=s.level;while(lv<PROG.MAX_LEVEL&&xp>=xpForLevel(lv)){xp-=xpForLevel(lv);lv++;const u=MODELS.filter(m=>m.unlock===lv).map(m=>m.name);toast(`🎉 LEVEL UP! You reached level ${lv}`+(u.length?` — unlocked ${u.join(', ')}`:''))}
 if(lv>=PROG.MAX_LEVEL)xp=0;return{xp,level:lv}}
export const activeTruck=()=>s.trucks.find(t=>t.uid===s.active);
export const A={
 accept(j:Job){if(s.job)return toast('Finish or cancel your active job first',false);up({job:j});toast(`Accepted: ${j.cargo} (simulated)`)},
 cancel(){up({job:null});toast('Job cancelled')},
 canDrive(){const t=activeTruck();return !!t&&t.fuel>=15&&t.condition>=15},
 complete(){const j=s.job;if(!j)return;const dmg=Math.round(Math.random()*8),pen=Math.round(j.pay*dmg/100),bonus=Math.round(j.pay*.05);
  const xpGain=j.km*PROG.XP_PER_KM+(j.market?0:PROG.TIMER_BONUS),final=j.pay+bonus-pen,r:Rec={id:'H'+Date.now().toString().slice(-6),cargo:j.cargo,from:j.from,to:j.to,km:j.km,date:today(),base:j.pay,bonus,penalty:pen,final,xp:xpGain};
  const trucks=s.trucks.map(x=>x.uid===s.active?{...x,fuel:Math.max(0,x.fuel-j.km*.12),condition:Math.max(0,x.condition-dmg),km:x.km+j.km}:x);
  up({...pay(`Delivery ${j.cargo}`,final),...addXp(xpGain),trucks,job:null,jobs:s.jobs+1,km:s.km+j.km,earned:s.earned+final,history:[r,...s.history]});toast(`Delivered! +$${final} +${xpGain} XP`)},
 buy(id:string){const m=MODELS.find(x=>x.id===id)!;if(s.trucks.some(t=>t.modelId===id))return toast('You already own this truck',false);
  if(s.level<m.unlock)return toast(`Requires level ${m.unlock}`,false);if(s.balance<m.price)return toast('Insufficient balance',false);
  up({...pay(`Bought ${m.name}`,-m.price),trucks:[...s.trucks,{uid:'u'+Date.now(),modelId:id,plate:'TP-'+Math.floor(1000+Math.random()*9000),condition:100,fuel:100,km:0,upgrade:0,paid:m.price,log:['Purchased (demo)']}]});toast(`${m.name} purchased (simulated)`)},
 setActive(uid:string){up({active:uid});toast('Active truck changed')},
 service(uid:string,kind:'repair'|'fuel'|'upgrade'){const t=s.trucks.find(x=>x.uid===uid)!;let cost=0,patch:any={},label='';
  if(kind==='repair'){cost=(100-t.condition)*40;patch={condition:100};label='Repair'}
  if(kind==='fuel'){cost=Math.round((100-t.fuel)*6);patch={fuel:100};label='Fuel refill'}
  if(kind==='upgrade'){if(t.upgrade>=5)return toast('Max upgrade level',false);cost=8000*(t.upgrade+1);patch={upgrade:t.upgrade+1};label='Upgrade'}
  if(cost<=0)return toast('Nothing to service',false);if(cost>s.balance)return toast('Insufficient balance',false);
  up({...pay(`${label} ${t.plate}`,-cost),trucks:s.trucks.map(x=>x.uid===uid?{...x,...patch,log:[`${label} -$${cost} on ${today()}`,...x.log]}:x)});toast(`${label} done (-$${cost})`)},
 loan(a:number){const room=PROG.MAX_LOAN-s.loan;if(!(a>=1000)||a>room)return toast(`Loan must be $1,000–$${room}`,false);up({...pay('Loan received',a),loan:s.loan+Math.round(a*(1+PROG.LOAN_RATE))});toast('Loan approved (simulated)')},
 repay(a:number){if(!(a>0)||a>s.balance||a>s.loan)return toast('Invalid repayment amount',false);up({...pay('Loan repayment',-a),loan:s.loan-a});toast('Repayment recorded')},
 rename(n:string){up({name:n})},reset(){s=seed();emit();toast('Demo data reset')}};
