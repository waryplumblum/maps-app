import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';

import { LngLat, Map } from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"

@Component({
  selector: 'app-zoom-range-page',
  templateUrl: './zoom-range-page.component.html',
  styleUrl: './zoom-range-page.component.css'
})
export class ZoomRangePageComponent implements AfterViewInit,OnDestroy {


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
    this.mapListener();
  }

  ngOnDestroy(): void {
    this.map?.remove();
  }

  mapListener(){
    if(!this.map) throw 'Mapa no inicializado';
    this.map.on('zoom',(ev) => {
      this.zoom = this.map!.getZoom();
    })
    this.map.on('zoomend',(ev) => {
      if(this.map!.getZoom() < 18) return;
      this.map!.zoomTo(18);
      // this.zoom = this.map!.getZoom();
    })
    this.map.on('move',()=>{
      this.currentLngLat = this.map!.getCenter();
    })
  }

  zoomIn(){
    this.map?.zoomIn();
  }

  zoomOut(){
    this.map?.zoomOut();
  }

  zoomChanged(value:string){
    this.zoom = Number(value);
    this.map?.zoomTo( this.zoom);
  }

}
