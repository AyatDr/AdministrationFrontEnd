import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import '@mapbox/leaflet-omnivore';
import html2canvas from 'html2canvas';
import * as L from 'leaflet';
import { Map } from 'leaflet';
import 'leaflet-omnivore';
import proj4 from 'proj4';
import 'proj4leaflet';
import { Parcel, Vertex } from 'src/app/pages/Projet/Model/parcelle/parcelle';
import { HttpService } from 'src/app/services/http.service';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
})

export class MapComponent implements AfterViewInit {

  @Input() khibrat:boolean = true;
  //type latLng = LatLngExpression;
  @Input() height:string = '90vh';
  @Input() parcel:Parcel;
  @Input() data:Boolean = true;

  @Input() kmlUrl: File;

  @Output() pointInfo: EventEmitter<any> = new EventEmitter<any>();



  @ViewChild('mapElement') mapContainer: ElementRef<HTMLDivElement>;
  @Output() vertex: EventEmitter<Vertex> = new EventEmitter<Vertex>();
  typeMap:any = "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}" ;
  
  constructor(private http:HttpService, private cd: ChangeDetectorRef,private router: Router) { }

  private map:Map; 

  mission:any;
  DistancePoints:any []= [];

  // Add a variable to store polygon vertices
  polygonVertices: L.LatLng[] = [];
  private drawingMode: boolean = false; // Indicateur de mode de dessin
  // Add a variable to store the drawn polygon
  drawnPolygon: L.Polygon;
  ngAfterViewInit(): void {
    proj4.defs(
      'EPSG:26191',
      '+proj=lcc +lat_1=33.3 +lat_0=33.3 +lon_0=-5.4 +k_0=0.999625769 +x_0=500000 +y_0=300000 +a=6378249.2 +b=6356515 +towgs84=31,146,47,0,0,0,0 +units=m +no_defs +1/f=293.466023'
    );

    this. map= L.map('map');//L.CRS.EPSG432;
    this.map.setView([35.5731, -5.3728], 13)
    L.tileLayer(this.typeMap, {
      minZoom: 2,
      maxZoom: 18,
    }).addTo(this.map);
    
    console.log(this.map.options.crs);

    if(this.data){
      this.http.getData('/project/list').subscribe(res=>{
        this.extractDraw(res,false);
      })
    }

    // if (this.kmlUrl) {
    //   this.loadKmlFile(this.kmlUrl);
    // }
    // L.omnivore.kml('a.kml').addTo(this.map);



    this.map.on('click', (event: any) => {
        let pt=[Number(event.latlng.lng), Number(event.latlng.lat)];
        let pointIn26191 = proj4( "EPSG:4326","EPSG:26191", pt);
        this.pointInfo.emit(pointIn26191)
        const marker = L.marker([Number(event.latlng.lat), Number(event.latlng.lng)]).addTo(this.map);
        marker.bindPopup(`X = ${pointIn26191[0].toFixed(2)} °<br> Y = ${pointIn26191[1].toFixed(2)} °`).openPopup();
        marker.on('click', (e: any) => {
          if (e.latlng) {
            const latIndex = this.DistancePoints.indexOf(e.latlng.lat);
            if (latIndex !== -1) this.DistancePoints.splice(latIndex, 1);
            const lngIndex = this.DistancePoints.indexOf(e.latlng.lng);
            if (lngIndex !== -1) this.DistancePoints.splice(lngIndex, 1);
            this.map.removeLayer(marker);
          }
        });
    
      
      if(this.mission == 'coordonnees'){
         marker.bindPopup(`X = ${event.latlng.lng.toFixed(2)} °<br> Y = ${event.latlng.lat.toFixed(2)} °`).openPopup();
      }else if (this.mission == 'distance'){
        if (this.DistancePoints.length == 4) this.DistancePoints = [];
        this.DistancePoints.push(event.latlng.lat);
        this.DistancePoints.push(event.latlng.lng);
        if(this.DistancePoints.length == 4) marker.bindPopup('La distance entre les deux points : ' + this.calculateDistance(this.DistancePoints[0], this.DistancePoints[1], this.DistancePoints[2], this.DistancePoints[3])).openPopup();
      }else if (this.mission == 'area') {
        this.activatePolygonMode();
      }
      else if (this.mission == 'delete'){
        this.map.removeLayer(this.drawnPolygon);
      }
}
    );
  }
  extractDraw(expertise:any[], displayMarkers:boolean) {
    expertise.forEach((el)=>{
      // console.log(el)
      if (el.geomstring2) {
        const polygonPoints = el.geomstring2.match(/\d+\.\d+\s\d+\.\d+/g);
        const vertices = polygonPoints.map((point: any) => {
          const [x, y] = point.split(' ').map(Number);
          return { x, y };
        });
        vertices.forEach((vertex: any, index: any) => {
          vertex.label = `B.${index + 1}`;
        });
        vertices.pop();
        let parcelVertex = new Parcel(1, '33-28-2-A', 'T.N', vertices.length, vertices, 11738);
        if(!this.data) this.vertex.emit(vertices);
        this.drawParcel(
          parcelVertex, 
          el,
          displayMarkers
        );
      }
    })
  }

