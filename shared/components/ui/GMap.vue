<template>
  <div class="GMap" />
</template>

<script>
import { mapGetters } from 'vuex'
// import gmapsInit from '~/shared/lib/gmaps'
// Included inside plugins
export default {
  name: 'GMap',
  async mounted() {
    var map, infoWindow
    let username = ''
    if (this.user) username = this.user.firstName + ' ' + this.user.lastName
    try {
      // const google = await gmapsInit()
      const geocoder = new google.maps.Geocoder()
      // var myLatlng = new google.maps.LatLng(-34.397, 150.644)
      var mapOptions = {
        // center: { lat: 19.315, lng: 84.7941 },
        zoom: 14,
        mapTypeId: 'roadmap',
        disableDefaultUI: true,
      }
      infoWindow = new google.maps.InfoWindow()
      map = new google.maps.Map(this.$el, mapOptions)
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          function (position) {
            var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            }

            // infoWindow.setPosition(pos)
            // infoWindow.setContent('Location found.')
            // infoWindow.open(map)
            map.setCenter(pos)
            var marker = new google.maps.Marker({
              position: pos,
              map: map,
              title: username,
            })
          },
          function () {
            console.log('Map Loading Error!')
            // handleLocationError(true, infoWindow, map.getCenter())
          }
        )
      } else {
        console.log('Map Loading Error!')
        // Browser doesn't support Geolocation
        // handleLocationError(false, infoWindow, map.getCenter())
      }
      // geocoder.geocode({ address: 'Sunabeda' }, (results, status) => {
      //   if (status !== 'OK' || !results[0]) {
      //     throw new Error(status)
      //   }

      //   map.setCenter(results[0].geometry.location)
      //   // map.fitBounds(results[0].geometry.viewport)
      // })
    } catch (error) {
      console.error('Err:::', error)
    }
  },
  computed: {
    ...mapGetters({ user: 'auth/user' }),
  },
}
</script>

<style>
html,
body {
  margin: 0;
  padding: 0;
}

.App {
  width: 100vw;
  height: 100vh;
}
</style>
