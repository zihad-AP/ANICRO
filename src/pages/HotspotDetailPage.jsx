import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { DEMAND_HOTSPOTS } from '../data/mockDemandIntelligence';
import HotspotDetail from '../components/HotspotDetail';

export default function HotspotDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Find hotspot by id (e.g. hotspot-01)
  const hotspot = DEMAND_HOTSPOTS.find(h => h.id === id) || DEMAND_HOTSPOTS[0];

  return (
    <div className="min-h-screen bg-slate-50/50 pb-16">
      <HotspotDetail
        hotspot={hotspot}
        isStandalonePage={true}
        onClose={() => navigate('/intelligence')}
      />
    </div>
  );
}
