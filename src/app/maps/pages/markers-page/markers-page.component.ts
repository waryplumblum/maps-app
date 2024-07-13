import { Component, ElementRef, ViewChild } from '@angular/core';

import { LngLat, Map, Marker } from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"


@Component({
  selector: 'app-markers-page',
  templateUrl: './markers-page.component.html',
  styleUrl: './markers-page.component.css'
})
export class MarkersPageComponent {

  @ViewChild('map') divMap?:ElementRef;

  public zoom:number = 10;
  public map?:Map;
  public currentLngLat:LngLat = new LngLat(-103.29396589339024, 20.634026187927958);

  ngAfterViewInit(): void {

    if ( !this.divMap ) throw 'El elemento HTML no fue encontrado';

    this.map = new Map({
      container: this.divMap.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.currentLngLat, // starting position [lng, lat]
      zoom: this.zoom, // starting zoom
    });
    // this.mapListener();

    // const markerHtml = document.createElement('div');
    // markerHtml.innerHTML = 'Fernanda Herrera'

    // const marker = new Marker({ color: 'red', element: markerHtml })
    //   .setLngLat(this.currentLngLat)
    //   .addTo(this.map)
  }

}
