import {Role} from "@src/state/stores/user/models";
import {Pagination} from "@src/utilities/fetch";

export enum OpportunityCategory{
     hostel="Hostel",
     hotel="Hotel",
     guestHouse="Guest House",
     farm="Farm",
     ecoVillage="Eco Village",
     skiCenter="Ski Center",
     camping="Camping",
     ngo="Ngo",
     localCommunity="Local Community",
     animalShelter="Animal Shelter",
     surfClub="Surf Club",
     winery="Winery",
     boat="Boat",
     homeStay="Home Stay",
     individual="Individual",
     privateProject="Private Project"
}

export type OpportunityCategoryType = keyof typeof OpportunityCategory;

export enum TypeOfHelpNeeded{
     RECEPTION="RECEPTION",
     CLEANING="CLEANING",
     HOUSE_KEEPING="HOUSE_KEEPING",
     ADMINISTRATIVE_TASKS="ADMINISTRATIVE_TASKS",
     TOUR_GUIDE="TOUR_GUIDE",
     BABYSITTER="BABYSITTER",
     VET="VET",
     ANIMAL_CARE="ANIMAL_CARE",
     LANGUAGES="LANGUAGES",
     SPORTS_TEACHER="SPORTS_TEACHER",
     SURFING="SURFING",
     PERSONAL_TRAINER="PERSONAL_TRAINER",
     FARMING="FARMING",
     PAINTING="PAINTING",
     HANDYMAN="HANDYMAN",
     SOCIAL_MEDIA="SOCIAL_MEDIA",
     PHOTOGRAPHY="PHOTOGRAPHY",
     VIDEOGRAPHY="VIDEOGRAPHY",
     WEB_DEVELOPMENT="WEB_DEVELOPMENT",
     COOKING="COOKING",
     BARTENDING="BARTENDING",
     SERVICE="SERVICE"
}

export type TypeOfHelpNeededType = keyof typeof TypeOfHelpNeeded;

export enum Accommodation{
     privateRoom="Private Room",
     sharedRoom="Shared Room",
     dorm="Dorm",
     tent="Tent"
}

export type AccommodationType = keyof typeof Accommodation;

export enum Meal{
     breakfast="Breakfast",
     lunch="Lunch",
     dinner="Dinner",
     useSharedKitchen="Use Shared Kitchen"
}

export type MealType = keyof typeof Meal;

export enum Languages{
     GREEK="Greek",
     ENGLISH="English",
     SPANISH="Spanish",
     ITALIAN="Italian",
     GERMAN="German",
     DUTCH="Dutch",
     SWEDISH="Swedish",
     NORWEGIAN="Norwegian",
     POLISH="Polish",
     PORTUGUESE="Portuguese",
     SERBIAN="Serbian",
     CROATIAN="Croatian",
     BULGARIAN="Bulgarian"
}

export type LanguagesType = keyof typeof Languages;

export enum LanguageProficiency{
     BEGINNER="Beginner",
     INTERMEDIATE="Intermediate",
     FLUENT="Fluent"
}

export type LanguageProficiencyType = keyof typeof LanguageProficiency;

export enum LearningOpportunities{
     HOSPITALITY="HOSPITALITY",
     LANGUAGES="LANGUAGES",
     ANIMAL_WELFARE="ANIMAL_WELFARE",
     VOLUNTEERING="VOLUNTEERING",
     CULTURE_EXCHANGE="CULTURE_EXCHANGE",
     CHARITY_WORK="CHARITY_WORK",
     FARMING="FARMING",
     PHOTOGRAPHY="PHOTOGRAPHY",
     VIDEOGRAPHY="VIDEOGRAPHY",
     TECHNOLOGY="TECHNOLOGY",
     NON_PROFIT="NON_PROFIT",
     ART="ART",
     WATER_SPORTS="WATER_SPORTS",
     NATURE="NATURE",
     WRITING="WRITING",
     YOGA="YOGA",
     FITNESS="FITNESS",
     DANCING="DANCING",
     GARDENING="GARDENING",
     CYCLING="CYCLING",
     BOOKS="BOOKS",
     BABYSITTING="BABYSITTING",
     COOKING="COOKING",
     COMPUTERS="COMPUTERS",
     PROGRAMMING="PROGRAMMING",
     SELF_DEVELOPMENT="SELF_DEVELOPMENT",
     SUSTAINABILITY="SUSTAINABILITY",
     HITCHHIKING="HITCHHIKING",
     SAILING="SAILING",
     MUSIC="MUSIC",
     MOVIES="MOVIES",
     FASHION="FASHION",
     HISTORY="HISTORY",
     ARCHITECTURE="ARCHITECTURE"
}

export type LearningOpportunitiesType = keyof typeof LearningOpportunities;

export interface PlacemarkAttributes{
     name:string,
     country:string,
     area:string,
     locality:string,
     postalCode:string
}

export interface OpportunityLocation{
     placemark:PlacemarkAttributes,
     longitude:string,
     latitude:string
}

export interface OpportunityDates{
     startDate:string,
     endDate?:string
}

export interface Opportunity{
     opportunityId:string,
     memberId:string,
     role:Role,
     opportunityCategory:OpportunityCategory,
     images:any[],
     imageUrls:string[],
     jobTitle:string,
     jobDescription:string,
     typeOfHelpNeeded:TypeOfHelpNeeded[],
     opportunityLocation:OpportunityLocation,
     opportunityDates:OpportunityDates[],
     minimumDays:number;
     maximumDays:number,
     totalWorkingHours:number,
     daysOff:number|0,
     languagesRequired:Languages[],
     languagesSpoken:Languages[],
     accommodationProvided:Accommodation,
     meals:Meal[],
     additionalOfferings:string[],
     learningOpportunities:LearningOpportunities[],
     adventuresOffered:string,
     wifi:boolean,
     smokingAllowed:boolean,
     petsAllowed:boolean
}

export interface CustomLocation{
     streetNumber:string,
     route:string,
     locality:string,
     administrativeArea:string,
     country:string,
     postalCode:string
}

export enum LocationFields{
     street_number="street_number",
     route = "route",
     locality="locality",
     administrative_area="administrative_area",
     country="country",
     postal_code="postal_code"
}

export interface FiltersFields{
     opportunityCategory:OpportunityCategory|undefined|null,
     typeOfHelpNeeded:TypeOfHelpNeeded[]|[],
     minimumDays:number|undefined,
     maximumDays:number|undefined,
     languagesRequired:Languages[],
     accommodationProvided:Accommodation|undefined,
     meals:Meal[],
     longitude:number|undefined,
     latitude:number|undefined,
     endDate:string|undefined,
     startDate:string|undefined
}

export interface FilterCoordinates{
     longitude:number,
     latitude:number,
     opportunityId:string
}

export interface PagingObjects{
     data:any[],
     pagination:Pagination
}

export enum FilterTypes{
     CATEGORY,
     TYPE_OF_HELP,
     MINDAYS,
     MAXDAYS,
     LANGUAGE,
     ACCOMMODATION,
     MEAL,
     LONGTITUDE,
     LATITUDE,
     END_DATE,
     START_DATE
}

export interface RefData{
     value:string,
     label:string,
     selected:boolean
}
