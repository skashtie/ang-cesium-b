import { Component, OnInit, ViewChild } from '@angular/core';
import { Viewer } from 'node_modules/cesium';
import { ViewerService } from '../_services/viewer.service';
import { ThreeDTilesService } from '../_services/three-d-tiles.service';
import { StreetsService } from '../_services/streets.service';
import { MunicipalAreaService } from '../_services/municipal-area.service';
import { NavigateService } from '../_services/navigate.service';
import { BuildingsService } from '../_services/buildings.service';
import { BlocksService } from '../_services/blocks.service';
import { MenuItem } from 'primeng/components/common/menuitem';
import { ParcelsService } from '../_services/parcels.service';
import { FutureConstructionService } from '../_services/future-construction.service';
import { PublicInstitutionService } from '../_services/public-institution.service';
import { LandUseService } from '../_services/land-use.service';
import { MeasureService } from '../_services/_measure/measure.service';
import { GoogleGeocoderService } from '../_services/_google-geocoder/google-geocoder.service';
// declare var google: any;

@Component({
  selector: 'app-cesium-map',
  templateUrl: './cesium-map.component.html',
  styleUrls: ['./cesium-map.component.css'],
  providers: [MeasureService]
})
export class CesiumMapComponent implements OnInit {
  @ViewChild('cesiumMap')
  cesiumMap;
  viewer: Viewer;
  isShadows = false;
  tilesetG: any;
  streets: any;
  muniJson: any;
  display = false;
  isDownloading = false;
  isDownloadingB = false;
  isDownloadingC = false;
  // TODO create json of initiated
  isBuildingsInitiated = false;
  isBlocksInitiated = false;
  isPublicInstitutionInitiated = false;
  isLandUseInitiated = false;
  landUseJson: any;
  blocksLabelsJson: any;
  parcelsJson: any;
  parcelsLabelsJson: any;
  isFutureConstructionInitiated = false;
  menubarItems: MenuItem[];
  address: any;
  geocoder: any;
  autocomplete: any;
  tmpStr = 'this is  tmpStr';

  constructor(
    private threeDTilesService: ThreeDTilesService,
    private streetsService: StreetsService,
    private viewerService: ViewerService,
    private municipalAreaService: MunicipalAreaService,
    private navigateService: NavigateService,
    private buildingsService: BuildingsService,
    private blocksService: BlocksService,
    private parcelsService: ParcelsService,
    private futureConstructionService: FutureConstructionService,
    private publicInstitutionService: PublicInstitutionService,
    private landUseService: LandUseService,
    private measureService: MeasureService,
    private googleGeocoderService: GoogleGeocoderService
  ) {}

