import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FutureConstructionService {
  constructor() {}

  initFutureConstruction() {
    console.log(' initFutureConstruction() service  ' );
const url = 'http://localhost/net_resources/Models/';
    const jsonFutureConsPromiseArr = [];
    // tslint:disable-next-line:max-line-length
    // const first = this.loadModels(34.85686719418, 32.32799947277, 25, 0.9934683283505, 'http://localhost/net_resources/Models/model_2_leiria_muktan05032018.glb');
    // tslint:disable-next-line:max-line-length
    jsonFutureConsPromiseArr.push(this.loadModels(34.85686719418, 32.32799947277, 25, 0.9934683283505, url + 'model_2_leiria_muktan05032018.glb'));
    jsonFutureConsPromiseArr.push(this.loadModels(34.851559, 32.331168, 25, 0.9907134003931,  url + 'keren_sgula2-1.glb'));
    jsonFutureConsPromiseArr.push(this.loadModels(34.854695, 32.283078, 42.7, 0.9910765714534, url + 'op2_clean.glb')); // very heavy
    // tslint:disable-next-line:max-line-length
    jsonFutureConsPromiseArr.push(this.loadModels(34.85017776489, 32.33044042615, 24, 0.9899541194041, url + 'osishkin_2_kikar_haatsmaut_na.glb'));
    jsonFutureConsPromiseArr.push(this.loadModels(34.85224574804, 32.3298851547, 24, 0.9910460030526, url + 'trans-build.glb'));
    jsonFutureConsPromiseArr.push(this.loadModels(34.855778, 32.335757, 30, 0.9930975859731, url + 'Andrius.glb'));
    jsonFutureConsPromiseArr.push(this.loadModels(34.861336, 32.325998, 30, 0.9958055226787, url + 'Hahaluzim.glb'));
    jsonFutureConsPromiseArr.push(this.loadModels(34.856797, 32.341201, 16.5, 0.9937922233821,  url + 'Ieshua_tahun_1.glb'));
    jsonFutureConsPromiseArr.push(this.loadModels(34.854901, 32.296744, 38, 0.9915606955662,  url + 'meonot_dora.glb'));
    jsonFutureConsPromiseArr.push(this.loadModels(34.85816, 32.33132, 25, 0.9942513523046,  url + 'mitham_gordon.glb'));
    jsonFutureConsPromiseArr.push(this.loadModels(34.854054, 32.337069, 30, 0,  url + 'mitham_harav_kook.glb'));
    jsonFutureConsPromiseArr.push(this.loadModels(34.860523, 32.338837, 20, 0.9957226074992,  url + 'mitham_veizman_beeri.glb'));

    jsonFutureConsPromiseArr.push(this.loadModels(34.864887, 32.340657, 32, 0.9981187676018, url + 'mitham_trumpeldor.glb'));
    jsonFutureConsPromiseArr.push(this.loadModels(34.862001, 32.341205, 17, 0.996579028801, url + 'mitham_sokolov.glb'));
    jsonFutureConsPromiseArr.push(this.loadModels(34.854145, 32.281294, 41, 0.9907337181013, url + 'mitham_shitrit.glb'));
    jsonFutureConsPromiseArr.push(this.loadModels(34.857194, 32.331528, 28, 0.993739906059, url + 'mitham_6iamim_shmuel_hanaziv.glb'));
    jsonFutureConsPromiseArr.push(this.loadModels(34.855821, 32.279677, 38, 0.9915854386774, url + 'kiriat_nordau1.glb'));
    jsonFutureConsPromiseArr.push(this.loadModels(34.870608, 32.341103, 28, 1.001345313809, url + 'ramat_herzl.glb'));



      return  Promise.all(jsonFutureConsPromiseArr).then(
      (jsonFutureConstructionArr) => {
        console.log(' initFutureConstruction() service res ' );
        return jsonFutureConstructionArr;
      }
    );

  }
  loadModels(lon, lat, height, heading, url): Promise<any> {
    console.log(' loadModels() service  ' );

    const entityJsonPromise = new Promise(
      (resolve, reject) => {

        const position = Cesium.Cartesian3.fromDegrees(lon, lat, height);
         heading = Cesium.Math.toRadians(heading);
        const pitch = 0;
        const roll = 0;
        const hpr = new Cesium.HeadingPitchRoll(heading, pitch, roll);
        const orientation = Cesium.Transforms.headingPitchRollQuaternion(
          position,
          hpr
        );

        const entityJson = {
          name: url,
          position: position,
          orientation: orientation,
          type: 'models',
          model: {
            uri: url,
            minimumPixelSize: 126,
            maximumScale: 1,
            clampToGround: false
          }
        };
        resolve(entityJson);
      }
    );
      // return entityJsonPromise.then((entityJson => entityJson));
      return entityJsonPromise;
  }


}
