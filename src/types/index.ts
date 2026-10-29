export type Diff='LOW'|'MEDIUM'|'HIGH';
export interface Job{id:string;cargo:string;icon:string;from:string;to:string;km:number;diff:Diff;pay:number;market:boolean;weight:number;truckType:string;deadline:string}
export interface TruckModel{id:string;name:string;brand:string;price:number;hp:number;speed:number;fuel:number;handling:number;cargo:number;unlock:number}
export interface Owned{uid:string;modelId:string;plate:string;condition:number;fuel:number;km:number;upgrade:number;paid:number;log:string[]}
export interface Rec{id:string;cargo:string;from:string;to:string;km:number;date:string;base:number;bonus:number;penalty:number;final:number;xp:number}
export interface Tx{id:string;date:string;label:string;amount:number}
export interface State{name:string;balance:number;xp:number;level:number;jobs:number;km:number;earned:number;trucks:Owned[];active:string;job:Job|null;history:Rec[];loan:number;tx:Tx[];dark:boolean}
