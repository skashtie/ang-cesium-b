import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs';

import { Cesium3DTileset } from 'node_modules/cesium';

@Injectable({
  providedIn: 'root'
})
export class ThreeDTilesService {
  constructor() {}



  initThreeDTiles(): Promise<Cesium3DTileset> {
    const tileset = new Cesium.Cesium3DTileset({
      url: 'http://localhost/net_scene/Scene/Scene/cessium_quadtree.json',
      maximumScreenSpaceError: 1, // Temporary workaround for low memory mobile devices - Increase maximum error to 8.
      maximumNumberOfLoadedTiles: 1000, // Temporary workaround for low memory mobile devices - Decrease (disable) tile cache.
      scene3DOnly: true
    });


    return tileset.readyPromise;
  }



  toggleThreeDTiles(tileset) {
    tileset.show = !tileset.show;
  }

  heightShiftThreeDTiles(tileset) {
    const cartographic = Cesium.Cartographic.fromCartesian(
      tileset.boundingSphere.center
    );
    const surface = Cesium.Cartesian3.fromRadians(
      cartographic.longitude,
      cartographic.latitude,
      0.0
    );
    const offset = Cesium.Cartesian3.fromRadians(
      cartographic.longitude,
      cartographic.latitude,
      0.0
    ); // 100M
    offset.x = offset.x - 7.57;
    offset.y = offset.y - 14.26;
    offset.z = offset.z - 16.74;
    const translation = Cesium.Cartesian3.subtract(
      offset,
      surface,
      new Cesium.Cartesian3()
    );
    tileset.modelMatrix = Cesium.Matrix4.fromTranslation(translation);
  }
}