  ngOnInit() {
    this.menubarItems = [
      {
        label: 'צל',
        command: onclick => {
          this.toggleShadows();
        }
      },
      {
        label: '3D',
        command: onclick => {
          this.toggleThreeDTiles();
        }
      },
      {
        label: 'רחובות',
        command: onclick => {
          this.toggleStreets();
        }
      },
      {
        label: 'תחום',
        command: onclick => {
          this.toggleMuni();
        }
      },
      {
        label: 'רקע',
        command: onclick => {
          this.toggleViewerEnv();
        }
      },
      {
        label: '+',
        command: onclick => {
          this.navZoomIn();
        }
      },
      {
        label: '-',
        command: onclick => {
          this.navZoomOut();
        }
      },
      {
        label: 'מעלה',
        command: onclick => {
          this.navTop();
        }
      },
      {
        label: 'צפונה',
        command: onclick => {
          this.navNorth();
        }
      },
      {
        label: 'בית',
        command: onclick => {
          this.flyHome();
        }
      },
      {
        label: 'בנינים',
        command: onclick => {
          this.showBuildings();
        }
      },
      {
        label: 'גושים',
        command: onclick => {
          this.showBlocks();
        }
      },
      {
        label: ' חלקות',
        command: onclick => {
          this.showParcels();
        }
      },
      // {
      //   label: 'showParcelsEntities()',
      //   command: onclick => {
      //     this.showParcelsEntities();
      //   }
      // },
      // {
      //   label: ' showParcelsLabels()',
      //   command: onclick => {
      //     this.showParcelsLabels();
      //   }
      // },
      {
        label: 'בנייה עתידית',
        command: onclick => {
          this.futureConstruction();
        }
      },
      {
        label: 'מוסדות ציבור',
        command: onclick => {
          this.showPublicInstitution();
        }
      },
      {
        label: 'ייעודי קרקע',
        command: onclick => {
          this.showLandUse();
        }
      },
      {
        label: 'מדידה',
        command: onclick => {
          this.measure();
        }
      }
      // {
        //   label: 'resetDefault()',
        //   command: onclick => {
          //     this.resetDefault();
          //   }
          // }
        ];

        this.viewerService
        .initViewer(this.cesiumMap.nativeElement)
        .subscribe(viewer => {
          this.viewer = viewer;
          // No depth testing against the terrain to avoid z-fighting
          viewer.scene.globe.depthTestAgainstTerrain = false;
          // Add credit to Simplex
          // tslint:disable-next-line:max-line-length
          viewer.scene.frameState.creditDisplay.addDefaultCredit(
            new Cesium.Credit(
              'Simplex Mapping Solutions',
              '../Resources/logoSimplex.png',
              'http://www.simplex-mapping.com/'
            )
          );
          viewer.scene.frameState.creditDisplay.beginFrame();

          viewer.scene.screenSpaceCameraController.minimumZoomDistance = 50;

          // viewer.geocoder.viewModel.scene = viewer.scene;

          const boundingSphere = new Cesium.BoundingSphere(
            Cesium.Cartesian3.fromDegrees(34.85222, 32.33074, 100.4310594),
            111.641825
          );

          // Set custom initial position
          this.viewer.camera.flyToBoundingSphere(boundingSphere, {
            duration: 0
          });



          viewer.infoBox.frame.sandbox =
          'allow-same-origin allow-top-navigation allow-pointer-lock allow-popups allow-forms allow-scripts';
          /** init 3DTiles */
          this.isDownloading = true;

          this.threeDTilesService.initThreeDTiles().then(tileset => {
            this.isDownloading = false;

          // this.geoJsonNet();// TODO streets
          this.streetsInit();
          this.tilesetG = tileset;
          const tilesetA = this.viewer.scene.primitives.add(tileset);
          // console.log(' tilesetA = ');
          // console.log(tilesetA.boundingSphere.center);
          this.threeDTilesService.heightShiftThreeDTiles(this.tilesetG);
          this.initMuni();
              /**geocoder */
              // this.viewer.geocoder.viewModel.scene = this.viewer.scene;
              // this.viewer.geocoder.viewModel.flightDuration = 1;
              // this.viewer.geocoder.viewModel.searchText = 'givatayim';
              // this.viewer.geocoder.viewModel.search();
                  /**geocoder */
                const input = <HTMLInputElement>document.getElementById('pac-input');
                this.googleGeocoderService.googleGeocoderInit(input);
                // const input = <HTMLInputElement>document.getElementById('tmp');
              //   console.log(' input.value = ');
              //   console.log(input.value);
              //   const countryRestrict = {
              //     'country': 'il'
              //   };

              //   // const service = new google.maps.places.PlacesService(document.getElementById('mock'));

              //   this.geocoder = new google.maps.Geocoder();
              //   // const link = document.createElement('beijing');
              //   this.autocomplete = new google.maps.places.Autocomplete(input, {
              //     placeIdOnly: true,
              //     componentRestrictions: countryRestrict
              //   },
              // );
        });
      });
  }
  /**viwer buttons */
  // Reset the scene when switching demos.
  reset() {
    this.viewer.dataSources.removeAll();
    // Set the camera to a US centered tilted view and switch back to moving in world coordinates.
    this.viewer.camera.lookAt(
      Cesium.Cartesian3.fromDegrees(-98.0, 40.0),
      new Cesium.Cartesian3(0.0, -4790000.0, 3930000.0)
    );
    this.viewer.camera.lookAtTransform(Cesium.Matrix4.IDENTITY);
  }

