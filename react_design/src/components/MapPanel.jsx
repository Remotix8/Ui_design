import React, { useEffect, useRef } from 'react';
import './MapPanel.css';

const MapPanel = () => {
  const mapRef = useRef(null);

  useEffect(() => {
    const initMap = () => {
      const container = mapRef.current;
      const options = {
        center: new window.kakao.maps.LatLng(36.3172155256843, 127.242026015092),
        level: 3
      };

      const map = new window.kakao.maps.Map(container, options);
      
      const marker = new window.kakao.maps.Marker({
        position: options.center
      });
      marker.setMap(map);
      
      const zoomControl = new window.kakao.maps.ZoomControl();
      map.addControl(zoomControl, window.kakao.maps.ControlPosition.RIGHT);
      
      const mapTypeControl = new window.kakao.maps.MapTypeControl();
      map.addControl(mapTypeControl, window.kakao.maps.ControlPosition.TOPRIGHT);
    };

    const script = document.createElement('script');
    script.src = '//dapi.kakao.com/v2/maps/sdk.js?appkey=09353682caee403f91118b946610d963&autoload=false';
    script.async = true;
    
    script.onload = () => {
      window.kakao.maps.load(() => {
        initMap();
      });
    };

    if (!document.querySelector('script[src*="dapi.kakao.com"]')) {
      document.head.appendChild(script);
    } else if (window.kakao && window.kakao.maps) {
      window.kakao.maps.load(() => {
        initMap();
      });
    }

    return () => {
      // cleanup if needed
    };
  }, []);

  return (
    <div className="map-panel">
      <h2 className="panel-title">Map</h2>
      <div ref={mapRef} className="map-view" />
    </div>
  );
};

export default MapPanel; 