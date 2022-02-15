import { Injectable } from '@nestjs/common';
import { AUTH_KEY_GOOGLE } from '@src/server/settings';

import { externalDistance, ExternalDistance } from '@src/shared/externals';
import { DistanceServiceDTO, Destination, Origin } from './dtos/distance-service';

@Injectable()
export class DistanceService implements DistanceServiceDTO {
  private isValid(destination: Destination, origin: Origin): boolean {
    if (!destination.lat || !destination.long || !origin.lat || !origin.long) return false;

    return true;
  }

  public async getDistance(destination: Destination, origin: Origin): Promise<number> {
    if (!this.isValid(destination, origin)) return 0;

    const dest = `destinations=${destination.lat},${destination.long}`;
    const orig = `origins=${origin.lat},${origin.long}`;
    const url = `json?key=${AUTH_KEY_GOOGLE}&${dest}&${orig}`;

    const { data } = await externalDistance.get<ExternalDistance>(url);

    const { value } = data.rows[0].elements[0].distance;

    return value;
  }
}
