import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_STORIES } from '../data/seedData';

const CampaignContext = createContext();

const STORAGE_KEYS = {
  STORIES: 'cow_stories_v1',
  RESONATED: 'cow_resonated_stories',
  PRE_TEST: 'cow_awareness_pre',
  POST_TEST: 'cow_awareness_post',
  ADMIN_AUTH: 'cow_admin_session'
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

  // 3. Pre & Post Awareness Quiz Logs
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

  // 4. Admin Auth
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

  // Save Awareness Result
  const saveAwarenessResult = (type, score, total, userAnswers) => {
    const resultObj = {
      score,
      total,
      percentage: Math.round((score / total) * 100),
      timestamp: new Date().toISOString(),
      userAnswers
    };

    if (type === 'pre') {
      setPreTestResult(resultObj);
      localStorage.setItem(STORAGE_KEYS.PRE_TEST, JSON.stringify(resultObj));
    } else {
      setPostTestResult(resultObj);
      localStorage.setItem(STORAGE_KEYS.POST_TEST, JSON.stringify(resultObj));
    }
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
    localStorage.removeItem(STORAGE_KEYS.STORIES);
    localStorage.removeItem(STORAGE_KEYS.RESONATED);
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
        preTestResult,
        postTestResult,
        saveAwarenessResult,
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
