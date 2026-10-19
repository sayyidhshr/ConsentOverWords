import React, { useState } from 'react';
import { CampaignProvider } from './context/CampaignContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { CampaignPosterSection } from './components/CampaignPosterSection';
import { LearnSection } from './components/LearnSection';
import { VoicesSection } from './components/VoicesSection';
import { WhatCanIDoSection } from './components/WhatCanIDoSection';
import { ShareStorySection } from './components/ShareStorySection';
import { CommunityInsight } from './components/CommunityInsight';
import { Footer } from './components/Footer';
import { AwarenessCheckModal } from './components/AwarenessCheckModal';
import { AdminDashboardModal } from './components/AdminDashboardModal';

// Simple /admin route detection for the Admin Dashboard
const isAdminRoute = () =>
  typeof window !== 'undefined' &&
  (window.location.pathname === '/admin' || window.location.search.includes('admin=1'));

export const AppContent = () => {
  const [awarenessOpen, setAwarenessOpen] = useState(false);
  const [awarenessMode, setAwarenessMode] = useState('pre');
  const [adminOpen, setAdminOpen] = useState(isAdminRoute());

  const openAwareness = (mode) => {
    setAwarenessMode(mode);
    setAwarenessOpen(true);
  };

  return (
    <div>
      <Navbar onOpenAwareness={openAwareness} />

      <main>
        {/* Hero + Why It Matters (combined in Hero component) */}
        <Hero onOpenAwareness={openAwareness} />

        {/* Official Campaign Poster & Instagram Engagement Section */}
        <CampaignPosterSection />

        {/* Core Pages */}
        <LearnSection onOpenAwareness={openAwareness} />
        <VoicesSection />
        <WhatCanIDoSection />
        <ShareStorySection />

        {/* Secondary Sections (accessible via footer links) */}
        <CommunityInsight />
      </main>

      <Footer onOpenAwareness={openAwareness} />

      {/* Modals */}
      <AwarenessCheckModal
        isOpen={awarenessOpen}
        mode={awarenessMode}
        onClose={() => setAwarenessOpen(false)}
      />

      {/* Admin Dashboard Modal — accessed via /admin or ?admin=1 */}
      <AdminDashboardModal
        isOpen={adminOpen}
        onClose={() => setAdminOpen(false)}
      />
    </div>
  );
};

function App() {
  return (
    <CampaignProvider>
      <AppContent />
    </CampaignProvider>
  );
}

export default App;
