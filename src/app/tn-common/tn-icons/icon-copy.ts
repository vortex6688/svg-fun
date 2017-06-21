import { Component } from '@angular/core';

@Component({
  selector: 'icon-copy',
  template: `<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg"
	 xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 viewBox="0 0 13 13" style="enable-background:new 0 0 13 13;" xml:space="preserve">
<style type="text/css">
	.st0{fill:#807E7C;}
</style>
<path class="st0" d="M8.1,3.3V0.2H2.5L0.2,
2.5v7.1h4.8v3.2h7.9V3.3H8.1z M2.5,1.3v1.3H1.3L2.5,1.3z M0.9,8.9V3.3h2.4V0.9h4v2.4
	L4.9,5.7v3.2H0.9z M7.3,4.4v1.3H6L7.3,4.4z M12.1,12.1H5.7V6.5h2.4V4.1h4V12.1z"/>
</svg>`,
  styles: [
  `:host{vertical-align: text-top;}`
	// vertical-align: text-top; helps to keep the icon align with the text next to it
  ]
})
export class IconCopyComponent  {}
