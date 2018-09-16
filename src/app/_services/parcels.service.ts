import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ParcelsService {

  constructor() { }

  initParcels(): Promise<any> {
    const parcels = Cesium.GeoJsonDataSource.load('http://localhost/net_resources/Parcell_all_wgs84_dtm.geojson', {
      stroke: Cesium.Color.LIME,
      fill: Cesium.Color.TRANSPARENT,
      strokeWidth: 15.0,
      clampToGround: false
  });
  return parcels;
  }
// configure parcels (not labels)
  configureParcelsEntities(parcelsJson) {
    const entities = parcelsJson.entities.values;

    for (let i = 0; i < entities.length; i++) {
        // Set the height and the material of each polyline
       const entity = entities[i];

        entity.polyline.width = 1;
        entity.polyline.material = new Cesium.PolylineOutlineMaterialProperty({
            // glowPower: 7,
            outlineColor: Cesium.Color.ORANGE,
            outlineWidth: 1.0
        });

        const positions = entity.polyline.positions.getValue();
        for (let j = 0; j < positions.length; j++) {
            const pos = Cesium.Cartographic.fromCartesian(positions[j]);
            positions[j] = Cesium.Cartesian3.fromRadians(pos.longitude, pos.latitude, pos.height + 1.5);
        }
        entity.polyline.positions = positions;
    }
    parcelsJson.show = true;
  }

  initParcelsLabels(): Promise<any> {
    console.log('  initParcelsLabels() client ');
    const parcelsLabels = Cesium.GeoJsonDataSource.load('http://localhost/net_resources/Parcell_center_wgs84_dsm.geojson');
    return parcelsLabels;
  }

  configureParcelsLabels(entities, startIndex, endIndex) {
    console.log(' configureParcelsLabels() client  startIndex = ' + startIndex + ' endIndex = ' + endIndex);
    const textPinJsonArr = [];

    for (let i = startIndex; i < endIndex; i++) {
        const entity = entities[i];
        const Block_Name = entity.properties.Block_Name;
        const position = entity.position.getValue();

        const pos = Cesium.Cartographic.fromCartesian(position);
        const position_new = Cesium.Cartesian3.fromRadians(pos.longitude, pos.latitude, pos.height + 1.5);
        const color = 'PURPLE';

        const name = 'חלקה ' + Block_Name;

        const block_no = entity.properties.Block_No.getValue();


        const eng_link = 'http://vaada.netanyagis.co.il/BlockParcelSearchResults.aspx?1=1&gush=' + block_no + '&helka=' + Block_Name;
        const eng_link_full = '<a  style="color:yellow;" href="' + eng_link + '"rel="noopener noreferrer" target="_blank">פתח קישור</a>';


        // tslint:disable-next-line:max-line-length
        let html = '<style>table,th,td{border 1px solid black;border-collapse: collapse;} th, td {padding: 5px;}th,td{text-align: right;}</style>';
        // tslint:disable-next-line:max-line-length
        html = html + '<table style="width:100%"><tr><td>' + block_no + '</td><td>:גוש</td></tr><tr><td>' + Block_Name + '</td><td>:חלקה</td></tr><tr><td>' + eng_link_full + '</td><td>:מידע מהאתר הנדסי</td></tr></table>';
        // tslint:disable-next-line:max-line-length
        textPinJsonArr.push(this.initTextPinJson(Block_Name.toString(), name, position_new, html, color, 40, 'parcel', 900, 0.1, 100, 1, true));
      }
      return of(textPinJsonArr);
}



// TODO initTextPinJson should Service (buildings , parcels etc)
initTextPinJson(num, name, position, description, color, marker_size, type, far, far_sc, near, near_sc, toshow) {

  const pinBuilder = new Cesium.PinBuilder();
  // TODO minimize syntex
  const st1 = 'Cesium.Color.';
  const col = st1.concat(color);
 const textPinJson =  {
    name: name,
    type: type,
    description: description,
    position: position,
    show: toshow,
    billboard: {
        // tslint:disable-next-line:no-eval
        image: pinBuilder.fromText(num, eval(col), marker_size).toDataURL(),
        verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
        // distanceDisplayCondition: new Cesium.DistanceDisplayCondition(min_dist, max_dist),
        scaleByDistance: new Cesium.NearFarScalar(far, far_sc, near, near_sc)
    }
};
return textPinJson;
}

}
