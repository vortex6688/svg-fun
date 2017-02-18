import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private route: ActivatedRoute) {}
  ngOnInit() {
    this.route.fragment.subscribe((fragment) => {
      if (!fragment) return;
      const element = document.querySelector ( "#" + fragment )
      if ( element ) element.scrollIntoView({behavior: 'smooth', block: 'end'})
    });
  }

}