  resetDefault() {
    this.viewer.dataSources.removeAll();
    this.viewer.entities.removeAll();
    this.viewer.scene.requestRender();
    // this.ngOnInit();
  }

  /**buttons */
  toggleShadows() {
    this.viewerService.toggleViewerShadows(this.viewer);
    console.log('this.viewer.shadows = ' + this.viewer.shadows);
    this.viewer.scene.requestRender();
  }
  toggleThreeDTiles() {
    this.threeDTilesService.toggleThreeDTiles(this.tilesetG);
    this.viewer.scene.requestRender();
  }
  /*  streets */
  streetsInit() {
    this.isDownloading = true;
    this.streetsService.streetsInit().then(
      streetsJson => {
        this.streets = streetsJson;
        this.isDownloading = false;
        this.viewer.dataSources.add(streetsJson);
        this.streetsService.streetsHeightShift(this.viewer, streetsJson);
      },
      err => {
        alert(err);
      }
    );
  }
  toggleStreets() {
    this.streets.show = !this.streets.show;
    for (let i = 0; i < this.viewer.entities._entities.length; ++i) {
      if (this.viewer.entities.values[i]._type !== undefined) {
        if (this.viewer.entities.values[i]._type === 'street') {
          this.viewer.entities.values[i].show = this.streets.show;
        }
      }
    }
    this.viewer.scene.requestRender();
  }

  /* municipalAreaService */
  initMuni() {
    this.isDownloading = true;
    this.municipalAreaService.initMuni().then(
      muniJson => {
        this.muniJson = muniJson;
        this.isDownloading = false;
        this.viewer.dataSources.add(muniJson);
        this.municipalAreaService.configureMuniEntities(
          muniJson,
          this.viewer.clock.currentTime
        );
      },
      err => {
        alert(err);
      }
    );
  }
  toggleMuni() {
    // this.muniJson.show = !this.muniJson.show;
    this.municipalAreaService.toggleMuni(this.muniJson);
    this.viewer.scene.requestRender();

  }
  /* enviroment */
  toggleViewerEnv() {
    this.viewerService.toggleViewerEnv(
      this.viewer.scene.globe,
      this.viewer.scene.skyAtmosphere,
      this.viewer.scene.skyBox
    );
    this.viewer.scene.requestRender();
  }
  /* navigation */
  navZoomIn() {
    console.log(' navZoomIn()  ');
    this.navigateService.navZoomIn(
      this.viewer.scene.globe.ellipsoid,
      this.viewer.camera
    );
  }
  navZoomOut() {
    console.log(' navZoomOut()  ');
    this.navigateService.navZoomOut(
      this.viewer.scene.globe.ellipsoid,
      this.viewer.camera
    );
  }
  navTop() {
    // find screen center
    const width = this.viewer.canvas.clientWidth;
    const height = this.viewer.canvas.clientHeight;
    const screenCenter = new Cesium.Cartesian2(width / 2, height / 2);
    // navTop() in service
    this.navigateService
      .navTop(
        screenCenter, // screenCenter
        this.viewer.camera.position, // posCartesian
        Cesium.Cartographic.fromCartesian(this.viewer.camera.position), // posRadian
        this.viewer.scene.pickPosition(screenCenter), // sceneCenterCartesian
        Cesium.Cartographic.fromCartesian(this.viewer.camera.position), // sceneCenterRad
        this.viewer.camera.heading // oldHeading
      )
      // TODO flyTo function should recieve parameters instead of json (but pitch field  inconsistent)
      .subscribe(
        jsonFlyTo => {
          console.log(' jsonFlyTo = ');
          console.log(jsonFlyTo);
          this.navigateService.navFlyTo(this.viewer.camera, jsonFlyTo);
        },
        err => {
          console.log(err);
        }
      );
  }

