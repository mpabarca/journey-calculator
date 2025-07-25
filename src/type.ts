export type TransportType = 'car' | 'train' | 'plane';

export type JourneyType = {
  start: string;
  destination: string;
  intialDistance: number;
  transport: TransportType;
  cost: number;
  totalDistance: number;
  // stops: Stop[]
};

export type ValidationErrorsType = {
  isError: boolean;
  errors: {
    start: string;
    destination: string;
    intialDistance: string;
  };
};
