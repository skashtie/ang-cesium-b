import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MunicipalAreaService {

  constructor() { }

  initMuni(): Promise<any> {
    console.log(' initMuni() ');
    const muni = Cesium.GeoJsonDataSource.load('http://localhost/net_resources/muni_area_wgs84_Terrain.geojson', {
      stroke: Cesium.Color.CORNFLOWERBLUE,
      fill: Cesium.Color.TRANSPARENT,
      strokeWidth: 5.0,
      clampToGround: false
  });
  return muni;
}

configureMuniEntities(muniJson, currentTime) {
 // Get the array of entities
 const entities = muniJson.entities.values;

      for (let i = 0; i < entities.length; i++) {
          // Set the height and the material of each polyline
          const entity = entities[i];
          entity.polyline.width = 10;
          entity.polyline.material = new Cesium.PolylineGlowMaterialProperty({
              glowPower: 0.8,
              color: Cesium.Color.BLUE
          });

          // const positions = entity.polyline.positions.getValue(viewer.clock.currentTime);
          const positions = entity.polyline.positions.getValue(currentTime);
          for (let j = 0; j < positions.length; j++) {
            const pos = Cesium.Cartographic.fromCartesian(positions[j]);
              positions[j] = Cesium.Cartesian3.fromRadians(pos.longitude, pos.latitude, pos.height + 0.5);
          }
          entity.polyline.positions = positions;
}}

toggleMuni(muniJson) {
  muniJson.show = !muniJson.show;
}

}
