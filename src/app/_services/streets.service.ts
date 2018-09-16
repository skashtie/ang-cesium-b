import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Viewer } from 'node_modules/cesium';
@Injectable({
  providedIn: 'root'
})
export class StreetsService {

  constructor() { }

  streetsInit(): Promise<any> {
    const geoJson = Cesium.GeoJsonDataSource.load('http://localhost/net_resources/street_name_terrain_wgs84.geojson', {
      stroke: Cesium.Color.CORNFLOWERBLUE,
        fill: Cesium.Color.TRANSPARENT,
        strokeWidth: 5.0,
        clampToGround: false
  });
  return geoJson;
  }



  // TODO check simpler logic
/**height corrections */
streetsHeightShift(viewer: Viewer, geoJson) {
    // Get the array of entities
    const entities = geoJson.entities.values;

    for (let i = 0; i < entities.length; i++) {
        // Set the height and the material of each polyline
       const entity = entities[i];
        entity.polyline.width = 9;
        entity.polyline.material = new Cesium.PolylineGlowMaterialProperty({
            glowPower: 0.1,
            color: Cesium.Color.GREEN
        });


        const positions = entity.polyline.positions.getValue();
        for (let j = 0; j < positions.length; j++) {
          const pos = Cesium.Cartographic.fromCartesian(positions[j]);
            // positions[j] = Cesium.Cartesian3.fromRadians(pos.longitude, pos.latitude, pos.height + 23);
            positions[j] = Cesium.Cartesian3.fromRadians(pos.longitude, pos.latitude, pos.height + 0.5);
        }
        entity.polyline.positions.setValue(positions);


        let distance_from_last = 0;
        for (let j = 1; j < positions.length; j++) {
          const pos_1 = positions[j - 1];
          const pos_2 = positions[j];
          const dist = Math.pow((pos_2.x - pos_1.x) * (pos_2.x - pos_1.x) + (pos_2.y - pos_1.y) * (pos_2.y - pos_1.y), 0.5);
          const pos_new = new Cesium.Cartesian3;
            pos_new.x = pos_1.x + (pos_2.x - pos_1.x) / 2;
            pos_new.y = pos_1.y + (pos_2.y - pos_1.y) / 2;
            pos_new.z = pos_1.z + (pos_2.z - pos_1.z) / 2;
            distance_from_last = distance_from_last + dist;
            if (distance_from_last > 100 || j === 2) {
                distance_from_last = 0;
                // TODO
                if (entity.properties.STREET.getValue().length > 1) {
                    this.setAddressPoint(viewer, pos_new, 'Street', entity.properties.STREET.getValue());
                }
            }
        }
    }
  }

setAddressPoint(viewer: Viewer, position, name, text) {
  Cesium.Label.enableRightToLeftDetection = true;
    viewer.entities.add({
  /**reverse hebrew strings */
        name: name,
        position: position,
        type: 'street',
        point: {
            pixelSize: 3,
            color: Cesium.Color.RED,
            outlineColor: Cesium.Color.WHITE,
            outlineWidth: 1,
            scaleByDistance: new Cesium.NearFarScalar(1000, 0.0, 200, 2.0)
        },
        label: {
            text: text,
            rtl: true,
            font: '16pt monospace',
            style: Cesium.LabelStyle.FILL_AND_OUTLINE,
            fillColor: Cesium.Color.YELLOW,
            outlineWidth: 3,
            verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
            // pixelOffset: new Cesium.Cartesian2(0, -5),
            pixelOffset: new Cesium.Cartesian2(0, -10),
            pixelOffsetScaleByDistance: new Cesium.NearFarScalar(200, 2, 900, 4.0),
            // pixelOffset : new Cesium.NearFarScalar(700, 90, 100, 25.0),
            scaleByDistance: new Cesium.NearFarScalar(900, 0.1, 100, 1.0)
                // translucencyByDistance : new Cesium.NearFarScalar(2500, 0.0, 100, 2.0)
        }
    });
}

toggleStreets() {

}
/********************************************************************************************************************************* */

//   geoJsonUpdateA(): Observable<any> {
//     const geoJson = Cesium.GeoJsonDataSource.load('http://localhost/net_resources/street_name_terrain_wgs84.geojson', {
//       stroke: Cesium.Color.HOTPINK,
//       fill: Cesium.Color.PINK.withAlpha(0.5),
//       strokeWidth: 3
//   });
//   return of(geoJson);
//   }

//   geoJsonUpdateexampleDefualt(): Observable<any> {
//     const geoJson = Cesium.GeoJsonDataSource.load('http://localhost/sandcastle/Apps/SampleData/ne_10m_us_states.topojson');
//   return of(geoJson);
//   }

//   geoJsonUpdateexampleBasic(): Observable<any> {
//     const geoJson = Cesium.GeoJsonDataSource.load('http://localhost/sandcastle/Apps/SampleData/ne_10m_us_states.topojson', {
//       stroke: Cesium.Color.HOTPINK,
//         fill: Cesium.Color.PINK.withAlpha(0.5),
//         strokeWidth: 3
//     });
//   return of(geoJson);
//   }

//   geoJsonExampleChange(dataSource): Promise<any> {
//      // Seed the random number generator for repeatable results.
//      Cesium.Math.setRandomNumberSeed(0);

//          // Get the array of entities
//          const entities = dataSource.entities.values;

//          const colorHash = {};
//          for (let i = 0; i < entities.length; i++) {
//              // For each entity, create a random color based on the state name.
//              // Some states have multiple entities, so we store the color in a
//              // hash so that we use the same color for the entire state.
//              const entity = entities[i];
//              const name = entity.name;
//              let color = colorHash[name];
//              if (!color) {
//                  color = Cesium.Color.fromRandom({
//                      alpha : 1.0
//                  });
//                  colorHash[name] = color;
//              }

//              // Set the polygon material to our random color.
//              entity.polygon.material = color;
//              // Remove the outlines.
//              entity.polygon.outline = false;

//              // Extrude the polygon based on the state's population.  Each entity
//              // stores the properties for the GeoJSON feature it was created from
//              // Since the population is a huge number, we divide by 50.
//              entity.polygon.extrudedHeight = entity.properties.Population / 50.0;
//             }
// /** */
//   return dataSource;
//   }
//   /** */
//   geoJsonUpdateexampleBasicPromise(): Promise<any> {
//     const geoJson = Cesium.GeoJsonDataSource.load('http://localhost/sandcastle/Apps/SampleData/ne_10m_us_states.topojson', {
//       stroke: Cesium.Color.HOTPINK,
//         fill: Cesium.Color.PINK.withAlpha(0.5),
//         strokeWidth: 3
//     });
//   return geoJson;
//   }
}
