import { Context } from 'src/package/street-api/infrastructure/map-box/models/context-map-box'
import { Properties } from 'src/package/street-api/infrastructure/map-box/models/properties-map-box'
import { Geometry } from 'src/package/street-api/infrastructure/map-box/models/geometry-map-box';

export interface Feature {
  id:         string;
  type:       string;
  place_type: string[];
  relevance:  number;
  properties: Properties;
  text:       string;
  place_name: string;
  center:     number[];
  geometry:   Geometry;
  context:    Context[];
}
