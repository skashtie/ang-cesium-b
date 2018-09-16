import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BuildingsService {

  constructor() { }

    // TODO show 'downloading' message in buildings

    showBuildings(): Promise<any> {
      console.log(' showBuildings() service  ');
    // TODO show 'downloading' message in buildings
   return this.initBuildings().then(
     (buildingsAdresses) => {
       /** */
      console.log(' showBuildings() service in then  ');

      const entities = buildingsAdresses.entities.values; //
      console.log(' showBuildings() service in then   entities.length = ' + entities.length);
      const startIndex = Math.floor(entities.length / 2);
      console.log(' showBuildings() service in then   entities.length / 2 = ' + entities.length / 2);
      console.log(' showBuildings() service in then   entities.length / 5 = ' + entities.length / 5);
      // const textPinJson = this.createAdressesDescription(entities, 13835);
      // const textPinJson = this.createAdressesDescription(entities, startIndex);
      const textPinJson = [];
return textPinJson;
       /** */
     }
   );
  }

    // initBuildings(): Promise<any> {
    //   console.log('  initBuildings()   ');
    //   const buildingsAdresses = Cesium.GeoJsonDataSource.load('http://localhost/net_resources/rozeta_dsm.geojson');
    //   return buildingsAdresses;
    // }

toggleBuildings(entities) {
  for (let i = 0; i < entities._entities.length; ++i) {
    if (entities.values[i]._type !== undefined) {
        if (entities.values[i]._type === 'build') {
          entities.values[i].show = !entities.values[i].show;
        }
    }
}
}
    initBuildings(): Promise<any> {
      console.log('  initBuildings()   ');
      const buildingsAdresses = Cesium.GeoJsonDataSource.load('http://localhost/net_resources/rozeta_dsm.geojson');
      return buildingsAdresses;
    }
/******************************************************************** */
    createAdressesDescription(entities, startIndex, endIndex): Observable<any[]> {
      console.log('   createAdressesDescription()   startIndex = ' + startIndex + ' endIndex = ' + endIndex);
      const textPinJsonArr = [];

      // for (let i = 0; i < entities.length; i++) {
        for (let i = startIndex; i <  endIndex; i++) {
        const entity = entities[i];
        const BldgNum = entity.properties.bldg_num;
        const position = entity.position.getValue();
        const pos = Cesium.Cartographic.fromCartesian(position);
           const position_new = Cesium.Cartesian3.fromRadians(pos.longitude, pos.latitude, pos.height + 3.5);
           const position_pin = Cesium.Cartesian3.fromRadians(pos.longitude, pos.latitude, pos.height + 1.5);
           // ntity.position.setValue(position);
           if (BldgNum.getValue() === 0) {
               continue;
           }
       const num = Math.round(BldgNum.getValue());
       const Bld_num_text = num.toString();


       const a1 = Math.round(entity.properties.street_cod.getValue());
       const a1_txt = 'סמל רחוב';

       const a2 = entity.properties.Street_nam.getValue();
       const a2_txt = 'שם רחוב';

       const a3 = Bld_num_text;
       const a3_txt = 'מספר בית';

       const a4 = entity.properties.BLDG_LETR.getValue();
       const a4_txt = 'אות';

       const a5 = entity.properties.Street_n_1.getValue();
       const a5_txt = 'שם רחוב משני';

       const a6 = Math.round(entity.properties.BLDG_NUM_2.getValue());
       const a6_txt = 'מספר בית משני';

       const a7 = Math.round(entity.properties.NUM_APTS.getValue());
       const a7_txt = 'מספר דירות';

       const a8 = Math.round(entity.properties.NUM_FLOORS.getValue());
       const a8_txt = 'מספר קומות';

       const a9 = entity.properties.BLDG_NA.getValue();
       const a9_txt = 'תאור מבנה';

       const a10 = entity.properties.BLDG_DESC.getValue();
       const a10_txt = 'סוג שימוש';

       const a11 = Math.round(entity.properties.YEAR_.getValue());
       const a11_txt = 'שנת הקמה מוערכת';

       const a12 = entity.properties.MIGUN_NAME.getValue();
       const a12_txt = 'סוג מיגון';

       const a13 = entity.properties.ROVA.getValue();
       const a13_txt = 'רובע חירום';

       const a14 = Math.round(entity.properties.RESDNT_NUM.getValue());
       const a14_txt = 'מספר תושבים ';

       const a15 = entity.properties.NEBR_NAME.getValue();
       const a15_txt = 'שכונה';


       // tslint:disable-next-line:max-line-length
       let html = '<style>table,th,td{borde 1px solid black;border-collapse: collapse;} th, td {padding: 5px;}th,td{text-align: center;}</style>';

       // tslint:disable-next-line:max-line-length
       html = html + '<table style="width:100%"><tr><td>' + a1 + '</td><td>' + a1_txt + '</td></tr><tr><td>' + a2 + '</td><td>' + a2_txt + '</td></tr><tr><td>' + a3 + '</td><td>' + a3_txt + '</td></tr>';
       // tslint:disable-next-line:max-line-length
       html = html + '<tr><td>' + a4 + '</td><td>' + a4_txt + '</td></tr><tr><td>' + a5 + '</td><td>' + a5_txt + '</td></tr><tr><td>' + a6 + '</td><td>' + a6_txt + '</td></tr>';
       // tslint:disable-next-line:max-line-length
       html = html + '<tr><td>' + a7 + '</td><td>' + a7_txt + '</td></tr><tr><td>' + a8 + '</td><td>' + a8_txt + '</td></tr><tr><td>' + a9 + '</td><td>' + a9_txt + '</td></tr>';
       // tslint:disable-next-line:max-line-length
       html = html + '<tr><td>' + a10 + '</td><td>' + a10_txt + '</td></tr><tr><td>' + a11 + '</td><td>' + a11_txt + '</td></tr><tr><td>' + a12 + '</td><td>' + a12_txt + '</td></tr>';
       // tslint:disable-next-line:max-line-length
       html = html + '<tr><td>' + a13 + '</td><td>' + a13_txt + '</td></tr><tr><td>' + a14 + '</td><td>' + a14_txt + '</td></tr><tr><td>' + a15 + '</td><td>' + a15_txt + '</td></tr></table>';



      // const color = 'DODGERBLUE';
      const color = 'RED';

       const name = a2 + ' ' + a3;

  // TODO minimize syntex
  const st1 = 'Cesium.Color.';
  const col = st1.concat(color);

      textPinJsonArr.push(this.initTextPinJson(a3, name, position_pin, html, color, 40, 'build', 900, 0.1, 100, 1, true));
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
