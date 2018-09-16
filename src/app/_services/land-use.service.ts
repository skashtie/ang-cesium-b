import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LandUseService {

  constructor() { }

  initLandUse(): Promise<any> {
  console.log( 'service initLandUse()');
  return Cesium.GeoJsonDataSource.load(environment.netResources + 'LandUseWGS84_color_dtm.geojson').then(
    (landUseJson) => {
      return this.configurePublicInstitutionJson(landUseJson);
    }
  );
  }
  configurePublicInstitutionJson(landUseJson): Promise<any> {

  console.log( 'configurePublicInstitutionJson landUseJson = ');
  console.log(landUseJson);

  const p = landUseJson.entities.values;
  console.log( 'p.length = ' + p.length); // 20280

  for (let i = 0; i < p.length; i++) {
    // for (let i = 0; i < p.length / 2; i++) {
    // for (let i = 0; i < 10000; i++) {
    p[i].polygon.height = 3.5;
    p[i].polygon.extrudedHeight = 3.5; // or height property
    p[i].polygon.fill = true;
    const entity = p[i];
    const col = entity.properties.Descriptio.getValue();
    const name = entity.name;


    // const st1 = 'Cesium.Color.';
    // const alpha = '.withAlpha(0.5)';
    // const st = st1.concat(col, alpha);
    // const st2 = st1.concat(col);
    // const out = st2.concat(col);

    // Set the polygon material to defined color.

    // st2 =
    // Cesium.Color.YELLOW

    const stA = 'Cesium.Color.' + col + '.withAlpha(0.5)';

    // console.log( ' st = ' );
    // console.log(st);
    // console.log( ' st2 = ' );
    // console.log(st2);
    // console.log( ' stA = ' );
    // console.log(stA);

    // tslint:disable-next-line:no-eval
    entity.polygon.material = eval(stA);

    // Add the outlines.
    entity.polygon.outline = true;
    // tslint:disable-next-line:no-eval
    entity.polygon.outlineColor = eval('Cesium.Color.' + col);



    const parcel_lot = entity.properties.Parcel_Lot.getValue();
    const area_m = Math.round(entity.properties.Area.getValue());
    const lot_no = entity.properties.Lot_No.getValue();
    const parcel_no = entity.properties.Parcel_no.getValue();
    // const taba_id=entity.properties.Taba_Id.getValue();
    const block_no = entity.properties.Block_No.getValue();
    const taba_name = entity.properties.Taba_Name.getValue();
    const land_un = entity.properties.Land_U_N.getValue();

    p[i].name = land_un;


    const eng_link = 'http://vaada.netanyagis.co.il/BlockParcelSearchResults.aspx?1=1&gush=' + block_no + '&helka=' + parcel_no;
    const eng_link_full = '<a  style="color:yellow;" href="' + eng_link + '"rel="noopener noreferrer" target="_blank">פתח קישור</a>';


    // tslint:disable-next-line:max-line-length
    let html = '<style>table,th,td{border 1px solid black;border-collapse: collapse;} th, td {padding: 5px;}th,td{text-align: right;}</style>';
    // tslint:disable-next-line:max-line-length
    html = html + '<table style="width:100%"><tr><td>' + taba_name + '</td><td>:שם תכנית</td></tr><tr><td>' + block_no + '</td><td>:גוש</td></tr><tr><td>' + parcel_no + '</td><td>:חלקה</td></tr><tr><td>' + lot_no + '</td><td>:מגרש</td></tr><tr><td>' + area_m + '</td><td>:שטח</td></tr><tr><td>' + eng_link_full + '</td><td>:מידע מהאתר הנדסי</td></tr></table>';

    p[i].description = html;

  }
  console.log( 'after loop ' );
  landUseJson.show = true;
  return landUseJson;
}


}

