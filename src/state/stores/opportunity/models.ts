import {Role} from "@src/state/stores/user/models";

export enum OpportunityCategory{
     hostel="hostel",
     hotel="hotel",
     guestHouse="guestHouse",
     farm="farm",
     ecoVillage="ecoVillage",
     skiCenter="skiCenter",
     camping="camping",
     ngo="ngo",
     localCommunity="localCommunity",
     animalShelter="animalShelter",
     surfClub="surfClub",
     winery="winery",
     boat="boat",
     homeStay="homeStay",
     individual="individual",
     privateProject="privateProject"
}

export enum TypeOfHelpNeeded{
     reception="reception",
     cleaning="cleaning",
     houseKeeping="houseKeeping",
     administrativeTasks="administrativeTasks",
     tourGuide="tourGuide",
     babysitter="babysitter",
     vet="vet",
     animalCare="animalCare",
     languages="languages",
     sportsTeacher="sportsTeacher",
     surfing="surfing",
     personalTrainer="personalTrainer",
     farming="farming",
     painting="painting",
     handyman="handyman",
     socialMedia="socialMedia",
     photography="photography",
     videography="videography",
     webDevelopment="webDevelopment",
     cooking="cooking",
     bartending="bartending",
     service="service"
}

export enum Accomodation{
     privateRoom="privateRoom",
     sharedRoom="sharedRoom",
     dorm="dorm",
     tent="tent"
}

export enum Meal{
     breakfast="breakfast",
     lunch="lunch",
     dinner="dinner",
     useSharedKitchen="useSharedKitchen"
}

export enum Languages{
     greek="greek",
     english="english",
     spanish="spanish",
     italian="italian",
     german="german"
}

export interface Opportunity{
     opportunityId:string,
     memberId:string,
     role:Role,
     opportunityCategory:OpportunityCategory,
     jobTitle:string,
     jobDescription:string,
     typeOfHelpNeeded:TypeOfHelpNeeded[],
     /*opportunityLocation:any,*/
     // opportunityDates:any,
     minimumDays:number;
     maximumDays:number,
     totalWorkingHours:number,
     daysOff:number,
     // languagesRequired:any,
     // languagesSpoken:any,
     accommodation:Accomodation,
     meals:Meal[],
     additionalOfferings:string,
     // learningOpportunities:any,
     adventuresOffered:string,
     wifi:boolean,
     smokingAllowed:boolean,
     petsAllowed:boolean
}

