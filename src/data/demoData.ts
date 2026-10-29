// DEMO DATA ONLY (fictional). Not real server data.
import {Job,TruckModel,State,Rec} from '../types';import {PROG} from '../config/progression';
const J=(id:string,cargo:string,icon:string,from:string,to:string,km:number,diff:any,pay:number,market=false,weight=0,truckType='Any',deadline='24h'):Job=>({id,cargo,icon,from,to,km,diff,pay,market,weight,truckType,deadline});
export const JOBS:Job[]=[
J('Q1','Fresh Produce','🥬','Paleto Farms','Sandy Depot',22,'LOW',1800),J('Q2','Furniture','🛋️','Davis Mill','Vespucci Store',18,'LOW',1500),J('Q3','Bottled Water','💧','Alamo Spring','Mirror Park Mart',25,'LOW',2100),
J('Q4','Auto Parts','⚙️','La Mesa Yard','Harmony Garage',48,'MEDIUM',4200),J('Q5','Electronics','📦','Port of LS','Rockford Mall',55,'MEDIUM',5100),J('Q6','Timber','🪵','Chiliad Sawmill','Elysian Dock',62,'MEDIUM',5900),
J('Q7','Fuel Tanker','⛽','Terminal Refinery','Paleto Gas',120,'HIGH',12500),J('Q8','Heavy Machinery','🏗️','Cypress Flats','Grapeseed Site',140,'HIGH',15800),J('Q9','Frozen Goods','❄️','Port of LS','Sandy Cold Store',110,'HIGH',11800),
J('F1','Steel Coils','🔩','Elysian Steelworks','Paleto Fab',150,'HIGH',24000,true,28,'Heavy Hauler','48h'),J('F2','Livestock','🐄','Grapeseed Ranch','LS Abattoir',90,'MEDIUM',13500,true,18,'Cattle Trailer','36h'),J('F3','Chemicals','🧪','Humane Labs','Port Cargo',75,'MEDIUM',14200,true,20,'Tanker','30h'),J('F4','Containers','🚢','Port of LS','Sandy Rail Yard',130,'HIGH',21000,true,30,'Container','72h')];
export const MODELS:TruckModel[]=[
{id:'t1',name:'Valtor V300',brand:'Valtor',price:0,hp:420,speed:130,fuel:400,handling:6,cargo:18,unlock:1},
{id:'t2',name:'Ironhide H500',brand:'Ironhide',price:42000,hp:520,speed:140,fuel:500,handling:6,cargo:24,unlock:3},
{id:'t3',name:'Kestrel K620',brand:'Kestrel',price:68000,hp:620,speed:150,fuel:600,handling:7,cargo:26,unlock:6},
{id:'t4',name:'Valtor V800 Titan',brand:'Valtor',price:98000,hp:780,speed:155,fuel:700,handling:7,cargo:30,unlock:10},
{id:'t5',name:'Ironhide Behemoth',brand:'Ironhide',price:145000,hp:900,speed:150,fuel:900,handling:5,cargo:40,unlock:15},
{id:'t6',name:'Kestrel Apex GT',brand:'Kestrel',price:210000,hp:1050,speed:175,fuel:800,handling:9,cargo:34,unlock:20}];
const names=['Rex Carter','Mila Voss','Dante Ruiz','Aiko Tanaka','Sam Okoye','Lena Fischer','Omar Haddad','Zoe Brandt'];
export const BOARD=names.map((n,i)=>({name:n,level:24-i*2,jobs:480-i*55,km:21000-i*2300,earned:1900000-i*210000}));
const hist=(i:number):Rec=>{const j=JOBS[i%9],bonus=Math.round(j.pay*.05),pen=i%3?0:Math.round(j.pay*.04);return{id:'H'+(1000+i),cargo:j.cargo,from:j.from,to:j.to,km:j.km,date:new Date(Date.now()-i*864e5).toISOString().slice(0,10),base:j.pay,bonus,penalty:pen,final:j.pay+bonus-pen,xp:j.km*PROG.XP_PER_KM}};
export const seed=():State=>({name:'Demo Driver',balance:PROG.START_BALANCE,xp:900,level:2,jobs:14,km:640,earned:52300,
trucks:[{uid:'u1',modelId:'t1',plate:'TP-1042',condition:78,fuel:65,km:640,upgrade:0,paid:0,log:['Demo starter truck issued']}],active:'u1',job:null,
history:Array.from({length:14},(_,i)=>hist(i)),loan:0,tx:[{id:'x0',date:new Date().toISOString().slice(0,10),label:'Starting balance (demo)',amount:PROG.START_BALANCE}],dark:true});
