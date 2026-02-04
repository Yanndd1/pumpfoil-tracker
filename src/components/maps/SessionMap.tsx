import React, { useMemo } from 'react';
import { MapContainer, TileLayer, Polyline, CircleMarker, Tooltip, useMap } from 'react-leaflet';
import { LatLngBoundsExpression, LatLngTuple } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { PumpfoilSession, PumpRun } from '../../types';

interface SessionMapProps {
  session: PumpfoilSession;
  selectedRun?: PumpRun | null;
  onSelectRun?: (run: PumpRun | null) => void;
  height?: string;
}

// Component to fit map bounds
const FitBounds: React.FC<{ bounds: LatLngBoundsExpression }> = ({ bounds }) => {
  const map = useMap();
  React.useEffect(() => {
    map.fitBounds(bounds, { padding: [20, 20] });
  }, [map, bounds]);
  return null;
};

const SessionMap: React.FC<SessionMapProps> = ({
  session,
  selectedRun,
  onSelectRun,
  height = '400px',
}) => {
  // Get full track coordinates
  const trackCoordinates = useMemo<LatLngTuple[]>(() => {
    if (!session.rawData?.latlng || session.rawData.latlng.length === 0) {
      return [];
    }
    return session.rawData.latlng.map(([lat, lng]) => [lat, lng] as LatLngTuple);
  }, [session.rawData?.latlng]);

  // Calculate bounds for the map
  const bounds = useMemo<LatLngBoundsExpression | null>(() => {
    if (trackCoordinates.length === 0) return null;

    const lats = trackCoordinates.map(([lat]) => lat);
    const lngs = trackCoordinates.map(([, lng]) => lng);

    return [
      [Math.min(...lats), Math.min(...lngs)],
      [Math.max(...lats), Math.max(...lngs)],
    ];
  }, [trackCoordinates]);

  // Get coordinates for each run
  const runSegments = useMemo(() => {
    if (!session.rawData?.latlng) return [];

    return session.runs.map((run, index) => {
      const coords = session.rawData!.latlng!
        .slice(run.startIndex, run.endIndex + 1)
        .map(([lat, lng]) => [lat, lng] as LatLngTuple);

      return {
        run,
        coords,
        index,
      };
    });
  }, [session.runs, session.rawData?.latlng]);

  // Start and end positions
  const startPosition = trackCoordinates[0];
  const endPosition = trackCoordinates[trackCoordinates.length - 1];

  if (trackCoordinates.length === 0) {
    return (
      <div
        className="bg-gray-100 rounded-xl flex items-center justify-center text-gray-500"
        style={{ height }}
      >
        <p>Pas de données GPS disponibles pour cette session</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900 flex items-center">
          <svg className="h-5 w-5 text-ocean-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L16 4m0 13V4m0 0L9 7" />
          </svg>
          Carte de la session
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          Cliquez sur un segment de tour pour le sélectionner
        </p>
      </div>

      <MapContainer
        style={{ height, width: '100%' }}
        center={startPosition}
        zoom={15}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {bounds && <FitBounds bounds={bounds} />}

        {/* Full track (gray background) */}
        <Polyline
          positions={trackCoordinates}
          color="#d1d5db"
          weight={3}
          opacity={0.7}
        />

        {/* Run segments */}
        {runSegments.map(({ run, coords, index }) => {
          const isSelected = selectedRun?.id === run.id;

          return (
            <Polyline
              key={run.id}
              positions={coords}
              color={isSelected ? '#0891b2' : '#22c55e'}
              weight={isSelected ? 6 : 4}
              opacity={isSelected ? 1 : 0.8}
              eventHandlers={{
                click: () => onSelectRun?.(isSelected ? null : run),
              }}
            >
              <Tooltip sticky>
                <div className="text-sm">
                  <strong>Tour {index + 1}</strong>
                  <br />
                  Distance: {(run.distance / 1000).toFixed(2)} km
                  <br />
                  Durée: {Math.floor(run.duration / 60)}:{(run.duration % 60).toString().padStart(2, '0')}
                  <br />
                  Vitesse moy: {run.averageSpeed.toFixed(1)} km/h
                </div>
              </Tooltip>
            </Polyline>
          );
        })}

        {/* Start marker */}
        <CircleMarker
          center={startPosition}
          radius={8}
          fillColor="#22c55e"
          fillOpacity={1}
          color="#fff"
          weight={2}
        >
          <Tooltip>Départ</Tooltip>
        </CircleMarker>

        {/* End marker */}
        <CircleMarker
          center={endPosition}
          radius={8}
          fillColor="#ef4444"
          fillOpacity={1}
          color="#fff"
          weight={2}
        >
          <Tooltip>Arrivée</Tooltip>
        </CircleMarker>
      </MapContainer>

      {/* Legend */}
      <div className="p-3 bg-gray-50 border-t border-gray-200 flex flex-wrap items-center gap-4 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-1 bg-gray-300 rounded"></div>
          <span className="text-gray-600">Parcours complet</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-1 bg-green-500 rounded"></div>
          <span className="text-gray-600">Tours de pump</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-1 bg-cyan-600 rounded"></div>
          <span className="text-gray-600">Tour sélectionné</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
          <span className="text-gray-600">Départ</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-red-500 rounded-full border-2 border-white"></div>
          <span className="text-gray-600">Arrivée</span>
        </div>
      </div>
    </div>
  );
};

export default SessionMap;
