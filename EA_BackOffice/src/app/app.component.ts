import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'BookHub';
  showNavbar = false;
  constructor(private router: Router) {
  }

  ngOnInit(): void {

    this.
      router.events.pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        const url: string = event['url'];
        if (url === "/") {
          this.showNavbar = false;
        } else {
          this.showNavbar = true;
        }
      });
  }
}
