import {Injectable} from '@angular/core';

declare let H: any;

export class HereMapFunction {
  private map;
  private ui;
  private behavior;
  private bubble;

  constructor(map: any, behavior: any, ui: any) {
    this.map = map;
    this.behavior = behavior;
    this.ui = ui;
  }

  openBubble(position, text) {
    if (!this.bubble) {
      this.bubble = new H.ui.InfoBubble(
        position,
        {content: text});
      this.ui.addBubble(this.bubble);
    } else {
      this.bubble.setPosition(position);
      this.bubble.setContent(text);
      this.bubble.open();
    }
  }

  createMarker(latitude: any, longitude: any, label: any) {
    const marker = new H.map.Marker({lat: latitude, lng: longitude}, {
      volatility: true
    });
    marker.draggable = true;
    marker.addEventListener('tap', (ev) => {
      this.map.setCenter(ev.target.getGeometry());
      this.openBubble(ev.target.getGeometry(), label);
    }, false);
    this.map.addEventListener('dragstart', (ev) => {
      const target = ev.target;
      const pointer = ev.currentPointer;
      if (target instanceof H.map.Marker) {
        const targetPosition = this.map.geoToScreen(target.getGeometry());
        target.offset = new H.math.Point(pointer.viewportX - targetPosition.x, pointer.viewportY - targetPosition.y);
        this.behavior.disable();
      }
    }, false);
    this.map.addEventListener('dragend', (ev) => {
      const target = ev.target;
      if (target instanceof H.map.Marker) {
        this.behavior.enable();
      }
    }, false);
    this.map.addEventListener('drag', (ev) => {
      const target = ev.target;
      const pointer = ev.currentPointer;
      if (target instanceof H.map.Marker) {
        target.setGeometry(this.map.screenToGeo(pointer.viewportX - target.offset.x, pointer.viewportY - target.offset.y));
      }
    }, false);
    return marker;
  }
}
