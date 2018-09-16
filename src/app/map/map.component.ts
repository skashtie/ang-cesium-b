import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  isAppShown = true;
  constructor() {}

  ngOnInit() {}
  toggleAppShown() {
    this.isAppShown = !this.isAppShown;
  }
}
