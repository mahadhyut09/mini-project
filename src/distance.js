import React from 'react'


    function distance(lat1, lon1, lat2, lon2) {
        const R = 6371; // Earth radius in km
        const dLat = degToRad(lat2 - lat1);
        const dLon = degToRad(lon2 - lon1);
        const a =
          Math.sin(dLat / 2) * Math.sin(dLat / 2) +
          Math.cos(degToRad(lat1)) *
            Math.cos(degToRad(lat2)) *
            Math.sin(dLon / 2) *
            Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const d = R * c; // Distance in km
        return d;
      }
      
      function degToRad(degrees) {
        return degrees * (Math.PI / 180);
      }
      
      module.exports = distance;

export default distance