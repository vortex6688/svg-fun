/* tslint:disable:variable-name */

import { Family } from '../families';

export class Foundry {
  public id?: number;
  public name: string;
  public slug: string;
  public logo?: string;
  public site_url?: string;
  public url: string;
  public bio?: string;
  public designers: number[];
  public ee_subdomain: string;
  public eula?: string;
  public eula_title: string;
  public eula_subtitle: string;
  public eula_web: string;
  public eula_epub: string;
  public eula_app: string;
  public eula_desktop: string;
  public eula_web_self_hosted: string;
  public preface?: string;
  public postface?: string;
  public eula_default: boolean;
}
