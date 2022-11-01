import {TypeOfTraveler} from "@src/state/stores/user/models";
import {OpportunityCategory, TypeOfHelpNeeded} from "@src/state/stores/opportunity/models";

export interface TravelerHomeForm{
    typeOfTraveler:TypeOfTraveler,
    name:string,
    email:string,
    typeOfHelpNeeded:TypeOfHelpNeeded,
    minNumOfDays:MinNumOfDays,
    travelerCompany:TravelerCompany,
    subscriptionFee:number,
    comments:string
}

export interface HostHomeForm{
    opportunityCategory:OpportunityCategory,
    name:string,
    email:string,
    typeOfHelpNeeded:TypeOfHelpNeeded,
    minNumOfDays:MinNumOfDays,
    season:Season,
    monthlySubscription:number,
    comments:string
}

export enum MinNumOfDays{
    "FIVE"="5",
    "FIFTEEN"="15",
    "THIRTY"="30",
    "SIXTY"="60"
}

export type MinNumOfDaysType = keyof typeof MinNumOfDays;

export enum TravelerCompany{
    "SOLO"="Solo",
    "FRIENDS"="Friends",
    "COUPLE"="Couple"
}

export type TravelerCompanyType = keyof typeof TravelerCompany;


export enum Season{
    "PRESEASON"="Pre-season (February to May)",
    "POSTSEASON"="Post-season (September to November)",
    "SEASONAL"="Seasonal"
}

export type SeasonType = keyof typeof Season;
