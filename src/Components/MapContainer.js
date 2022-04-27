import React from 'react';
import { GoogleApiWrapper, Map, Marker } from 'google-maps-react';
import { Component } from 'react';


export class MapContainer extends Component { 

   render() {

      return (
         <Map 
            google={this.props.google} 
            zoom={14}
            style={{
               height:"50%",
               width:"75%"
            }}
            initialCenter={{
               lat:this.props.lat,
               lng:this.props.lng
            }}
            >
             <Marker 
                  name={'Current location'} 
             />
             
          </Map>
      );
   }
}
export default GoogleApiWrapper({
       apiKey: process.env.REACT_APP_GOOGLE_API_KEY
})(MapContainer)
