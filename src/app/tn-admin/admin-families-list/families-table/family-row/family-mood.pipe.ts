import { Pipe, PipeTransform } from '@angular/core';

const MOODS = [
  'Rustic',        // 0
  'Sturdy',        // 1
  'Mechanical',    // 2
  'Industrial',    // 3
  'Informal',      // 4
  'Contemporary',  // 5
  'High-tech',     // 6
  'Futuristic',    // 7
  'Lively',        // 8
  'Delicate',      // 9
  'Classical',     // 10
  'Formal',        // 11
  'Cute',          // 12
  'Fun',           // 13
  'Technical',     // 14
  'Retro',         // 15
  'Friendly',      // 16
  'Digital',       // 17
];
@Pipe({name: 'myFamilyMood'})
export class FamilyMoodPipe implements PipeTransform {
  public transform(mood: number): string {
    if (-1 < mood && mood < MOODS.length ) {
      return MOODS[mood];
    } else {
      return 'Unknown';
    }
  }
}
