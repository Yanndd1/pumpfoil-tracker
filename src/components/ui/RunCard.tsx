import React from 'react';
import { Timer, Ruler, Zap, Heart, Map } from 'lucide-react';
import { PumpRun } from '../../types';
import { formatDuration, formatDistance } from '../../utils/runDetection';
import { RunMap } from '../maps';

interface RunCardProps {
  run: PumpRun;
  index: number;
  isSelected?: boolean;
  onClick?: () => void;
  latlng?: [number, number][];
}

const RunCard: React.FC<RunCardProps> = ({ run, index, isSelected, onClick, latlng }) => {
  const hasGpsData = latlng && latlng.length > 0 && run.startIndex < latlng.length;

  return (
    <div
      className={`rounded-lg border transition-all duration-200 ${
        isSelected
          ? 'border-ocean-500 bg-ocean-50 shadow-sm'
          : 'border-gray-200 bg-white hover:border-ocean-300 hover:shadow-sm'
      }`}
    >
      <div
        onClick={onClick}
        className={`p-3 ${onClick ? 'cursor-pointer' : ''}`}
      >
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-ocean-100 text-ocean-700 font-bold text-sm">
              {index + 1}
            </span>
            {hasGpsData && (
              <span title="Données GPS disponibles">
                <Map className="h-4 w-4 text-ocean-400" />
              </span>
            )}
          </div>
          <div className="flex items-center space-x-2 text-xs text-gray-500">
            <span>{formatDuration(run.startTime)} - {formatDuration(run.endTime)}</span>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-3">
          <div className="flex items-center space-x-1.5">
            <Timer className="h-3.5 w-3.5 text-gray-400" />
            <span className="text-sm font-medium text-gray-900">
              {formatDuration(run.duration)}
            </span>
          </div>

          <div className="flex items-center space-x-1.5">
            <Ruler className="h-3.5 w-3.5 text-gray-400" />
            <span className="text-sm font-medium text-gray-900">
              {formatDistance(run.distance)}
            </span>
          </div>

          <div className="flex items-center space-x-1.5">
            <Zap className="h-3.5 w-3.5 text-gray-400" />
            <span className="text-sm font-medium text-gray-900">
              {run.averageSpeed} km/h
            </span>
          </div>

          <div className="flex items-center space-x-1.5">
            <Zap className="h-3.5 w-3.5 text-ocean-500" />
            <span className="text-sm font-medium text-gray-900">
              max {run.maxSpeed} km/h
            </span>
          </div>
        </div>

        {run.averageHeartrate && (
          <div className="mt-2 pt-2 border-t border-gray-100 flex items-center space-x-3 text-sm">
            <div className="flex items-center space-x-1.5">
              <Heart className="h-3.5 w-3.5 text-red-500" />
              <span className="text-gray-600">
                {run.averageHeartrate} bpm
              </span>
            </div>
            {run.maxHeartrate && (
              <span className="text-gray-400">
                max {run.maxHeartrate} bpm
              </span>
            )}
          </div>
        )}
      </div>

      {/* Map displayed when run is selected */}
      {isSelected && hasGpsData && (
        <div className="p-3 pt-0">
          <RunMap
            run={run}
            latlng={latlng}
            runIndex={index}
            height="200px"
          />
        </div>
      )}
    </div>
  );
};

export default RunCard;
