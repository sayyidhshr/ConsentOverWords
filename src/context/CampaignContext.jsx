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

const API_BASE = '/api';

async function apiFetch(endpoint, options = {}) {
  const res = await fetch(`${API_BASE}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error || errorData.details || `HTTP ${res.status}`);
  }
  return res.json();
}

export const CampaignProvider = ({ children }) => {
  // Backend Connection Status
  const [isBackendConnected, setIsBackendConnected] = useState(false);
  const [isLoadingBackend, setIsLoadingBackend] = useState(true);

  // 1. Stories State (Cached from localStorage or fallback INITIAL_STORIES until backend loads)
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

  // 5. Assessments Database / History
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

  // Synchronize initial data from Next.js Backend & MySQL
  const refreshFromBackend = async () => {
    try {
      setIsLoadingBackend(true);
      const [storiesData, assessmentsData] = await Promise.all([
        apiFetch('/stories?status=all'),
        apiFetch('/assessments')
      ]);

      if (Array.isArray(storiesData) && storiesData.length > 0) {
        setStories(storiesData);
      }
      if (Array.isArray(assessmentsData) && assessmentsData.length > 0) {
        setAssessments(assessmentsData);
      }
      setIsBackendConnected(true);
    } catch (err) {
      console.warn('[ConsentOverWords] Backend API not reached, using local storage cache:', err.message);
      setIsBackendConnected(false);
    } finally {
      setIsLoadingBackend(false);
    }
  };

  useEffect(() => {
    refreshFromBackend();
  }, []);

  // Persist Stories in localStorage as offline fallback
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.STORIES, JSON.stringify(stories));
    } catch (e) {
      console.error('Failed to cache stories:', e);
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

  // Persist Assessments History as offline fallback
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.ASSESSMENTS, JSON.stringify(assessments));
    } catch (e) {
      console.error('Failed to cache assessments:', e);
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

  // Submit New Story: Saves to MySQL DB through Next.js API!
  const submitStory = async (newStoryData) => {
    try {
      const savedStory = await apiFetch('/stories', {
        method: 'POST',
        body: JSON.stringify({
          category: newStoryData.category,
          storyText: newStoryData.storyText,
          feeling: newStoryData.feeling || 'Uncomfortable',
          consentToPublish: Boolean(newStoryData.consentToPublish)
        })
      });

      setStories((prev) => [savedStory, ...prev]);
      setIsBackendConnected(true);
      return savedStory;
    } catch (err) {
      console.warn('[ConsentOverWords] Backend submission fallback to local:', err.message);
      // Fallback local creation if backend temporarily offline
      const localStory = {
        id: `story-${Date.now()}`,
        category: newStoryData.category,
        storyText: newStoryData.storyText,
        feeling: newStoryData.feeling || 'Uncomfortable',
        date: new Date().toISOString(),
        status: 'pending',
        resonanceCount: 0,
        consentToPublish: Boolean(newStoryData.consentToPublish)
      };
      setStories((prev) => [localStory, ...prev]);
      return localStory;
    }
  };

  // Resonate with Story ("You Are Not Alone")
  const toggleResonate = async (storyId) => {
    const isAlreadyResonated = resonatedIds.includes(storyId);
    const action = isAlreadyResonated ? 'decrement' : 'increment';

    // Optimistic UI update
    if (isAlreadyResonated) {
      setResonatedIds((prev) => prev.filter((id) => id !== storyId));
      setStories((prev) =>
        prev.map((s) =>
          s.id === storyId ? { ...s, resonanceCount: Math.max(0, (s.resonanceCount || 1) - 1) } : s
        )
      );
    } else {
      setResonatedIds((prev) => [...prev, storyId]);
      setStories((prev) =>
        prev.map((s) =>
          s.id === storyId ? { ...s, resonanceCount: (s.resonanceCount || 0) + 1 } : s
        )
      );
    }

    try {
      await apiFetch(`/stories/${storyId}/resonate`, {
        method: 'POST',
        body: JSON.stringify({ action })
      });
    } catch (err) {
      console.warn('[ConsentOverWords] Failed to sync resonance with backend:', err.message);
    }
  };

  // Moderation Actions: Approve, Reject, Edit, Delete with Next.js Backend Sync
  const approveStory = async (id) => {
    setStories((prev) =>
      prev.map((s) => (s.id === id ? { ...s, status: 'approved' } : s))
    );
    try {
      await apiFetch(`/stories/${id}`, {
        method: 'PATCH',
        body: JSON.stringify({ status: 'approved' })
      });
    } catch (err) {
      console.error('Failed to sync approve to backend:', err);
    }
  };

  const rejectStory = async (id) => {
    setStories((prev) =>
      prev.map((s) => (s.id === id ? { ...s, status: 'rejected' } : s))
    );
    try {
      await apiFetch(`/stories/${id}`, {
        method: 'PATCH',
        body: JSON.stringify({ status: 'rejected' })
      });
    } catch (err) {
      console.error('Failed to sync reject to backend:', err);
    }
  };

  const updateStoryCategory = async (id, newCategory) => {
    setStories((prev) =>
      prev.map((s) => (s.id === id ? { ...s, category: newCategory } : s))
    );
    try {
      await apiFetch(`/stories/${id}`, {
        method: 'PATCH',
        body: JSON.stringify({ category: newCategory })
      });
    } catch (err) {
      console.error('Failed to sync category update to backend:', err);
    }
  };

  const deleteStory = async (id) => {
    setStories((prev) => prev.filter((s) => s.id !== id));
    try {
      await apiFetch(`/stories/${id}`, {
        method: 'DELETE'
      });
    } catch (err) {
      console.error('Failed to sync delete to backend:', err);
    }
  };

  // Save Awareness Result: Saves to MySQL DB through Next.js API!
  const saveAwarenessResult = async (type, score, total, userAnswers, participantOverride = null) => {
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

    if (type === 'pre') {
      setPreTestResult(resultObj);
      localStorage.setItem(STORAGE_KEYS.PRE_TEST, JSON.stringify(resultObj));
    } else {
      setPostTestResult(resultObj);
      localStorage.setItem(STORAGE_KEYS.POST_TEST, JSON.stringify(resultObj));
    }

    const payload = {
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
      timestamp
    };

    try {
      const savedAssessment = await apiFetch('/assessments', {
        method: 'POST',
        body: JSON.stringify(payload)
      });
      setAssessments((prev) => [savedAssessment, ...prev]);
      return savedAssessment;
    } catch (err) {
      console.warn('[ConsentOverWords] Backend assessment fallback to local:', err.message);
      const localAssessment = {
        id: `assess-${Date.now()}`,
        ...payload,
        syncedToBackend: false
      };
      setAssessments((prev) => [localAssessment, ...prev]);
      return localAssessment;
    }
  };

  // Delete single assessment record from history & MySQL
  const deleteAssessment = async (id) => {
    setAssessments((prev) => prev.filter((a) => a.id !== id));
    try {
      await apiFetch(`/assessments/${id}`, {
        method: 'DELETE'
      });
    } catch (err) {
      console.error('Failed to delete assessment from backend:', err);
    }
  };

  // Reset demo dataset with MySQL Backend re-seed
  const resetDemoData = async () => {
    try {
      const result = await apiFetch('/admin/reset', { method: 'POST' });
      if (result.stories) setStories(result.stories);
      if (result.assessments) setAssessments(result.assessments);
    } catch (err) {
      console.warn('Backend reset unavailable, resetting local dataset:', err);
      setStories(INITIAL_STORIES);
      setAssessments(INITIAL_ASSESSMENTS);
    }
    setResonatedIds([]);
    localStorage.removeItem(STORAGE_KEYS.STORIES);
    localStorage.removeItem(STORAGE_KEYS.RESONATED);
    localStorage.removeItem(STORAGE_KEYS.ASSESSMENTS);
  };

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
        resetDemoData,
        isBackendConnected,
        isLoadingBackend,
        refreshFromBackend
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