  navNorth() {
    // find screen center
    const width = this.viewer.canvas.clientWidth;
    const height = this.viewer.canvas.clientHeight;
    const screenCenter = new Cesium.Cartesian2(width / 2, height / 2);
    //   navNorth() in service
    this.navigateService
      .navNorth(
        screenCenter, // screenCenter
        this.viewer.camera.position, // posCartesian
        Cesium.Cartographic.fromCartesian(this.viewer.camera.position), // posRadian
        this.viewer.scene.pickPosition(screenCenter), // sceneCenterCartesian
        Cesium.Cartographic.fromCartesian(this.viewer.camera.position), // sceneCenterRad
        this.viewer.camera.heading, // oldHeading,
        this.viewer.camera.pitch // curPitch
      )
      .subscribe(
        jsonFlyToNorth => {
          console.log(' jsonFlyToNorth = ');
          console.log(jsonFlyToNorth);
          this.navigateService.navFlyTo(this.viewer.camera, jsonFlyToNorth);
        },
        err => {
          console.log(err);
        }
      );
  }

  flyHome() {
    const boundingSphere = new Cesium.BoundingSphere(
      Cesium.Cartesian3.fromDegrees(34.85222, 32.33074, 100.4310594),
      111.641825
    );
    // Set custom initial position
    this.viewer.camera.flyToBoundingSphere(boundingSphere, {
      duration: 2
    });
  }

  /** building */
  showBuildings() {
    console.log(' showBuildingsB() client ');
    if (this.isBuildingsInitiated) {
      // this.buildingsService.toggleBuildings(this.viewer.entities);
      for (let i = 0; i < this.viewer.entities._entities.length; ++i) {
        if (this.viewer.entities.values[i]._type !== undefined) {
          if (this.viewer.entities.values[i]._type === 'build') {
            this.viewer.entities.values[i].show = !this.viewer.entities.values[
              i
            ].show;
          }
        }
      }
      this.viewer.scene.requestRender();
      return;
    }
    this.isDownloading = true;
    // this.isDownloadingB = true;
    this.buildingsService.initBuildings().then(buildingsAdresses => {
      this.isBuildingsInitiated = true;
      const entities = buildingsAdresses.entities.values;

      console.log(' showBuildingsB() entities.length =  ' + entities.length);
      this.isDownloading = !this.addBuildingAdresses(
        entities,
        0,
        entities.length
      );
      //  console.log(' showBuildingsB() entities.length =  ' + entities.length);
      // this.isDownloading = !this.addBuildingAdresses(
      //   entities,
      //   0,
      //   entities.length / 2
      // );
      // this.isDownloadingB = !this.addBuildingAdresses(
      //   entities,
      //   entities.length / 2,
      //   entities.length
      // );
    });

  }

  addBuildingAdresses(entities, startIndex, endIndex) {
    startIndex = Math.floor(startIndex);
    endIndex = Math.floor(endIndex);
    const buildingsAdressesToAdd = this.buildingsService.createAdressesDescription(
      entities,
      startIndex,
      endIndex
    );
    return buildingsAdressesToAdd.toPromise().then(textPinJson => {
      textPinJson.forEach(item => {
        this.viewer.entities.add(item);
      });
      // this.viewer.forceResize();
      return textPinJson;
    });
  }

  /** blocks */
  showBlocks() {
    console.log(' showBlocks() client ');
    if (this.isBlocksInitiated) {
      // TODO toggleBlocks()
      this.blocksService.toggleBlocks(this.blocksLabelsJson);
      return;
    }
    // else
    this.blocksLabelsJson = this.viewer.scene.primitives.add(
      new Cesium.LabelCollection()
    );
    this.isDownloading = true;
    this.blocksService.initBlocks().then(blocksJson => {
      this.isBlocksInitiated = true;
      this.blocksService.createBlocksLabels(blocksJson, this.blocksLabelsJson);
      this.isDownloading = false;
    });
  }
  /**parcels */
  showParcels() {
    console.log(' initParcels() client ');
    this.showParcelsEntities();
    this.showParcelsLabels();
  }

  showParcelsEntities() {
    console.log(' showParcelsEntities() client ');
    if (this.parcelsJson) {
      console.log(
        ' toggleParcelsEntities() client  this.parcelsJson.show =' +
          this.parcelsJson.show
      );

      // TODO toggleParcelsEntities();
      this.parcelsJson.show = !this.parcelsJson.show;
    } else {
      this.isDownloading = true;
      this.parcelsService.initParcels().then(parcelsJson => {
        this.isDownloading = false;
        this.parcelsJson = parcelsJson;
        // init parcels entities
        this.viewer.dataSources.add(parcelsJson);
        this.parcelsService.configureParcelsEntities(parcelsJson);
      });
    }
  }

