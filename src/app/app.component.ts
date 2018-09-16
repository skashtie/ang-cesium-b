import { Component, OnInit } from '@angular/core';
import {MenuItem} from 'primeng/api';
// TODO initTextPinJson should Service (buildings , parcels etc)
// TODO error handlers using best practices
// TODO trnasfer paramenters/json to function instead of viewer object (extract them before tranfferring)
// TODO typesafe using cesium type in typescript declaration
// TODO in navigation service better reuseable logic
// TODO in NavigateService navTop() navNorth() should be compared to other projects and  rearange using small functions
 // TODO flyTo function should recieve parameters instead of json (but pitch field  inconsistent)
    // TODO show 'downloading' message in buildings
    // TODO toggle/init check: optimize check json/boolean
    // TODO toggle/init check: consider function toggleEntities(type)
    // TODO addSpots type service (addEntity)
    // TODO add enviromental variables for url adresses
    // TODO update similar names in services (configure-create etc.)
    // TODO sync resetDefualt with isInit variables
    // TODO *ngIf button should be reset button and may be activated by event from map to the parent

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'angular cesium s';

  items: MenuItem[];

  ngOnInit() {
    this.items = [
      {
          label: 'File',
          icon: 'fa fa-fw fa-file-o',
          items: [{
                  label: 'New',
                  icon: 'fa fa-fw fa-plus',
                  items: [
                      {label: 'Project'},
                      {label: 'Other'},
                  ]
              },
              {label: 'Open'},
              {separator: true},
              {label: 'Quit'}
          ]
      },
      {
          label: 'Edit',
          icon: 'fa fa-fw fa-edit',
          items: [
              {label: 'Undo', icon: 'fa fa-fw fa-mail-forward'},
              {label: 'Redo', icon: 'fa fa-fw fa-mail-reply'}
          ]
      },
      {
          label: 'Help',
          icon: 'fa fa-fw fa-question',
          items: [
              {
                  label: 'Contents'
              },
              {
                  label: 'Search',
                  icon: 'fa fa-fw fa-search',
                  items: [
                      {
                          label: 'Text',
                          items: [
                              {
                                  label: 'Workspace'
                              }
                          ]
                      },
                      {
                          label: 'File'
                      }
              ]}
          ]
      },
      {
          label: 'Actions',
          icon: 'fa fa-fw fa-gear',
          items: [
              {
                  label: 'Edit',
                  icon: 'fa fa-fw fa-refresh',
                  items: [
                      {label: 'Save', icon: 'fa fa-fw fa-save'},
                      {label: 'Update', icon: 'fa fa-fw fa-save'},
                  ]
              },
              {
                  label: 'Other',
                  icon: 'fa fa-fw fa-phone',
                  items: [
                      {label: 'Delete', icon: 'fa fa-fw fa-minus'}
                  ]
              }
          ]
      },
      {
          label: 'Quit', icon: 'fa fa-fw fa-minus'
      }
  ];
  }
}
