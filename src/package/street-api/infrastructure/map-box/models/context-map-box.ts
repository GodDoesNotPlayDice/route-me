import { ShortCode } from 'src/package/street-api/infrastructure/map-box/models/short-code-map-box'
import { Wikidata } from "./wiki-data-map-box";

export interface Context {
  id:          string;
  mapbox_id:   string;
  text:        string;
  wikidata?:   Wikidata;
  short_code?: ShortCode;
}