  showParcelsLabels() {
    console.log(' showParcelsLabels() client ');
    if (this.parcelsLabelsJson) {
      // TODO toggleParcelsLabels();
      console.log(' showParcelsLabels() client toggle chosen');

      for (let i = 0; i < this.viewer.entities._entities.length; ++i) {
        if (this.viewer.entities.values[i]._type !== undefined) {
          if (this.viewer.entities.values[i]._type === 'parcel') {
            this.viewer.entities.values[i].show = !this.viewer.entities.values[
              i
            ].show;
          }
        }
      }
      this.viewer.scene.requestRender();
    } else {
      // this.isDownloadingB = true;
      // this.isDownloadingC = true;
      this.isDownloading = true;
      this.parcelsService.initParcelsLabels().then(parcelsLabelsJson => {
        this.parcelsLabelsJson = parcelsLabelsJson;
        // init parcels entities
        // this.viewer.dataSources.add(parcelsLabelsJson);
        const entities = parcelsLabelsJson.entities.values;
        console.log(
          ' showParcelsLabels() client entities.length =  ' + entities.length
        );
        this.isDownloading = !this.addParcelsAdresses(
          entities,
          0,
          entities.length
        );
        // this.isDownloadingB = !this.addParcelsAdresses(
        //   entities,
        //   0,
        //   entities.length / 2
        // );
        // this.isDownloadingC = !this.addParcelsAdresses(
        //   entities,
        //   entities.length / 2,
        //   entities.length
        // );
      });
    }
  }
  addParcelsAdresses(entities, startIndex, endIndex) {
    startIndex = Math.floor(startIndex);
    endIndex = Math.floor(endIndex);
    const parcelsLabelsToAdd = this.parcelsService.configureParcelsLabels(
      entities,
      startIndex,
      endIndex
    );
    return parcelsLabelsToAdd.toPromise().then(textPinJson => {
      textPinJson.forEach(item => {
        this.viewer.entities.add(item);
      });
      // this.viewer.scene.requestRender();

      return textPinJson;
    });
  }
  /**future construction models */
  futureConstruction() {
    console.log(' initFutureConstruction() client  ');
    if (this.isFutureConstructionInitiated) {
      console.log('client jsonFutureConstructionArr toggle  ');
      for (let i = 0; i < this.viewer.entities._entities.length; ++i) {
        if (this.viewer.entities.values[i]._type !== undefined) {
          if (this.viewer.entities.values[i]._type === 'models') {
            this.viewer.entities.values[i].show = !this.viewer.entities.values[
              i
            ].show;
          }
        }
      }
      this.viewer.scene.requestRender();
    } else {
      this.futureConstructionService
        .initFutureConstruction()
        .then(jsonFutureConstructionArr => {
          console.log(
            'client jsonFutureConstructionArr.length  ' +
              jsonFutureConstructionArr.length
          );
          this.isFutureConstructionInitiated = true;
          jsonFutureConstructionArr.forEach(item => {
            this.viewer.entities.add(item);
          });
        });
    }
  }
  /**publicInstitution */
  showPublicInstitution() {
    if (this.isPublicInstitutionInitiated) {
      // TODO toggle PublicInstitution !!!Problem: this.viewer.scene.requestRender(); required afterwards
      console.log('client togglePublicInstitution');
      // this.publicInstitutionService.togglePublicInstitution(this.viewer);
      for (let i = 0; i < this.viewer.entities._entities.length; ++i) {
        if (this.viewer.entities.values[i]._type !== undefined) {
          if (this.viewer.entities.values[i]._type === 'inst') {
            // console.log( 'inst ');
            this.viewer.entities.values[i].show = !this.viewer.entities.values[
              i
            ].show;
          }
        }
      }
      this.viewer.scene.requestRender();
    } else {
      this.isPublicInstitutionInitiated = true;
      // TODO init PI and add the json
      this.publicInstitutionService
        .initPublicInstitution()
        .then(publicInstitutionArr => {
          publicInstitutionArr.forEach(item => {
            this.viewer.entities.add(item);
          });
        });
    }
  }

