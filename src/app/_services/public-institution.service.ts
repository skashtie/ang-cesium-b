import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class PublicInstitutionService {
  iconUrl: string;
  colorArr: string[] = [];
  constructor() {
    this.iconUrl = environment.netResources + 'Inst/Icons/';
    const fileName = ['Cultural_Hall.png', 'swimming.png', 'doctor.png', 'medical.png', 'pharmacy.png'
    , 'religious_jewish.png', 'community.png', 'retirement_home.png', 'playground.png', 'sport.png',
     'police_station.png', 'emergency_telephone.png', 'Public_garden.png', 'fire_stations.png', 'rail.png',
      'lodging.png', 'beach.png', 'dog_park.png', 'reservation.png', 'gift.png', 'park.png', 'cinema.png'
      , 'grocery.png', 'shelter.png', 'shelter.png', 'municipality.png', 'Interior.png', 'town_hall.png'
      , 'librarys.png', 'schools.png', 'Religious_education.png', 'synagogue.png', 'Mikveh.png', 'college.png',  ];
    const colorName = ['ORANGE', 'SANDYBROWN', 'DARKTURQUOISE', 'DARKTURQUOISE',
     'DARKTURQUOISE', 'RED', 'ORANGE', 'PALEGREEN', 'SALMON' , 'SANDYBROWN', 'RED'
     , 'DARKTURQUOISE', 'LIMEGREEN', 'RED', 'BLACK', 'MEDIUMPURPLE', 'YELLOW'
     , 'LIMEGREEN', 'LIMEGREEN', 'YELLOW', 'LIMEGREEN', 'YELLOW', 'YELLOW', 'RED'
     , 'ORANGE', 'GREY', 'GREY', 'ORANGE', 'BLUE', 'BLUE', 'BLUE', 'ROYALBLUE', 'ROYALBLUE', 'BLUE'];
     /**defualt , 'SLATEGREY' */

     for (let i = 0; i < fileName.length; ++i) {
      this.colorArr[fileName[i]] = colorName[i];
     }
  }

  initPublicInstitution(): Promise<any[]> {
    console.log('server initPublicInstitution()');
    // const publicInstitutionJsonArrRes = [];
    //   let minDist = 0;
    //  let maxDist = 700;
    const firstPIJson = this.loadPublicInstitutionJson(environment.netResources + 'Inst/A_dsm.geojson').then(
      (publicInstitutionJsonA) => {
        return this.configurePublicInstitutionJson(publicInstitutionJsonA , 0, 700 );
      }
    );
    // minDist = maxDist;
    // maxDist = 2000;
    const secondPIJson = this.loadPublicInstitutionJson(environment.netResources + 'Inst/B_dsm.geojson').then(
      (publicInstitutionJsonB) => {
        return this.configurePublicInstitutionJson(publicInstitutionJsonB , 700, 2000 );
      }
    );
    // minDist = maxDist;
    // maxDist = 4000;
    const thirdPIJson = this.loadPublicInstitutionJson(environment.netResources + 'Inst/C_dsm.geojson').then(
      (publicInstitutionJsonC) => {
        return this.configurePublicInstitutionJson(publicInstitutionJsonC , 2000, 4000 );
      }
    );

    // minDist = maxDist;
    // maxDist = 30000;
    const forthPIJson = this.loadPublicInstitutionJson(environment.netResources + 'Inst/D_dsm.geojson').then(
      (publicInstitutionJsonD) => {
        return this.configurePublicInstitutionJson(publicInstitutionJsonD , 4000, 30000 );
      }
    );
    const publicInstitutionJsonArrRes = [firstPIJson, secondPIJson, thirdPIJson, forthPIJson];
    // return Promise.all(publicInstitutionJsonArrRes);

    return Promise.all(publicInstitutionJsonArrRes).then(
      (reArr) => {
        return  reArr[0].concat(reArr[1]).concat(reArr[2]).concat(reArr[3]);
        // return  reArr;
      }
    );
    // return firstPIJson;
  }

loadPublicInstitutionJson(path): Promise<any>  {
  return Cesium.GeoJsonDataSource.load(path);
}



  configurePublicInstitutionJson(publicInstitutionJson, minDist, maxDist): Promise<any[]> {
    console.log('configurePublicInstitutionJson()');
    const publicInstitutionJsonArr = [];
    const resArrPromise = new Promise(
      (resolve, reject) => {

        const entities = publicInstitutionJson.entities.values;

        for (let i = 0; i < entities.length; i++) {
          const entity = entities[i];
          const position = entity.position.getValue();
          const pos = Cesium.Cartographic.fromCartesian(position);
          const position_new = Cesium.Cartesian3.fromRadians(
            pos.longitude,
            pos.latitude,
            pos.height + 2.5
          );

          const category = entity.properties.category_d.getValue();
          const classi = entity.properties.theme_desc.getValue();

          // const theme = entity.properties.THEME_TITL.getValue();
          let desc = entity.properties.SITE_DESC.getValue();

          const label_png = entity.properties.png.getValue();
          const name = entity.properties.SITE_NAME.getValue();
          const street_name = entity.properties.STREET_NAM.getValue();
          const bld_num = Math.round(entity.properties.HOUSE_NUM.getValue());

          const address = entity.properties.ADDRESS_DE.getValue();
          const phone = entity.properties.SITE_PHONE.getValue();

          // const bld_let = entity.properties.BldgLetter.getValue();

          const size = 50;

          if (name === 'עיריית נתניה') {
            // tslint:disable-next-line:max-line-length
            desc =
              // tslint:disable-next-line:max-line-length
              '<a  style="color:yellow;" href=\'https://www.netanya.muni.il/\' target=\'popup\' onclick="window.open(\'https://www.netanya.muni.il/\',\'popup\', \'width=600,height=600\'); return false;">פתח קישור</a>';
          }

          const url_p = 'http://www.ustream.tv/channel/surfcenter-israel';
          if (name === 'חוף הטיילת') {
            // tslint:disable-next-line:max-line-length
            desc =
              '<a  style="color:yellow;" href=\'' +
              url_p +
              '\' target=\'popup\' onclick="window.open(\'' +
              url_p +
              '\',\'popup\', \'width=600,height=600\'); return false;">live video</a>';
          }

          // tslint:disable-next-line:max-line-length
          let html =
            '<style>table,th,td{border 1px solid black;border-collapse: collapse;} th, td {padding: 5px;}th,td{text-align: right;}</style>';
          // tslint:disable-next-line:max-line-length
          html =
            html +
            '<table style="width:100%"><tr><td>' +
            classi +
            '</td><td>:סוג מוסד ציבור</td></tr><tr><td>' +
            category +
            '</td><td>:קטגוריה</td></tr><tr><td>' +
            desc +
            '</td><td>:תאור</td></tr><tr><td>' +
            address +
            '</td><td>:כתובת</td></tr><tr><td>' +
            street_name +
            '</td><td>:רחוב</td></tr><tr><td>' +
            bld_num +
            '</td><td>:מספר הבית</td></tr><tr><td>' +
            phone +
            '</td><td>:טלפון</td></tr></table>';

          let color = this.colorArr[label_png];
          // default color
          if (color === undefined) {
               color = 'SLATEGREY';
          }
    // console.log('in loop  label_png = ' + label_png + ' this.colorArr[label_png] =  ' + this.colorArr[label_png]);

          // tslint:disable-next-line:max-line-length
          publicInstitutionJsonArr.push(this.initPublicInstitutionJson(name, position_new, label_png, html, color, size, 'inst', this.iconUrl, minDist, maxDist));
    // console.log('in loop i = ' + i + ' json = ' + publicInstitutionJsonArr[i]);

        }
    // console.log('after loop  length = ' + publicInstitutionJsonArr.length);

        // loop ends
        // resolve(publicInstitutionJsonArr);
        // return publicInstitutionJsonArr;
      }
    );
    // promise ends
    // console.log('out resArrPromise  = ');
    // console.log(resArrPromise);

    return Promise.all(publicInstitutionJsonArr).then(
      (res) => res
    );
  }

  initPublicInstitutionJson(
    name,
    position,
    img_name,
    description,
    color,
    marker_size,
    type,
    labels_url,
    minDist,
    maxDist
  ): Promise<any> {

    const img_url = labels_url.concat(img_name);
    const pinBuilder = new Cesium.PinBuilder();
    const url = Cesium.buildModuleUrl(img_url);

    const st1 = 'Cesium.Color.';
    const col = st1.concat(color);


    // tslint:disable-next-line:no-eval
    return Cesium.when(pinBuilder.fromUrl(url, eval(col), marker_size), function(canvas) {
        return {
            name: name,
            type: type,
            description: description,
            position: position,
            billboard: {
                image: canvas.toDataURL(),
                verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                // scaleByDistance: new Cesium.NearFarScalar(1500, 0.3, 200, 1.0),
                distanceDisplayCondition: new Cesium.DistanceDisplayCondition(minDist, maxDist),
            }
        };
    });

  }
}
