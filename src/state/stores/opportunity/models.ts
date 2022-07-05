import {Role} from "@src/state/stores/user/models";

export enum OpportunityCategory{
     hostel,
     hotel,
     guestHouse,
     farm,
     ecoVillage,
     skiCenter,
     camping,
     ngo,
     localCommunity,
     animalShelter,
     surfClub,
     winery,
     boat,
     homeStay,
     individual,
     privateProject
}

export enum TypeOfHelpNeeded{
     reception,
     cleaning,
     houseKeeping,
     administrativeTasks,
     tourGuide,
     babysitter,
     vet,
     animalCare,
     languages,
     sportsTeacher,
     surfing,
     personalTrainer,
     farming,
     painting,
     handyman,
     socialMedia,
     photography,
     videography,
     webDevelopment,
     cooking,
     bartending,
     service
}

export enum Accomodation{
     privateRoom,
     sharedRoom,
     dorm,
     tent
}

export enum Meal{
     breakfast,
     lunch,
     dinner,
     useSharedKitchen
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

