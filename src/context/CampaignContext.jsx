import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_STORIES, INITIAL_ASSESSMENTS } from '../data/seedData';

const CampaignContext = createContext();

const STORAGE_KEYS = {
  STORIES: 'cow_stories_v1',
  RESONATED: 'cow_resonated_stories',
  PRE_TEST: 'cow_awareness_pre',
  POST_TEST: 'cow_awareness_post',
  ADMIN_AUTH: 'cow_admin_session',
  PARTICIPANT: 'cow_participant_profile',
  ASSESSMENTS: 'cow_assessments_history'
};

export const CampaignProvider = ({ children }) => {
  // 1. Stories State
  const [stories, setStories] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.STORIES);
      return saved ? JSON.parse(saved) : INITIAL_STORIES;
    } catch {
      return INITIAL_STORIES;
    }
  });

  // 2. Resonated stories (to prevent multiple votes per story per user session)
  const [resonatedIds, setResonatedIds] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.RESONATED);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // 3. Participant Profile (Identity for Pre-Check & Post-Check)
  const [participant, setParticipant] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PARTICIPANT);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // 4. Pre & Post Awareness Quiz Logs
  const [preTestResult, setPreTestResult] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PRE_TEST);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [postTestResult, setPostTestResult] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.POST_TEST);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // 5. Assessments Database / History (Ready for Backend Synchronization)
  const [assessments, setAssessments] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ASSESSMENTS);
      return saved ? JSON.parse(saved) : INITIAL_ASSESSMENTS;
    } catch {
      return INITIAL_ASSESSMENTS;
    }
  });

  // 6. Admin Auth
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(() => {
    try {
      return localStorage.getItem(STORAGE_KEYS.ADMIN_AUTH) === 'true';
    } catch {
      return false;
    }
  });

  // Persist Stories
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.STORIES, JSON.stringify(stories));
    } catch (e) {
      console.error('Failed to save stories:', e);
    }
  }, [stories]);

  // Persist Resonated
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.RESONATED, JSON.stringify(resonatedIds));
    } catch (e) {
      console.error('Failed to save resonated IDs:', e);
    }
  }, [resonatedIds]);

  // Persist Assessments History (Ready for Backend Synchronization)
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.ASSESSMENTS, JSON.stringify(assessments));
    } catch (e) {
      console.error('Failed to save assessments history:', e);
    }
  }, [assessments]);

  // Save / Update Participant Identity
  const saveParticipant = (data) => {
    const updated = {
      id: participant?.id || `usr-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
      name: data.name?.trim() || 'Anonim',
      institution: data.institution?.trim() || 'Umum',
      email: data.email?.trim() || '',
      role: data.role || 'Mahasiswa',
      updatedAt: new Date().toISOString()
    };
    setParticipant(updated);
    try {
      localStorage.setItem(STORAGE_KEYS.PARTICIPANT, JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to save participant profile:', e);
    }
    return updated;
  };

  // Submit New Story (Lands in Pending for moderation)
  const submitStory = (newStoryData) => {
    const newStory = {
      id: `story-${Date.now()}`,
      category: newStoryData.category,
      storyText: newStoryData.storyText,
      feeling: newStoryData.feeling || 'Uncomfortable',
      date: new Date().toISOString(),
      status: 'pending', // Moderation required
      resonanceCount: 0,
      consentToPublish: Boolean(newStoryData.consentToPublish)
    };

    setStories((prev) => [newStory, ...prev]);
    return newStory;
  };

  // Resonate with Story ("You Are Not Alone")
  const toggleResonate = (storyId) => {
    if (resonatedIds.includes(storyId)) {
      // Remove resonance
      setResonatedIds((prev) => prev.filter((id) => id !== storyId));
      setStories((prev) =>
        prev.map((s) =>
          s.id === storyId ? { ...s, resonanceCount: Math.max(0, (s.resonanceCount || 1) - 1) } : s
        )
      );
    } else {
      // Add resonance
      setResonatedIds((prev) => [...prev, storyId]);
      setStories((prev) =>
        prev.map((s) =>
          s.id === storyId ? { ...s, resonanceCount: (s.resonanceCount || 0) + 1 } : s
        )
      );
    }
  };

  // Moderation Actions
  const approveStory = (id) => {
    setStories((prev) =>
      prev.map((s) => (s.id === id ? { ...s, status: 'approved' } : s))
    );
  };

  const rejectStory = (id) => {
    setStories((prev) =>
      prev.map((s) => (s.id === id ? { ...s, status: 'rejected' } : s))
    );
  };

  const updateStoryCategory = (id, newCategory) => {
    setStories((prev) =>
      prev.map((s) => (s.id === id ? { ...s, category: newCategory } : s))
    );
  };

  const deleteStory = (id) => {
    setStories((prev) => prev.filter((s) => s.id !== id));
  };

  // Save Awareness Result (with Participant Identity & Backend API Sync schema)
  const saveAwarenessResult = (type, score, total, userAnswers, participantOverride = null) => {
    const activeParticipant = participantOverride || participant || {
      id: `usr-${Date.now()}`,
      name: 'Anonim',
      institution: 'Umum',
      email: '',
      role: 'Mahasiswa'
    };

    const pct = Math.round((score / total) * 100);
    const timestamp = new Date().toISOString();

    const resultObj = {
      score,
      total,
      percentage: pct,
      timestamp,
      userAnswers,
      participant: activeParticipant
    };

    // Update active pre / post result in context & storage
    if (type === 'pre') {
      setPreTestResult(resultObj);
      localStorage.setItem(STORAGE_KEYS.PRE_TEST, JSON.stringify(resultObj));
    } else {
      setPostTestResult(resultObj);
      localStorage.setItem(STORAGE_KEYS.POST_TEST, JSON.stringify(resultObj));
    }

    // Append to assessments history for backend tracking and admin export
    const assessmentEntry = {
      id: `assess-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
      participantId: activeParticipant.id,
      name: activeParticipant.name,
      institution: activeParticipant.institution,
      email: activeParticipant.email,
      role: activeParticipant.role,
      mode: type,
      score,
      total,
      percentage: pct,
      answers: userAnswers,
      timestamp,
      syncedToBackend: true
    };

    setAssessments(prev => [assessmentEntry, ...prev]);

    // Simulated Backend Webhook / Console Dispatch
    console.info('[ConsentOverWords Backend Integration] 🚀 Assessment payload prepared for backend:', {
      endpoint: '/api/v1/assessments/submit',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: assessmentEntry
    });

    return assessmentEntry;
  };

  // Delete single assessment record from history
  const deleteAssessment = (id) => {
    setAssessments(prev => prev.filter(a => a.id !== id));
  };

  // Reset assessments history to seed dataset
  const resetAssessments = () => {
    setAssessments(INITIAL_ASSESSMENTS);
    localStorage.removeItem(STORAGE_KEYS.ASSESSMENTS);
  };

  // Admin Auth Helpers
  const adminLogin = (password) => {
    if (password === 'admin123' || password === 'consent2026') {
      setIsAdminLoggedIn(true);
      localStorage.setItem(STORAGE_KEYS.ADMIN_AUTH, 'true');
      return true;
    }
    return false;
  };

  const adminLogout = () => {
    setIsAdminLoggedIn(false);
    localStorage.removeItem(STORAGE_KEYS.ADMIN_AUTH);
  };

  // Reset to initial demo dataset
  const resetDemoData = () => {
    setStories(INITIAL_STORIES);
    setResonatedIds([]);
    setAssessments(INITIAL_ASSESSMENTS);
    localStorage.removeItem(STORAGE_KEYS.STORIES);
    localStorage.removeItem(STORAGE_KEYS.RESONATED);
    localStorage.removeItem(STORAGE_KEYS.ASSESSMENTS);
  };

  // Derived Values
  const approvedStories = stories.filter((s) => s.status === 'approved');
  const pendingStories = stories.filter((s) => s.status === 'pending');
  const rejectedStories = stories.filter((s) => s.status === 'rejected');

  return (
    <CampaignContext.Provider
      value={{
        stories,
        approvedStories,
        pendingStories,
        rejectedStories,
        resonatedIds,
        submitStory,
        toggleResonate,
        approveStory,
        rejectStory,
        updateStoryCategory,
        deleteStory,
        participant,
        saveParticipant,
        preTestResult,
        postTestResult,
        saveAwarenessResult,
        assessments,
        deleteAssessment,
        resetAssessments,
        isAdminLoggedIn,
        adminLogin,
        adminLogout,
        resetDemoData
      }}
    >
      {children}
    </CampaignContext.Provider>
  );
};

export const useCampaign = () => {
  const context = useContext(CampaignContext);
  if (!context) {
    throw new Error('useCampaign must be used within a CampaignProvider');
  }
  return context;
};
