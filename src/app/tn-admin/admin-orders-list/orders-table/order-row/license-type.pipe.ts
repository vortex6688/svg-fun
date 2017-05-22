import { Pipe, PipeTransform } from '@angular/core';
import { License } from '../../../../tn-common/licenses/';

function capitalizeFirstLetter(word: string) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

@Pipe({name: 'myLicenseType'})
export class LicenseTypePipe implements PipeTransform {
  public transform(license: License): string {
    if (license.license_type === 'web' && license.self_hosted) {
      return 'Web (self-hosted)';
    } else if (license.license_type === 'web' && !license.self_hosted) {
      return 'Web (hosted)';
    } else if (license.license_type === 'epub') {
      return 'E-publication';
    } else if (license.license_type === 'app') {
      return 'Application';
    } else {
      return capitalizeFirstLetter(license.license_type);
    }
  }
}