  drawPoint(vertex: any[]) {
    proj4.defs(
      'EPSG:26191',
      '+proj=lcc +lat_1=33.3 +lat_0=33.3 +lon_0=-5.4 +k_0=0.999625769 +x_0=500000 +y_0=300000 +a=6378249.2 +b=6356515 +towgs84=31,146,47,0,0,0,0 +units=m +no_defs +1/f=293.466023'
    );
    let latlngs: [number, number][] = [];
    console.log(vertex[0])
    // let pt=[Number(vertex[0].x), Number(vertex[0].y)]
    // let pointIn26191 = proj4( "EPSG:4326","EPSG:26191", pt);
    latlngs.push([Number(vertex[0].y), Number(vertex[0].x)])
  }
  
  
  
  
  drawParcel(parcel: Parcel, labelText: any, displayMarkers: boolean = true) {
    // console.log(labelText)
   // proj4.defs("EPSG:3857", "+proj=merc +a=6378137 +b=6378137 +lat_ts=0 +lon_0=0 +x_0=0 +y_0=0 +k=1 +units=m +nadgrids=@null +wktext +no_defs +typeMap=crs");
    const sourceProjection = 'EPSG:26191'; // WGS 84
    const destinationProjection ='EPSG:4326';// 'EPSG:4326';
    //const latlngs: [number, number][] = parcel.vertexes.map(vertex => proj4(sourceProjection, destinationProjection, [vertex.x, vertex.y]));
    // console.log(parcel.vertexes)
    var  latlngs: [number, number][] = [];
    parcel.vertexes.forEach(function(pointIn26191) {
      var pointIn4326 = proj4("EPSG:26191", "EPSG:4326", pointIn26191);
      latlngs.push([pointIn4326.y, pointIn4326.x])
    });
    // console.log(latlngs);
    const bounds = new L.LatLngBounds(latlngs);
    // Create the polygon
    const polygon = L.polygon(latlngs).addTo(this.map);
    polygon.on('mousemove', (event: any) => { 
      polygon.bindPopup(`<p>La surface : ${this.calculatePolygonArea(parcel.vertexes)} m²</p><p>${labelText?.numero_ordre || ''}</p>`).openPopup();
    });
    polygon.on('click', (event: any) => {
      // Navigate to case details page when polygon is clicked
      this.router.navigate(['apps/Project/', labelText.id_projet]);
  });
    
    // this.exportPolygonAsGeoJSON(polygon);
    // this.downloadMapWithPolygon(polygon)
  
    if (displayMarkers) {
      // Add markers at each vertex
      latlngs.forEach(vertex => {
        let pointIn26191 = proj4( "EPSG:4326","EPSG:26191", vertex);
        // latlngs.push([Number(vertex[0].y), Number(vertex[0].x)])
        console.log(pointIn26191)
        L.marker(pointIn26191).addTo(this.map);
      });
    }
  
    // if (labelText) {
      // Calculate the center of the polygon
      const center = bounds.getCenter();
      
      // Create a custom marker icon with text
      const customIcon = L.divIcon({
        className: 'custom-label-icon',
        html: `<div class="fw-bold fs-6">${labelText?.numero_ordre}</div>`,
        iconSize: [100, 20], // Set the size of the icon as needed
      });
      
      // Add the custom marker with text at the center of the polygon
      L.marker(center, { icon: customIcon }).addTo(this.map);
    // }
  
    // Fit the map to the bounds
    this.map.fitBounds(bounds);
    this.cd.detectChanges();
  }

