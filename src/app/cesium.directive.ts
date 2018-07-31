import { Directive, ElementRef, OnInit } from '@angular/core';

@Directive({
  selector: '[appCesium]'
})
export class CesiumDirective implements OnInit {

  constructor(private el: ElementRef) {}

  ngOnInit() {
 // Construct the timeline

 let today: any = new Date();
 let dd: any = today.getDate();
 let mm: any = today.getMonth() + 1; // January is 0!
 const yyyy: any = today.getFullYear();

 if (dd < 10) {
   dd = '0' + dd;
 }

 if (mm < 10) {
   mm = '0' + mm;
 }

 today = yyyy + '-' + mm + '-' + dd;

 let tomorrow: any = new Date();
 tomorrow.setDate(tomorrow.getDate() + 1);

 let ddt: any = tomorrow.getDate();
 let mmt: any = tomorrow.getMonth() + 1; // January is 0!
 const yyyyt: any = tomorrow.getFullYear();

 if (ddt < 10) {
   ddt = '0' + ddt;
 }

 if (mmt < 10) {
   mmt = '0' + mmt;
 }

 tomorrow = yyyyt + '-' + mmt + '-' + ddt;

 today = today + 'T06:00:00';
 const start = '2018-01-01';
 tomorrow = '2018-12-31';
    const clock = new Cesium.Clock({
      startTime : Cesium.JulianDate.fromIso8601(start),
      currentTime : Cesium.JulianDate.fromIso8601(today),
      stopTime : Cesium.JulianDate.fromIso8601(tomorrow),
      clockRange : Cesium.ClockRange.LOOP_STOP, // loop when we hit the end time
      clockStep : Cesium.ClockStep.SYSTEM_CLOCK_MULTIPLIER,
      multiplier : 4000, // how much time to advance each tick
      shouldAnimate : false // Animation on by default
      });
    const viewer = new Cesium.Viewer(this.el.nativeElement, {
      shouldAnimate : true,
      vrButton: true,
      shadows: true,
      infoBox : true,
      clockViewModel : new Cesium.ClockViewModel(clock), // clockview used for shadows
  });
  viewer.infoBox.frame.sandbox = 'allow-same-origin allow-top-navigation allow-pointer-lock allow-popups allow-forms allow-scripts';
//   const b = new Cesium.Billboard();
//   b.alignedAxis = Cesium.Cartesian3.UNIT_Z;
// b.rotation = -Cesium.Math.PI_OVER_TWO;
// b.color = Cesium.Color.YELLOW;
//   const canvas = viewer.canvas;
//   const scene = viewer.scene;
//   canvas.setAttribute('tabindex', '0');
//   canvas.onclick = function() {
//     canvas.focus();
//     console.log(' canvas clicked!!!');
// };
//   const rgba = Cesium.Color.RED.toRgba();

//   // disable the default event handlers
// scene.screenSpaceCameraController.enableRotate = false;
// scene.screenSpaceCameraController.enableTranslate = false;
// scene.screenSpaceCameraController.enableZoom = false;
// scene.screenSpaceCameraController.enableTilt = false;
// scene.screenSpaceCameraController.enableLook = false;

  }

}
