export interface User {
    _id : string ;
    name : string ;
    totalPoints : number ;
}

export interface ClaimHistory {
    _id : string ;
    userId : string ;
    name : string ;
    claimedPoints : number ;
    claimAt : Date
}

export interface History {
    _id : string;
    userName : string ;
    claimedPoints : number ;
    claimAt : Date
}