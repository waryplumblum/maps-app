import { Component, ElementRef, ViewChild } from '@angular/core';

import { LngLat, Map, Marker } from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"

interface MarkerAndColor {
  color: string;
  marker: Marker;
}

@Component({
  selector: 'app-markers-page',
  templateUrl: './markers-page.component.html',
  styleUrl: './markers-page.component.css'
})
export class MarkersPageComponent {

  @ViewChild('map') divMap?:ElementRef;

  public markers:MarkerAndColor[] = [];
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

  createMarker(){
    if( !this.map ) return;

    const color = '#xxxxxx'.replace(/x/g, y=>(Math.random()*16|0).toString(16));
    const lngLat = this.map.getCenter();

    this.addMarker( lngLat,color );
  }

  addMarker( lngLat:LngLat,color:string ){
    if( !this.map ) return;

    const marker = new Marker({ color: color, draggable: true})
      .setLngLat(lngLat)
      .addTo(this.map)
    this.markers.push({ color,marker });

  }

  deleteMarker( i:number){
    this.markers[i].marker.remove();
    this.markers.splice(i,1);
  }

}
