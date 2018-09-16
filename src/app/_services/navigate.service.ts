import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavigateService {
  constructor() {}

  /**calculate moving rate   */
  calculateZoomMovingRate(ellipsoid, position): Promise<any> {
    const res = new Promise(resolve => {
      const cameraHeight = ellipsoid.cartesianToCartographic(position).height;
      const moveRate = cameraHeight / 10.0;
      resolve(moveRate);
    });
    return res;
  }

  navZoomIn(globeEllipsoid, viewerCamera) {
    console.log(' navZoomIn() Service ');

    this.calculateZoomMovingRate(globeEllipsoid, viewerCamera.position).then(
      moveRate => {
        console.log(' navZoomIn() Service  moveRate = ' + moveRate);

        viewerCamera.moveForward(moveRate);
      }
    );
  }

  navZoomOut(globeEllipsoid, viewerCamera) {
    console.log(' navZoomOut() Service ');

    this.calculateZoomMovingRate(globeEllipsoid, viewerCamera.position).then(
      moveRate => {
        console.log(' navZoomOut() Service  moveRate = ' + moveRate);
        viewerCamera.moveBackward(moveRate);
      }
    );
  }

  // TODO navTop() navNorth() should be compared to other projects and  rearange using small functions

  // navTop(width, height, posCartesian, posRadian, sceneCenterCartesian, sceneCenterRad) {
  navTop(
    screenCenter,
    posCartesian,
    posRadian,
    sceneCenterCartesian,
    sceneCenterRad,
    oldHeading
  ): Observable<any> {
    const dist = Cesium.Cartesian3.distance(sceneCenterCartesian, posCartesian);
    const newCamPos = Cesium.Cartesian3.fromRadians(
      sceneCenterRad.longitude,
      sceneCenterRad.latitude,
      sceneCenterRad.height + dist
    );
    // TODO error handling
    if (dist < 0.05) {
      return null;
    } else {
      // TODO flyTo function should recieve parameters instead of json (but pitch field  inconsistent)
      return of({
        destination: newCamPos,
        orientation: {
          heading: oldHeading, // east, default value is 0.0 (north)
          // pitch : Cesium.Math.toRadians(cur_pitch),    // default value (looking down)
          roll: 0.0 // default value
        }
      });
    }
  }

  navNorth(
    screenCenter,
    posCartesian,
    posRadian,
    sceneCenterCartesian,
    sceneCenterRad,
    oldHeading,
    curPitch
  ): Observable<any> {
    const eucDistOfDeg = Math.sqrt(
      Math.pow(sceneCenterRad.longitude - posRadian.longitude, 2) +
      Math.pow(sceneCenterRad.latitude - posRadian.latitude, 2));

      const newCamPosRad = posRadian;
      newCamPosRad.longitude = sceneCenterRad.longitude;
      newCamPosRad.latitude = sceneCenterRad.latitude - eucDistOfDeg;
      newCamPosRad.height = posRadian.height;

     const newCamPos_cartesian = Cesium.Cartesian3.fromRadians(newCamPosRad.longitude, newCamPosRad.latitude, newCamPosRad.height);
      if (oldHeading === 0.0) {
        return null;
      } else {
        return of({
          destination: newCamPos_cartesian,
          orientation: {
            heading: Cesium.Math.toRadians(0.0), // east, default value is 0.0 (north)
            pitch: curPitch, // default value (looking down)
            roll: 0.0 // default value
           }
         });
      }
  }

  navFlyTo(viewerCamera, json) {
    viewerCamera.flyTo(json);
  }
}