  // loadKml(url: string) {
  //   const kmlLayer = omnivore.kml(url)
  //     .on('ready', function() {
  //       this.map.fitBounds(kmlLayer.getBounds());
  //     })
  //     .addTo(this.map);
  // }
  loadKmlFile(kmlFile: File): void {
    //L.geoJson.omnivore.kml('/path/to/your.kml').addTo(this.map);
    console.log('ffdfdfdf');
    if (!kmlFile) {
      console.error('KML file is required');
      return;
    }
  
    // Create a FileReader to read the file content
    const reader = new FileReader();
  
    // Define the onload event handler
    reader.onload = (event: any) => {
      // Get the file content from the event
      const fileContent = event.target.result;
      console.log(fileContent);
      //this.kmlLayer = L.geoJSON();

      //this.map = L.map('map').addLayer(L.geoJSON(fileContent));
      // Load the KML data using omnivore
      // const kmlLayer = L.omnivore.kml.parse(fileContent)
      //   .on('ready', () => {
      //     // Zoom to the bounds of the KML file
      //     this.map.fitBounds(kmlLayer.getBounds());
      //   })
      //   .on('error', (error:any) => {
      //     console.error('Failed to load KML file', error);
      //   });
  
      // Add the KML layer to the map
      // kmlLayer.addTo(this.map);
    };
  
    // Read the file content as text
    reader.readAsText(kmlFile);
  }

  
  
  
  
  changeMaptype(newtypeMap: string) {
    this.typeMap = newtypeMap;
    L.tileLayer(this.typeMap, {
      minZoom: 2,
      maxZoom: 50,
    }).addTo(this.map);
  }
  selectedButton: string | null = null;
  selectButton(button: string) {
    if (this.selectedButton === button) {
      this.selectedButton = null;
    } else {
      this.selectedButton = button;
      if (button === 'default') {
        this.changeMaptype('https://tile.openstreetmap.org/{z}/{x}/{y}.png');
      } else if (button === 'satellite') {
        this.changeMaptype('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}');
      } else if (button === 'terrain') {
        this.changeMaptype('https://{s}.tile-cyclosm.openstreetmap.fr/cyclosm/{z}/{x}/{y}.png');
      }
    }
  }


  calculateDistance(lat1: number, lng1: number, lat2: number, lng2: number){
    const earthRadius = 6371; // Earth's radius in kilometers
    const dLat = this.toRadians(lat2 - lat1);
    const dLng = this.toRadians(lng2 - lng1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.toRadians(lat1)) *
        Math.cos(this.toRadians(lat2)) *
        Math.sin(dLng / 2) *
        Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const kilometers = earthRadius * c;
    const meters = kilometers * 1000; // Convert kilometers to meters
    return meters.toFixed(2) + ' m ';
  }

  toRadians(degrees: number): number {
    return degrees * (Math.PI / 180);
  }




