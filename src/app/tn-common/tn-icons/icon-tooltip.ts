import { Component } from '@angular/core';

@Component({
  selector: 'icon-tooltip',
  template: `<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg"
	xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	viewBox="0 0 13 13" style="enable-background:new 0 0 13 13;" xml:space="preserve">
<g>
	<path class="st0" d="M2.5,2.5c1.1-1.1,2.4-1.6,4-1.7c1.6,0,2.9,0.6,
	4,1.7s1.6,2.4,1.7,4c0,1.6-0.6,2.9-1.7,4s-2.4,1.6-4,1.7
		c-1.6,0-2.9-0.6-4-1.7s-1.6-2.4-1.7-4C0.9,4.9,1.5,3.6,2.5,2.5z"/>
	<g>
		<path class="st2" d="M9.1,4.4c0,0.3,0,0.5-0.1,0.8C8.9,
		5.5,8.8,5.7,8.7,5.9c-0.2,0.4-0.6,0.7-1.1,1C7.4,7,7.3,7.1,7.1,7.2
			C7,7.3,6.9,7.4,6.9,7.5v0.3H5.4l0-0.5c0-0.3,0.2-0.6,
			0.3-0.8c0.2-0.2,0.5-0.4,1-0.7C7,5.7,7.2,5.5,7.3,5.3
			c0.1-0.2,0.2-0.4,0.2-0.8c0-0.3-0.1-0.5-0.2-0.7C7.1,
			3.7,6.9,3.6,6.6,3.6c-0.4,0-0.7,0.1-0.9,0.3C5.4,4.2,5.2,4.4,5.1,4.5L4.9,4.8
			L3.8,4l0.1-0.2c0.2-0.4,0.5-0.7,1-1C5.4,2.4,6,2.2,
			6.7,2.2c0.7,0,1.3,0.2,1.7,0.6C8.8,3.2,9.1,3.8,9.1,4.4z"/>
		<path class="st2" d="M6.9,9c0.2,0.2,0.3,0.4,0.3,
		0.7c0,0.3-0.1,0.5-0.3,0.7c-0.2,0.2-0.4,0.3-0.7,0.3c-0.3,0-0.5-0.1-0.7-0.3
			C5.3,10.2,5.2,10,5.2,9.7c0-0.3,0.1-0.5,
			0.3-0.7c0.2-0.2,0.4-0.3,0.8-0.3h0.2v0C6.6,8.7,6.8,8.8,6.9,9z"/>
	</g>
</g>
</svg>`,
  styles: [
  `.st0{opacity:0.6;fill:#807E7C;}
  .st2{fill:#FFFFFF;}
  :host{vertical-align: text-top;}`
	// vertical-align: text-top; helps to keep the icon align with the text next to it`
  ]
})
export class IconTooltipComponent {}
