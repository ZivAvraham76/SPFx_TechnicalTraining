import { AadHttpClient } from "@microsoft/sp-http";


export interface Course {
  litmosLearningPathName: string;
  pillar: string;
  productName: string;
  litmosLearningPathUrl: string;
  PercentageComplete: number;
  levelName: string;
  Id: string;
}
export interface badgesPointsData {
  Description?: string;
  EarnedPoint?: number;
  Icon?: string;
  ItemName?: string;
  Title?: string;
}

export interface IRoniTechnicalTrainingProps {
  trainingData: {
    producttraining: Course[];
    user: {
      userBadgesPointsData: badgesPointsData[];
    };
  };
  description: string; 
  pillars: string[];
  levels: string[];
  context: any;
  aadClient: AadHttpClient;


  // selectedFilter: string;
  // onFilterChange: (filter: string) => void;
  //roni
  // clientId: string;
}
