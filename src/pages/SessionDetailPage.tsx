import React, { useState, useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  ArrowLeft,
  Calendar,
  Timer,
  Ruler,
  Zap,
  Heart,
  Trash2,
  ExternalLink,
  RefreshCw,
  Trophy,
} from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { useData } from '../context/DataContext';
import Layout from '../components/layout/Layout';
import StatCard from '../components/ui/StatCard';
import RunCard from '../components/ui/RunCard';
import Loading from '../components/ui/Loading';
import SessionSpeedChart from '../components/charts/SessionSpeedChart';
import { formatDuration, formatDistance } from '../utils/runDetection';
import { PumpRun } from '../types';

const SessionDetailPage: React.FC = () => {
  const { sessionId } = useParams<{ sessionId: string }>();
  const navigate = useNavigate();
  const { getSession, deleteSession, reprocessSession, config, isLoading } = useData();
  const [selectedRun, setSelectedRun] = useState<PumpRun | null>(null);
  const [isReprocessing, setIsReprocessing] = useState(false);

  const session = useMemo(() => {
    if (!sessionId) return null;
    return getSession(sessionId);
  }, [sessionId, getSession]);

  // Find the longest run by duration
  const longestRun = useMemo(() => {
    if (!session || session.runs.length === 0) return null;
    return session.runs.reduce((longest, run) =>
      run.duration > longest.duration ? run : longest
    );
  }, [session]);

  const handleDelete = () => {
    if (!session) return;
    if (confirm('Êtes-vous sûr de vouloir supprimer cette session ?')) {
      deleteSession(session.id);
      navigate('/sessions');
    }
  };

  const handleReprocess = async () => {
    if (!session) return;
    setIsReprocessing(true);
    await reprocessSession(session.id);
    setIsReprocessing(false);
  };

  if (isLoading) {
    return (
      <Layout>
        <Loading message="Chargement de la session..." />
      </Layout>
    );
  }

  if (!session) {
    return (
      <Layout>
        <div className="text-center py-12">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Session non trouvée
          </h2>
          <p className="text-gray-500 mb-4">
            Cette session n'existe pas ou a été supprimée.
          </p>
          <Link to="/sessions" className="btn-primary">
            Retour aux sessions
          </Link>
        </div>
      </Layout>
    );
  }

  const formattedDate = format(new Date(session.date), 'EEEE d MMMM yyyy à HH:mm', {
    locale: fr,
  });

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div className="flex items-start space-x-4">
            <button
              onClick={() => navigate(-1)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="h-5 w-5 text-gray-600" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{session.name}</h1>
              <p className="text-gray-500 mt-1 flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                {formattedDate}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={handleReprocess}
              disabled={isReprocessing}
              className="btn-secondary flex items-center space-x-2"
              title="Réanalyser avec les paramètres actuels"
            >
              <RefreshCw
                className={`h-4 w-4 ${isReprocessing ? 'animate-spin' : ''}`}
              />
              <span className="hidden sm:inline">Réanalyser</span>
            </button>
            <a
              href={`https://www.strava.com/activities/${session.stravaActivityId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary flex items-center space-x-2"
            >
              <ExternalLink className="h-4 w-4" />
              <span className="hidden sm:inline">Voir sur Strava</span>
            </a>
            <button
              onClick={handleDelete}
              className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
              title="Supprimer la session"
            >
              <Trash2 className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Nombre de tours"
            value={session.stats.numberOfRuns}
            icon={<Zap className="h-5 w-5 text-ocean-600" />}
          />
          <StatCard
            title="Temps total de pump"
            value={formatDuration(session.stats.totalPumpingTime)}
            icon={<Timer className="h-5 w-5 text-ocean-600" />}
          />
          <StatCard
            title="Distance totale"
            value={formatDistance(session.stats.totalPumpingDistance)}
            icon={<Ruler className="h-5 w-5 text-ocean-600" />}
          />
          <StatCard
            title="Vitesse max"
            value={`${session.stats.bestMaxSpeed.toFixed(1)} km/h`}
            icon={<Zap className="h-5 w-5 text-ocean-600" />}
          />
        </div>

        {/* Averages */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <StatCard
            title="Durée moyenne par tour"
            value={formatDuration(session.stats.averageRunDuration)}
            subtitle={`Meilleur: ${formatDuration(session.stats.longestRunDuration)}`}
            variant="primary"
          />
          <StatCard
            title="Distance moyenne par tour"
            value={formatDistance(session.stats.averageRunDistance)}
            subtitle={`Meilleur: ${formatDistance(session.stats.longestRunDistance)}`}
            variant="primary"
          />
          <StatCard
            title="Vitesse moyenne"
            value={`${session.stats.bestAverageSpeed.toFixed(1)} km/h`}
            subtitle={`Max: ${session.stats.bestMaxSpeed.toFixed(1)} km/h`}
            variant="primary"
          />
        </div>

        {/* Heart Rate Stats */}
        {session.stats.averageHeartrate && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Heart className="h-5 w-5 text-red-500 mr-2" />
              Fréquence cardiaque
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Moyenne</p>
                <p className="text-2xl font-bold text-gray-900">
                  {session.stats.averageHeartrate} bpm
                </p>
              </div>
              {session.stats.maxHeartrate && (
                <div>
                  <p className="text-sm text-gray-500">Maximum</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {session.stats.maxHeartrate} bpm
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Longest Run Focus */}
        {longestRun && (
          <div className="bg-gradient-to-br from-ocean-50 to-ocean-100 rounded-xl shadow-sm border border-ocean-200 p-4 sm:p-6">
            <h2 className="text-lg font-semibold text-ocean-900 mb-4 flex items-center">
              <Trophy className="h-5 w-5 text-ocean-600 mr-2" />
              Tour le plus long
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              <div className="bg-white/70 rounded-lg p-3">
                <p className="text-xs text-ocean-600 font-medium">Durée</p>
                <p className="text-xl font-bold text-ocean-900">
                  {formatDuration(longestRun.duration)}
                </p>
              </div>
              <div className="bg-white/70 rounded-lg p-3">
                <p className="text-xs text-ocean-600 font-medium">Distance</p>
                <p className="text-xl font-bold text-ocean-900">
                  {formatDistance(longestRun.distance)}
                </p>
              </div>
              <div className="bg-white/70 rounded-lg p-3">
                <p className="text-xs text-ocean-600 font-medium">Vitesse moy.</p>
                <p className="text-xl font-bold text-ocean-900">
                  {longestRun.averageSpeed.toFixed(1)} km/h
                </p>
              </div>
              <div className="bg-white/70 rounded-lg p-3">
                <p className="text-xs text-ocean-600 font-medium">Vitesse max</p>
                <p className="text-xl font-bold text-ocean-900">
                  {longestRun.maxSpeed.toFixed(1)} km/h
                </p>
              </div>
              {longestRun.averageHeartrate && (
                <div className="bg-white/70 rounded-lg p-3">
                  <p className="text-xs text-ocean-600 font-medium">FC moyenne</p>
                  <p className="text-xl font-bold text-ocean-900">
                    {longestRun.averageHeartrate} bpm
                  </p>
                </div>
              )}
              {(longestRun.startHeartrate || longestRun.endHeartrate) && (
                <div className="bg-white/70 rounded-lg p-3">
                  <p className="text-xs text-ocean-600 font-medium">FC début → fin</p>
                  <p className="text-xl font-bold text-ocean-900">
                    {longestRun.startHeartrate ?? '—'} → {longestRun.endHeartrate ?? '—'}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Speed Chart */}
        <SessionSpeedChart
          session={session}
          config={config}
          selectedRun={selectedRun}
          onSelectRun={setSelectedRun}
        />

        {/* Runs List */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Zap className="h-5 w-5 text-ocean-600 mr-2" />
            Détail des tours ({session.runs.length})
          </h2>
          <div className="space-y-3">
            {session.runs.map((run, index) => (
              <RunCard
                key={run.id}
                run={run}
                index={index}
                isSelected={selectedRun?.id === run.id}
                onClick={() =>
                  setSelectedRun(selectedRun?.id === run.id ? null : run)
                }
              />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SessionDetailPage;
