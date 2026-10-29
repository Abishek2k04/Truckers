/**
 * Integration boundary. UI should talk ONLY to a TruckService implementation.
 * The demo currently uses hooks/store.ts (mock). A future HttpTruckService must call an
 * authenticated backend API (or a FiveM NUI callback) that validates the player server-side and
 * talks to the 'truck' resource / oxmysql. The browser must NEVER hold DB credentials or query oxmysql.
 */
import {Job,Owned,Rec,Tx} from '../types';
export interface TruckService{
 getStats():Promise<{level:number;xp:number;balance:number;jobs:number;km:number}>;
 getTrucks():Promise<Owned[]>; getJobs():Promise<Job[]>; getLeaderboard(p:'weekly'|'monthly'|'all'):Promise<any[]>;
 acceptJob(id:string):Promise<void>; completeJob(id:string):Promise<Rec>; purchaseTruck(modelId:string):Promise<Owned>;
 requestMaintenance(uid:string,kind:string):Promise<void>; getFinance():Promise<{balance:number;loan:number;tx:Tx[]}>;
}
