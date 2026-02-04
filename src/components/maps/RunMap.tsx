import React, { useMemo } from 'react';
import { MapContainer, TileLayer, Polyline, CircleMarker, Tooltip, useMap } from 'react-leaflet';
import { LatLngBoundsExpression, LatLngTuple } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { PumpRun } from '../../types';

interface RunMapProps {
  run: PumpRun;
  latlng: [number, number][];
  runIndex: number;
  height?: string;
}

// Component to fit map bounds
const FitBounds: React.FC<{ bounds: LatLngBoundsExpression }> = ({ bounds }) => {
  const map = useMap();
  React.useEffect(() => {
    map.fitBounds(bounds, { padding: [30, 30] });
  }, [map, bounds]);
  return null;
};

const RunMap: React.FC<RunMapProps> = ({
  run,
  latlng,
  runIndex,
  height = '250px',
}) => {
  // Get coordinates for this run
  const runCoordinates = useMemo<LatLngTuple[]>(() => {
    if (!latlng || latlng.length === 0) return [];

    const coords = latlng
      .slice(run.startIndex, run.endIndex + 1)
      .map(([lat, lng]) => [lat, lng] as LatLngTuple);

    return coords;
  }, [run, latlng]);

  // Calculate bounds for the map
  const bounds = useMemo<LatLngBoundsExpression | null>(() => {
    if (runCoordinates.length === 0) return null;

    const lats = runCoordinates.map(([lat]) => lat);
    const lngs = runCoordinates.map(([, lng]) => lng);

    return [
      [Math.min(...lats), Math.min(...lngs)],
      [Math.max(...lats), Math.max(...lngs)],
    ];
  }, [runCoordinates]);

  // Start and end positions
  const startPosition = runCoordinates[0];
  const endPosition = runCoordinates[runCoordinates.length - 1];

  if (runCoordinates.length === 0) {
    return (
      <div
        className="bg-gray-100 rounded-lg flex items-center justify-center text-gray-500 text-sm"
        style={{ height }}
      >
        <p>Pas de données GPS</p>
      </div>
    );
  }

  return (
    <div className="rounded-lg overflow-hidden border border-gray-200">
      <MapContainer
        style={{ height, width: '100%' }}
        center={startPosition}
        zoom={16}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {bounds && <FitBounds bounds={bounds} />}

        {/* Run track */}
        <Polyline
          positions={runCoordinates}
          color="#0891b2"
          weight={4}
          opacity={0.9}
        >
          <Tooltip sticky>
            <div className="text-sm">
              <strong>Tour {runIndex + 1}</strong>
              <br />
              {run.averageSpeed.toFixed(1)} km/h (max: {run.maxSpeed.toFixed(1)})
            </div>
          </Tooltip>
        </Polyline>

        {/* Start marker */}
        <CircleMarker
          center={startPosition}
          radius={7}
          fillColor="#22c55e"
          fillOpacity={1}
          color="#fff"
          weight={2}
        >
          <Tooltip>Départ du tour</Tooltip>
        </CircleMarker>

        {/* End marker */}
        <CircleMarker
          center={endPosition}
          radius={7}
          fillColor="#ef4444"
          fillOpacity={1}
          color="#fff"
          weight={2}
        >
          <Tooltip>Fin du tour</Tooltip>
        </CircleMarker>
      </MapContainer>
    </div>
  );
};

export default RunMap;
