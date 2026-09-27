import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import MobileNav from './components/MobileNav';
import PrivacyShieldModal from './components/PrivacyShieldModal';
import ReportNeedModal from './components/ReportNeedModal';
import DataMethodModal from './components/DataMethodModal';
import DemoFlowHelper from './components/DemoFlowHelper';
import LandingPage from './pages/LandingPage';
import DashboardPage from './pages/DashboardPage';
import ProjectDetailPage from './pages/ProjectDetailPage';
import CaseDetailPage from './pages/CaseDetailPage';
import DemandIntelligencePage from './pages/DemandIntelligencePage';
import HotspotDetailPage from './pages/HotspotDetailPage';
import DecisionViewPage from './pages/DecisionViewPage';
import { projectsService } from './services/projectsService';
import { evidenceService } from './services/evidenceService';
import { INITIAL_PROJECTS } from './data/mockProjects';
import { INITIAL_DEVELOPMENT_DEMANDS, DEMAND_HOTSPOTS } from './data/mockDemandIntelligence';
import { aggregateReportIntoHotspots, applyGovernmentAction } from './services/hotspotEngine';

export default function App() {
  const [projects, setProjects] = useState(INITIAL_PROJECTS);
  const [demands, setDemands] = useState(INITIAL_DEVELOPMENT_DEMANDS);
  const [hotspots, setHotspots] = useState(DEMAND_HOTSPOTS);
  const [isLiveSupabase, setIsLiveSupabase] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentRole, setCurrentRole] = useState('citizen');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isReportNeedModalOpen, setIsReportNeedModalOpen] = useState(false);
  const [isDataMethodModalOpen, setIsDataMethodModalOpen] = useState(false);
  const [selectedProjectIdForUpload, setSelectedProjectIdForUpload] = useState(null);

  useEffect(() => {
    let isMounted = true;

    async function loadData() {
      setIsLoading(true);
      try {
        const result = await projectsService.getAllProjects();
        if (isMounted) {
          setProjects(result.projects);
          setIsLiveSupabase(result.isLiveSupabase);
        }
      } catch (err) {
        console.warn('Error loading projects, using fallback dataset:', err);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    loadData();
    return () => { isMounted = false; };
  }, []);

  const handleOpenUpload = (projectId) => {
    setSelectedProjectIdForUpload(projectId || (projects[0] ? projects[0].id : ''));
    setIsModalOpen(true);
  };

  const handleCloseUpload = () => {
    setIsModalOpen(false);
    setSelectedProjectIdForUpload(null);
  };

  const handleOpenReportNeed = () => {
    setIsReportNeedModalOpen(true);
  };

  const handleCloseReportNeed = () => {
    setIsReportNeedModalOpen(false);
  };

  // Step 5: Full loop from citizen report to hotspot aggregation & priority re-calculation
  const handleDemandSubmitted = (newDemand) => {
    setDemands(prev => [newDemand, ...prev]);
    setHotspots(prevHotspots => {
      const { updatedHotspots } = aggregateReportIntoHotspots(newDemand, prevHotspots);
      return updatedHotspots;
    });
  };

  // Government action handling on a hotspot
  const handleUpdateHotspot = (hotspotId, action) => {
    setHotspots(prev => applyGovernmentAction(prev, hotspotId, action));
  };

  // Step 7: Update project lifecycle status, government response, or resolution
  const handleUpdateProject = (projectId, updates) => {
    setProjects(prevProjects => {
      return prevProjects.map(proj => {
        if (proj.id === projectId) {
          return {
            ...proj,
            ...updates,
            lastUpdated: new Date().toISOString().split('T')[0]
          };
        }
        return proj;
      });
    });
  };

  // Handles evidence submission and updates case counts and timeline
  const handleEvidenceSubmitted = async (targetProjectId, newEvidence, matchResult) => {
    setProjects(prevProjects => {
      return prevProjects.map(proj => {
        if (proj.id === targetProjectId) {
          const currentTimeline = proj.evidenceTimeline || [];
          const isNewCase = matchResult?.isNewCase;
          const currentCasesCount = proj.casesCount || 0;
          
          return {
            ...proj,
            evidenceTimeline: [newEvidence, ...currentTimeline],
            evidenceCount: currentTimeline.length + 1,
            casesCount: isNewCase ? currentCasesCount + 1 : currentCasesCount
          };
        }
        return proj;
      });
    });

    if (isLiveSupabase) {
      await evidenceService.submitEvidence(targetProjectId, newEvidence);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f8f9fa] text-slate-900 overflow-x-clip">
      
      <Navbar 
        onOpenUpload={handleOpenUpload}
        onOpenReportNeed={handleOpenReportNeed}
        onOpenDataMethod={() => setIsDataMethodModalOpen(true)}
        currentRole={currentRole}
        onSelectRole={setCurrentRole}
        isLiveSupabase={isLiveSupabase}
      />

      <main className="flex-1 pb-16 md:pb-0">
        <Routes>
          <Route 
            path="/" 
            element={
              <LandingPage 
                onOpenUpload={handleOpenUpload} 
                onOpenReportNeed={handleOpenReportNeed}
                onOpenDataMethod={() => setIsDataMethodModalOpen(true)}
                projects={projects} 
                demands={demands}
                hotspots={hotspots}
              />
            } 
          />
          <Route 
            path="/dashboard" 
            element={
              <DashboardPage 
                projects={projects} 
                demands={demands}
                hotspots={hotspots}
                onOpenUpload={handleOpenUpload} 
                onOpenReportNeed={handleOpenReportNeed}
                onOpenDataMethod={() => setIsDataMethodModalOpen(true)}
                onUpdateHotspot={handleUpdateHotspot}
                onUpdateProject={handleUpdateProject}
                isLiveSupabase={isLiveSupabase}
                isLoading={isLoading}
                currentRole={currentRole}
              />
            } 
          />
          <Route 
            path="/evidence" 
            element={
              <DashboardPage 
                initialTab="evidence"
                projects={projects} 
                demands={demands}
                hotspots={hotspots}
                onOpenUpload={handleOpenUpload} 
                onOpenReportNeed={handleOpenReportNeed}
                onOpenDataMethod={() => setIsDataMethodModalOpen(true)}
                onUpdateHotspot={handleUpdateHotspot}
                onUpdateProject={handleUpdateProject}
                isLiveSupabase={isLiveSupabase}
                isLoading={isLoading}
                currentRole={currentRole}
              />
            } 
          />
          <Route 
            path="/data" 
            element={
              <DashboardPage 
                initialTab="data"
                projects={projects} 
                demands={demands}
                hotspots={hotspots}
                onOpenUpload={handleOpenUpload} 
                onOpenReportNeed={handleOpenReportNeed}
                onOpenDataMethod={() => setIsDataMethodModalOpen(true)}
                onUpdateHotspot={handleUpdateHotspot}
                onUpdateProject={handleUpdateProject}
                isLiveSupabase={isLiveSupabase}
                isLoading={isLoading}
                currentRole={currentRole}
              />
            } 
          />
          <Route 
            path="/intelligence" 
            element={
              <DemandIntelligencePage 
                hotspots={hotspots}
                onOpenReportNeed={handleOpenReportNeed} 
              />
            } 
          />
          <Route 
            path="/intelligence/hotspot/:id" 
            element={
              <HotspotDetailPage />
            } 
          />
          <Route 
            path="/decision" 
            element={
              <DecisionViewPage 
                hotspots={hotspots}
                onUpdateHotspot={handleUpdateHotspot}
                projects={projects}
              />
            } 
          />
          <Route 
            path="/decision-view" 
            element={
              <DecisionViewPage 
                hotspots={hotspots}
                onUpdateHotspot={handleUpdateHotspot}
                projects={projects}
              />
            } 
          />
          <Route 
            path="/decision-view/:id" 
            element={
              <DecisionViewPage 
                hotspots={hotspots}
                onUpdateHotspot={handleUpdateHotspot}
                projects={projects}
              />
            } 
          />
          <Route 
            path="/project/:id" 
            element={
              <ProjectDetailPage 
                projects={projects} 
                hotspots={hotspots}
                onOpenUpload={handleOpenUpload} 
                onUpdateProject={handleUpdateProject}
                currentRole={currentRole} 
              />
            } 
          />
          <Route 
            path="/case/:id" 
            element={
              <CaseDetailPage 
                onOpenUpload={handleOpenUpload} 
                currentRole={currentRole} 
              />
            } 
          />
        </Routes>
      </main>

      <Footer 
        isLiveSupabase={isLiveSupabase} 
        onOpenDataMethod={() => setIsDataMethodModalOpen(true)}
      />

      <MobileNav 
        onOpenUpload={handleOpenUpload} 
        onOpenReportNeed={handleOpenReportNeed}
      />

      <PrivacyShieldModal
        isOpen={isModalOpen}
        onClose={handleCloseUpload}
        preselectedProjectId={selectedProjectIdForUpload}
        projects={projects}
        onEvidenceSubmitted={handleEvidenceSubmitted}
      />

      <ReportNeedModal
        isOpen={isReportNeedModalOpen}
        onClose={handleCloseReportNeed}
        onDemandSubmitted={handleDemandSubmitted}
        hotspots={hotspots}
      />

      <DataMethodModal
        isOpen={isDataMethodModalOpen}
        onClose={() => setIsDataMethodModalOpen(false)}
      />

      <DemoFlowHelper
        onOpenReportNeed={handleOpenReportNeed}
      />

    </div>
  );
}