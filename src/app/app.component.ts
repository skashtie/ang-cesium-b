import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ang cesium b';
  isAppShown = true;

  toggleAppShown() {
    this.isAppShown = !this.isAppShown;
  }
}
