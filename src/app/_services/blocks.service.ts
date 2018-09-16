import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BlocksService {
  constructor() {}

  initBlocks(): Promise<any> {
    return Cesium.GeoJsonDataSource.load(
      'http://localhost/net_resources/gush_key_center_wgs84_DSM.geojson'
    );
    // '../Resources/gush_key_center_wgs84_DSM.geojson'
    // http://localhost/net_resources/street_name_terrain_wgs84.geojson
  }
  // blocksJson dataSource,  blocksLabelsJson  Gush_labels
  createBlocksLabels(blocksJson, blocksLabelsJson) {
    console.log(' createBlocksLabels() service ');

    const entities = blocksJson.entities.values;
    for (let i = 0; i < entities.length; i++) {
      const entity = entities[i];
      const Block_Name = entity.properties.Block_Name;
      let position = entity.position.getValue();
      // const label;
      const pos = Cesium.Cartographic.fromCartesian(position);
      position = Cesium.Cartesian3.fromRadians(
        pos.longitude,
        pos.latitude,
        pos.height + 20
      );
      entity.position.setValue(position);

      blocksLabelsJson.add({
        position: new Cesium.Cartesian3(position.x, position.y, position.z),
        text: Block_Name.getValue(),
        font: '22px Helvetica',
        fillColor: Cesium.Color.RED,
        outlineColor: Cesium.Color.WHITE,
        outlineWidth: 6,
        style: Cesium.LabelStyle.FILL_AND_OUTLINE,
        verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
        pixelOffset: new Cesium.Cartesian2(0, -9),
        scaleByDistance: new Cesium.NearFarScalar(5000, 0.1, 100, 1.0)
      });
    }
    // this.toggleBlocks(blocksLabelsJson);
  }

  toggleBlocks(blocksLabelsJson) {
    console.log(' toggleBlocks() service ');
    for (let i = 0; i < blocksLabelsJson.length; ++i) {
      const blockItem = blocksLabelsJson.get(i);
      blockItem.show = !blockItem.show;
  }
  }

}
