export type Destination = { lat: string; long: string };
export type Origin = { lat: string; long: string };

export interface DistanceServiceDTO {
  getDistance: (destination: Destination, origin: Origin) => Promise<number>;
}
