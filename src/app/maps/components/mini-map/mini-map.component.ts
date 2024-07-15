import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';

import { LngLat, Map, Marker } from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"

@Component({
  selector: 'maps-mini-map',
  templateUrl: './mini-map.component.html',
  styleUrl: './mini-map.component.css'
})
export class MiniMapComponent implements AfterViewInit{

  @Input() lngLat?: [number,number];
  @ViewChild('map') divMap?:ElementRef;

  public map?:Map;
  // public currentLngLat:LngLat = new LngLat(-103.29396589339024, 20.634026187927958);

  ngAfterViewInit(): void {
    if( !this.divMap?.nativeElement ) throw "Map Div not found."   ;
    if( !this.lngLat                ) throw "LngLat can't be null.";

    const map = new Map({
      container: this.divMap.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.lngLat, // starting position [lng, lat]
      zoom: 15, // starting zoom
      interactive: false
    });

    new Marker()
      .setLngLat( this.lngLat )
      .addTo( map )


  }

}
