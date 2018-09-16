import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MeasureService {

// viewer;
  constructor() {}

  measure( labels, points, lines, viewerScene, handler) {
    const that = this;

    handler.setInputAction(function(movement, _viewerScene = viewerScene) {
      const feature = _viewerScene.pick(movement.position);
      if (!labels.contains(feature.primitive)) { return; }
      points.remove(feature.primitive.del.first);
      points.remove(feature.primitive.del.second);
      lines.remove(feature.primitive.del.line);
      labels.remove(feature.primitive);
    }, Cesium.ScreenSpaceEventType.MIDDLE_CLICK);

    if (!viewerScene.pickPositionSupported) { return; }
    let first, second, line, label;
    let mid = new Cesium.Cartesian3(); // pre-allocations for fast calc
    const firstCart = new Cesium.Cartographic();
    const secondCart = new Cesium.Cartographic();
    const cartesian = new Cesium.Cartesian3();
    handler.setInputAction(function(movement ,  _viewerScene = viewerScene) {
    // const feature = false;
      const feature = _viewerScene.pick(movement.position);
      if (!feature) { return; }
      if (first) {
        handler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK);
        handler.removeInputAction(Cesium.ScreenSpaceEventType.MOUSE_MOVE);
        return;
      }
      _viewerScene.pickPosition(movement.position, cartesian);
      first = points.add(
        new Cesium.PointPrimitive({
          position: cartesian,
          pixelSize: 10.0,
          color: Cesium.Color.RED,
          outlineColor: Cesium.Color.YELLOW,
          outlineWidth: 2.0
        })
      );
    viewerScene.requestRender();

    }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

    handler.setInputAction(function(movement, _that = that) {
      if (!first) { return; }
     const feature = viewerScene.pick(movement.endPosition);
      if (!feature) { return; }
      if (!second) {
        viewerScene.pickPosition(movement.endPosition, cartesian);
        second = points.add(
          new Cesium.PointPrimitive({
            position: cartesian,
            pixelSize: 10.0,
            color: Cesium.Color.RED,
            outlineColor: Cesium.Color.YELLOW,
            outlineWidth: 2.0
          })
        );
        line = lines.add({
          positions: [first.position, second.position]
        });
        label = labels.add({
          showBackground: true,
          font: '14px monospace',
          horizontalOrigin: Cesium.HorizontalOrigin.LEFT,
          verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
          disableDepthTestDistance: Number.POSITIVE_INFINITY
        });
        label.del = {
          line: line,
          first: first,
          second: second
        };
      } else {
        second.position = viewerScene.pickPosition(movement.endPosition);
        line.positions = [first.position, second.position];
      }
      mid = Cesium.Cartesian3.lerp(first.position, second.position, 0.5, mid);
      const dist = Cesium.Cartesian3.distance(first.position, second.position);
      Cesium.Cartographic.fromCartesian(
        second.position,
        Cesium.Ellipsoid.WGS84,
        secondCart
      );
      Cesium.Cartographic.fromCartesian(
        first.position,
        Cesium.Ellipsoid.WGS84,
        firstCart
      );
      const dz = secondCart.height - firstCart.height;
      const dxy = Math.sqrt(dist * dist - dz * dz);
      label.position = mid;
      label.text =
        'dist = ' +
        dist.toFixed(2) +
        ' m\ndz = ' +
        dz.toFixed(2) +
        ' m\ndxy = ' +
        dxy.toFixed(2) +
        ' m';
    viewerScene.requestRender();
    }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
  }
}