  // Land Use
  showLandUse() {
    console.log('client showLandUse()');
    if (this.isLandUseInitiated) {
      console.log('client toggleLandUse()');
      this.landUseJson.show = !this.landUseJson.show;
      this.viewer.scene.requestRender();
      // TODO toggleLandUse()
    } else {
      this.isDownloading = true;
      this.isLandUseInitiated = true;
      this.landUseService.initLandUse().then(landUseJson => {
        this.landUseJson = landUseJson;
        this.viewer.dataSources.add(landUseJson);
        this.isDownloading = false;
      });
    }
  }

  measure() {
    console.log('measure() activated');
    const labels = this.viewer.scene.primitives.add(new Cesium.LabelCollection());
    const points = this.viewer.scene.primitives.add(
      new Cesium.PointPrimitiveCollection()
    );
    const lines = this.viewer.scene.primitives.add(new Cesium.PolylineCollection());
    const handler = new Cesium.ScreenSpaceEventHandler(this.viewer.canvas);

    this.measureService.measure( labels, points, lines, this.viewer.scene, handler);
  }


// https://www.npmjs.com/package/@types/googlemaps
/**geocoder */
boundsToRectangle(bounds) {
  const ne = bounds.getNorthEast();
  const sw = bounds.getSouthWest();
  return new Cesium.Rectangle.fromDegrees(
    sw.lng(),
    sw.lat(),
    ne.lng(),
    ne.lat()
  );
}
googleInputSuggestions(event) {
  const place = this.autocomplete.getPlace();
  console.log(' autocomplete = ');
  console.log(this.autocomplete);
  if (place ) {
    console.log(' place = ');
    console.log(place);
    console.log(' place.place_id = ');
    console.log(place.place_id);
    const that = this;
    this.geocoder.geocode({ placeId: place.place_id }, function(
      results,
      status,
      _that = that,
      _Cesium = Cesium
    ) {
      if (status !== 'OK') {
          alert('status = ' + status );
          return;
      }
      console.log('results[0] = ');
      console.log(results[0]);
      console.log('status = ');
      console.log(status);

      console.log('results[0].geometry.location.lat() = ');
      console.log(results[0].geometry.location.lat());

      console.log('results[0].geometry.location.lng() = ');
      console.log(results[0].geometry.location.lng());

      console.log('results[0].formatted_address = ');
      console.log(results[0].formatted_address);
      /**geocoder */

      // console.log(' dest = ' );
      // console.log( dest);

      /**bounded area */
      /**assign viewport to bounds if exist */
      if (!results[0].geometry.bounds) {
        if (results[0].geometry.viewport) {
          results[0].geometry.bounds = results[0].geometry.viewport;
        } else {
          // no bounds and no viewport fields exist
          return;
        }
      }
      const rectangle = _that.boundsToRectangle(results[0].geometry.bounds);
      console.log(' rectangle  = ');
      console.log(rectangle);
      _that.viewer.camera.flyTo({
        destination: rectangle
      });
    });
  } else {
    // !place
    console.log(' no place   ');
  }
}

googleInputSuggestionsS(event) {
  // const input = <HTMLInputElement>document.getElementById('pac-input');
  // console.log('comp input =   ');
  // const tmp = input.value;
  // input.value = '';
  // input.value = 'נתניה ' + tmp;
  // console.log(input.value);
  console.log(event.type);

  const destinationJson = this.googleGeocoderService.googleInputSuggestions(this.viewer.camera);
  console.log(' destinationJson =   ');
  console.log(destinationJson);

}

initGoogleMapsPlacesAutocompleteService() {
  this.googleGeocoderService.initGoogleMapsPlacesAutocompleteService();
  // .subscribe(
  //   (predictions) => {
  // console.log('comp predictions =   ');
  // console.log(predictions);

  //   }
  // );
}

}
