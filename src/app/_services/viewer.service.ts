import { Injectable } from '@angular/core';
import { Viewer } from 'node_modules/cesium';
import { Observable, of } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ViewerService {

  viewer: Viewer;
  isShadows = false;
  tilesetG: any;
  streets: any;
  muniJson: any;
  display = false;
  isDownloading = false;
  isDownloadingB = false;
  // TODO create json of initiated
  isBuildingsInitiated = false;
  isBlocksInitiated = false;
  blocksLabelsJson: any;

  constructor(
    // private threeDTilesService: ThreeDTilesService,
    // private geoJsonService: GeoJsonService,
    private viewerService: ViewerService,
    // private municipalAreaService: MunicipalAreaService,
    // private navigateService: NavigateService,
    // private buildingsService: BuildingsService,
    // private blocksService: BlocksService
  ) {}


  /**
   *
      baseLayerPicker: false,
                sceneModePicker: true,
                scene3DOnly: true,
                timeline: true, // used for shadows - timeline display
                animation: true, // used for shadows - clock display
                shadows: false, // used for shadows
   */
  initViewer(cesiumMap): Observable<Viewer> {
    const viewer = new Cesium.Viewer(cesiumMap, {
      // Next two lines create a viewer that will not render frames based on changes in
// simulation time.
requestRenderMode : true,
maximumRenderTimeChange : Infinity,
      // shouldAnimate: false,
      vrButton: true,
      shadows: false,
      infoBox: true,
      baseLayerPicker: true,
      geocoder: false,
      sceneModePicker: true,
      scene3DOnly: true,
      timeline: true, // used for shadows - timeline display
      animation: true, // used for shadows - clock display
      terrainProvider: Cesium.createWorldTerrain()
    });
    return of(viewer);
  }

  toggleViewerShadows(viewer: Viewer) {
    viewer.shadows = !viewer.shadows;
  }
  toggleViewerEnv(viewerGlobe, skyAtmosphere, skyBox) {
    // 2d background (earth surface)
    viewerGlobe.show = !viewerGlobe.show;
    // earth glow
    skyAtmosphere.show = !skyAtmosphere.show;
    // stars around earth in space
    skyBox.show = !skyBox.show;
  }
}
