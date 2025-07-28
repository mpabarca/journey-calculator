export type TransportType = 'car' | 'train' | 'plane';

export type StopType = {
  name: string;
  distance: number;
}

export type JourneyType = {
  start: string;
  destination: string;
  intialDistance: number;
  transport: TransportType;
  cost: number;
  totalDistance: number;
  stops: StopType[]
;};

export type ValidationErrorsType = {
  isError: boolean;
  errors: {
    start: string;
    destination: string;
    intialDistance: string;
    stops: {
      name: string;
    distance: string;
    }[]
  };
};
