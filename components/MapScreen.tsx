import React from 'react';
import { SafeAreaView, StyleSheet, Platform } from 'react-native';
import { WebView, WebViewMessageEvent } from 'react-native-webview';

interface Location {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
}

interface MapScreenProps {
  locations: Location[];
  onMarkerPress: (locationId: string) => void;
}

export default function MapScreen({ locations, onMarkerPress }: MapScreenProps) {
  const center = { lat: 20.0, lng: 0.0, zoom: 2 };

  // Génère dynamiquement le JS pour créer chaque marker
  const markersScript = locations.map(loc => `
    const marker_${loc.id} = new google.maps.Marker({
      position: { lat: ${loc.latitude}, lng: ${loc.longitude} },
      map,
      title: "${loc.name.replace(/"/g, '\\"')}"
    });
    marker_${loc.id}.addListener('click', () => {
      window.ReactNativeWebView.postMessage("${loc.id}");
    });
  `).join('\n');

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta name="viewport"
              content="initial-scale=1.0, user-scalable=no" />
        <style>html, body, #map { margin:0; padding:0; height:100%; }</style>
      </head>
      <body>
        <div id="map"></div>
        <script src="https://maps.googleapis.com/maps/api/js?key=TA_CLE_GOOGLE_MAPS"></script>
        <script>
          const map = new google.maps.Map(document.getElementById('map'), {
            center: { lat: ${center.lat}, lng: ${center.lng} },
            zoom: ${center.zoom},
            mapTypeId: 'roadmap'
          });
          ${markersScript}
        </script>
      </body>
    </html>
  `;

  const handleMessage = (e: WebViewMessageEvent) => {
    onMarkerPress(e.nativeEvent.data);
  };

  return (
    <SafeAreaView style={styles.container}>
      <WebView
        style={styles.webview}
        originWhitelist={['*']}
        source={{ html }}
        onMessage={handleMessage}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  webview:   { flex: 1 }
});