  exportPolygonAsGeoJSON(polygon: L.Polygon): void {
    if (!polygon) {
      console.error('No polygon data available to export.');
      return;
    }
  
    // Convert the polygon layer to a GeoJSON object
    const geojson = polygon.toGeoJSON();
  
    // Convert GeoJSON object to string
    const geojsonStr = JSON.stringify(geojson);
  
    // Create a Blob from the GeoJSON string
    const blob = new Blob([geojsonStr], { type: 'application/json;charset=utf-8;' });
  
    // Create a link and download the GeoJSON
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'polygon_data.geojson';
    link.click();
  }

  
  downloadMap(): void {
    html2canvas(this.mapContainer?.nativeElement, {
      useCORS: true,
      scale: window.devicePixelRatio,
      backgroundColor: null
    }).then(canvas => {
      const imgUri = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = 'leaflet_map.png';
      link.href = imgUri;
      document.body.appendChild(link);
      link.click();
      link.remove();
    }).catch(error => {
      console.error('Error capturing map:', error);
    });
  }

 
 

// Activer le mode de dessin
activatePolygonMode() {
  this.drawingMode = true;
  this.map.on('click', this.addPointToPolygon.bind(this));
}

addPointToPolygon(event: L.LeafletMouseEvent) {
  if (!this.drawingMode) return;

  const latlng = event.latlng;
  console.log('Clicked point:', latlng);

  // Vérifiez si le point est déjà dans les vertices
  const isDuplicate = this.polygonVertices.some(p => p.lat === latlng.lat && p.lng === latlng.lng);
  console.log('Is duplicate:', isDuplicate);

  if (!isDuplicate) {
      this.polygonVertices.push(latlng);
      console.log('Polygon vertices:', this.polygonVertices);

      // Dessinez ou mettez à jour le polygone
      if (this.polygonVertices.length > 2) {
          if (this.drawnPolygon) {
              this.map.removeLayer(this.drawnPolygon);
          }

          this.drawnPolygon = L.polygon(this.polygonVertices).addTo(this.map);

          if (this.polygonVertices.length > 2 && !this.isPolygonClosed()) {
              const updatedVertices = [...this.polygonVertices, this.polygonVertices[0]];
              this.drawnPolygon.setLatLngs(updatedVertices);
          }

          this.showPopup();
      }

      if (this.isPolygonClosed()) {
          console.log('Polygon is closed');
          this.drawingMode = false;
          this.map.off('click', this.addPointToPolygon.bind(this));
      }
  }
}




private isPolygonClosed(): boolean {
  return this.polygonVertices.length > 2 &&
         this.polygonVertices[0].lat === this.polygonVertices[this.polygonVertices.length - 1].lat &&
         this.polygonVertices[0].lng === this.polygonVertices[this.polygonVertices.length - 1].lng;
}



    // Ajouter une popup avec la surface calculée
    showPopup() {
      if (this.drawnPolygon) {
          this.drawnPolygon.on('mouseover', () => {
              // Convertir les points au système de projection souhaité
              const vertices: Vertex[] = this.polygonVertices.map((latlng, index) => {
                  const [x, y] = proj4('EPSG:4326', 'EPSG:26191', [latlng.lng, latlng.lat]);
                  return {
                      label: `Point ${index + 1}`,
                      x: x,
                      y: y
                  };
              });

              // Débogage des points
              console.log('Vertices:', vertices);

              // Calculer et afficher la surface
              const area = this.calculatePolygonArea(vertices);
              console.log('Formatted Area:', area); // Vérifiez la valeur formatée

              this.drawnPolygon.bindPopup(`<p>La surface : ${area} m²</p>`).openPopup();
          });
      }
  }

  calculatePolygonArea(vertices: Vertex[]) {
    // Ensure the polygon is closed by duplicating the first vertex at the end
    vertices.push(vertices[0]);
  
    // Calculate the area using the shoelace formula
    let area = 0;
    for (let i = 0; i < vertices.length - 1; i++) {
      const p1 = vertices[i];
      const p2 = vertices[i + 1];
      area += (p2.y - p1.y) * (p2.x + p1.x);
    }
    area = Math.abs(area) / 2;
  
    return area.toFixed(2);
  }

  
}