import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
declare var google: any;

@Injectable({
  providedIn: 'root'
})
export class GoogleGeocoderService {

  constructor() { }
  autocomplete: any;
  geocoder: any;
  input: HTMLInputElement;
  tmpStrG = 'this is tmpStrG';
  boundsToRectangle(bounds) {
    const ne = bounds.getNorthEast();
    const sw = bounds.getSouthWest();
    return new Cesium.Rectangle.fromDegrees(
      sw.lng(),
      sw.lat(),
      ne.lng(),
      ne.lat()
    );
  }
  googleGeocoderInit( input: HTMLInputElement) {

this.input = input;
    console.log(' input.value service init= ');
    console.log(input.value);
    const countryRestrict = {
      'country': 'il'
    };

    // const service = new google.maps.places.PlacesService(document.getElementById('mock'));

    this.geocoder = new google.maps.Geocoder();
    // const link = document.createElement('beijing');
    this.autocomplete = new google.maps.places.Autocomplete(input, {
      placeIdOnly: true,
      componentRestrictions: countryRestrict
    },
  );


  }
  googleInputSuggestions(viewerCamera) {
    // console.log(' input.value service sug= ');
    // console.log(this.geocoder);
    // console.log('this.geocoder.__proto__.geocode.__proto__.toString service sug= ');
    // console.log(this.geocoder.__proto__.geocode.__proto__.toString());

    // this.input.value = 'נתניה ' + this.input.value;
    // console.log('  this.input.value service= ');
    // console.log(this.input.value);

    const place = this.autocomplete.getPlace();
    // console.log(' autocomplete = ');
    // console.log(this.autocomplete);
    if (place ) {
      // console.log(' place = ');
      // console.log(place);
      // console.log(' place.place_id = ');
      // console.log(place.place_id);
      const that = this;
      return this.geocoder.geocode({ placeId: place.place_id }, function(
        results,
        status,
        _that = that,
        _viewerCamera = viewerCamera
      ) {
        if (status !== 'OK') {
            alert('status = ' + status );
            return;
        }
        // console.log('results[0] = ');
        // console.log(results[0]);
        // console.log('status = ');
        // console.log(status);

        // console.log('results[0].geometry.location.lat() = ');
        // console.log(results[0].geometry.location.lat());

        // console.log('results[0].geometry.location.lng() = ');
        // console.log(results[0].geometry.location.lng());

        // console.log('results[0].formatted_address = ');
        // console.log(results[0].formatted_address);
        /**geocoder */

        // console.log(' dest = ' );
        // console.log( dest);

        /**bounded area */
        /**assign viewport to bounds if exist */
        if (!results[0].geometry.bounds) {
          if (results[0].geometry.viewport) {
            results[0].geometry.bounds = results[0].geometry.viewport;
            // this.input.value = '';
          } else {
            // no bounds and no viewport fields exist
            // this.input.value = '';
            return;
          }
        }
        const rectangle = _that.boundsToRectangle(results[0].geometry.bounds);
        console.log(' rectangle  = ');
        console.log(rectangle);
        _viewerCamera.flyTo({
          destination: rectangle
        });
      });
    } else {
      // !place
      // this.input.value = '';
      console.log(' no place   ');
    }
  }



    // This example retrieves autocomplete predictions programmatically from the
      // autocomplete service, and displays them as an HTML list.

      // This example requires the Places library. Include the libraries=places
      // parameter when you first load the API. For example:
      // <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">

     initGoogleMapsPlacesAutocompleteService(): Observable<any> {
      const _that = this;
          console.log('  this.tmpStrG =    ' +  this.tmpStrG);

        const displaySuggestions = function(predictions, status, _tmpStrG = _that.tmpStrG) {
          if (status !== google.maps.places.PlacesServiceStatus.OK) {
            alert(status);
            return;
          }
          // console.log('  _tmpStrG =    ' + _tmpStrG);

          console.log(' service  predictions =    ');
          console.log(predictions);
          // predictions.forEach(function(prediction) {
          //   const li = document.createElement('li');
          //   li.appendChild(document.createTextNode(prediction.description));
          //   document.getElementById('results').appendChild(li);
          // });
          return predictions;
        };

       const service = new google.maps.places.AutocompleteService();
        return service.getQueryPredictions({ input: 'pizza near Arad, Israel' }, displaySuggestions);
      }

}
