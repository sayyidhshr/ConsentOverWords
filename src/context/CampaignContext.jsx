import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_STORIES, INITIAL_ASSESSMENTS } from '../data/seedData';

const CampaignContext = createContext();

const STORAGE_KEYS = {
  STORIES: 'cow_stories_v1',
  RESONATED: 'cow_resonated_stories',
  PRE_TEST: 'cow_awareness_pre',
  POST_TEST: 'cow_awareness_post',
  PARTICIPANT: 'cow_participant_profile',
};

const API_BASE = '/api';

async function apiFetch(endpoint, options = {}) {
  const res = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    const error = new Error(errorData.error || `HTTP ${res.status}`);
    error.status = res.status;
    throw error;
  }
  return res.json();
}

export const CampaignProvider = ({ children }) => {
  const [isBackendConnected, setIsBackendConnected] = useState(false);
  const [isLoadingBackend, setIsLoadingBackend] = useState(true);

  // 1. Stories (cache localStorage sebagai fallback offline)
  const [stories, setStories] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.STORIES);
      return saved ? JSON.parse(saved) : INITIAL_STORIES;
    } catch {
      return INITIAL_STORIES;
    }
  });

  // 2. Resonated stories
  const [resonatedIds, setResonatedIds] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.RESONATED);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // 3. Participant profile
  const [participant, setParticipant] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PARTICIPANT);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // 4. Pre & Post test
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

  // 5. Assessments: data responden, hanya dimuat untuk admin dan TIDAK disimpan di localStorage
  const [assessments, setAssessments] = useState([]);

  // 6. Admin auth: status berasal dari cookie di server, bukan localStorage
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  // Cek sesi admin saat aplikasi dimuat
  useEffect(() => {
    try {
      localStorage.removeItem('cow_admin_session'); // sisa login lama
    } catch {}
    apiFetch('/admin/session')
      .then((d) => setIsAdminLoggedIn(Boolean(d.loggedIn)))
      .catch(() => setIsAdminLoggedIn(false));
  }, []);

  // Muat data dari backend. Admin: semua cerita + responden. Publik: cerita approved saja.
  const refreshFromBackend = async (admin = isAdminLoggedIn) => {
    try {
      setIsLoadingBackend(true);

      const storiesData = await apiFetch(admin ? '/stories?status=all' : '/stories?status=approved');
      if (Array.isArray(storiesData)) setStories(storiesData);

      if (admin) {
        try {
          const assessmentsData = await apiFetch('/assessments');
          if (Array.isArray(assessmentsData)) setAssessments(assessmentsData);
        } catch (err) {
          if (err.status === 401) {
            // sesi habis
            setIsAdminLoggedIn(false);
            setAssessments([]);
          } else {
            throw err;
          }
        }
      }

      setIsBackendConnected(true);
    } catch (err) {
      console.warn('[ConsentOverWords] Backend API not reached, using local cache:', err.message);
      setIsBackendConnected(false);
    } finally {
      setIsLoadingBackend(false);
    }
  };

  // Muat ulang setiap status login berubah (termasuk saat mount)
  useEffect(() => {
    refreshFromBackend(isAdminLoggedIn);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAdminLoggedIn]);

  // Cache stories
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.STORIES, JSON.stringify(stories));
    } catch (e) {
      console.error('Failed to cache stories:', e);
    }
  }, [stories]);

  // Persist resonated
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.RESONATED, JSON.stringify(resonatedIds));
    } catch (e) {
      console.error('Failed to save resonated IDs:', e);
    }
  }, [resonatedIds]);

  // Save / update participant identity
  const saveParticipant = (data) => {
    const updated = {
      id: participant?.id || `usr-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
      name: data.name?.trim() || 'Anonim',
      institution: data.institution?.trim() || 'Umum',
      email: data.email?.trim() || '',
      role: data.role || 'Mahasiswa',
      updatedAt: new Date().toISOString(),
    };
    setParticipant(updated);
    try {
      localStorage.setItem(STORAGE_KEYS.PARTICIPANT, JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to save participant profile:', e);
    }
    return updated;
  };

  // Submit story
  const submitStory = async (newStoryData) => {
    try {
      const savedStory = await apiFetch('/stories', {
        method: 'POST',
        body: JSON.stringify({
          category: newStoryData.category,
          storyText: newStoryData.storyText,
          feeling: newStoryData.feeling || 'Uncomfortable',
          consentToPublish: Boolean(newStoryData.consentToPublish),
        }),
      });

      // Cerita baru berstatus pending; hanya admin yang boleh melihatnya di daftar
      if (isAdminLoggedIn) setStories((prev) => [savedStory, ...prev]);
      setIsBackendConnected(true);
      return savedStory;
    } catch (err) {
      console.warn('[ConsentOverWords] Backend submission fallback to local:', err.message);
      const localStory = {
        id: `story-${Date.now()}`,
        category: newStoryData.category,
        storyText: newStoryData.storyText,
        feeling: newStoryData.feeling || 'Uncomfortable',
        date: new Date().toISOString(),
        status: 'pending',
        resonanceCount: 0,
        consentToPublish: Boolean(newStoryData.consentToPublish),
      };
      if (isAdminLoggedIn) setStories((prev) => [localStory, ...prev]);
      return localStory;
    }
  };

  // "You're not alone"
  const toggleResonate = async (storyId) => {
    const isAlreadyResonated = resonatedIds.includes(storyId);

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
      await apiFetch(`/stories/${storyId}`, {
        method: 'PATCH',
        body: JSON.stringify({ resonate: !isAlreadyResonated }),
      });
    } catch (err) {
      console.warn('[ConsentOverWords] Failed to sync resonance with backend:', err.message);
    }
  };

  // Moderasi: jika server menolak (mis. sesi habis), tampilan dikembalikan dari server
  const syncModeration = async (endpoint, options) => {
    try {
      await apiFetch(endpoint, options);
    } catch (err) {
      console.error('Moderation sync failed:', err.message);
      if (err.status === 401) setIsAdminLoggedIn(false);
      else refreshFromBackend(isAdminLoggedIn);
    }
  };

  const approveStory = async (id) => {
    setStories((prev) => prev.map((s) => (s.id === id ? { ...s, status: 'approved' } : s)));
    await syncModeration(`/stories/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({ status: 'approved' }),
    });
  };

  const rejectStory = async (id) => {
    setStories((prev) => prev.map((s) => (s.id === id ? { ...s, status: 'rejected' } : s)));
    await syncModeration(`/stories/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({ status: 'rejected' }),
    });
  };

  const updateStoryCategory = async (id, newCategory) => {
    setStories((prev) => prev.map((s) => (s.id === id ? { ...s, category: newCategory } : s)));
    await syncModeration(`/stories/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({ category: newCategory }),
    });
  };

  const deleteStory = async (id) => {
    setStories((prev) => prev.filter((s) => s.id !== id));
    await syncModeration(`/stories/${id}`, { method: 'DELETE' });
  };

  // Simpan hasil kuis
  const saveAwarenessResult = async (type, score, total, userAnswers, participantOverride = null) => {
    const activeParticipant = participantOverride || participant || {
      id: `usr-${Date.now()}`,
      name: 'Anonim',
      institution: 'Umum',
      email: '',
      role: 'Mahasiswa',
    };

    const pct = Math.round((score / total) * 100);
    const timestamp = new Date().toISOString();

    const resultObj = {
      score,
      total,
      percentage: pct,
      timestamp,
      userAnswers,
      participant: activeParticipant,
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
      timestamp,
    };

    try {
      // Server hanya mengembalikan { success, id }
      const saved = await apiFetch('/assessments', {
        method: 'POST',
        body: JSON.stringify(payload),
      });
      const record = { ...payload, id: saved.id };
      if (isAdminLoggedIn) setAssessments((prev) => [record, ...prev]);
      return record;
    } catch (err) {
      console.warn('[ConsentOverWords] Backend assessment fallback to local:', err.message);
      const localAssessment = {
        id: `assess-${Date.now()}`,
        ...payload,
        syncedToBackend: false,
      };
      if (isAdminLoggedIn) setAssessments((prev) => [localAssessment, ...prev]);
      return localAssessment;
    }
  };

  const deleteAssessment = async (id) => {
    setAssessments((prev) => prev.filter((a) => a.id !== id));
    await syncModeration(`/assessments/${id}`, { method: 'DELETE' });
  };

  // Reset demo (khusus admin; route /api/admin/reset juga harus dijaga isAdmin())
  const resetDemoData = async () => {
    try {
      const result = await apiFetch('/admin/reset', { method: 'POST' });
      if (result.stories) setStories(result.stories);
      if (result.assessments) setAssessments(result.assessments);
    } catch (err) {
      console.warn('Backend reset unavailable, resetting local dataset:', err.message);
      setStories(INITIAL_STORIES);
      setAssessments(INITIAL_ASSESSMENTS);
    }
    setResonatedIds([]);
    localStorage.removeItem(STORAGE_KEYS.STORIES);
    localStorage.removeItem(STORAGE_KEYS.RESONATED);
  };

  const resetAssessments = () => {
    setAssessments(INITIAL_ASSESSMENTS);
  };

  // Admin auth: diverifikasi server lewat cookie httpOnly
  const adminLogin = async (password) => {
    try {
      await apiFetch('/admin/login', {
        method: 'POST',
        body: JSON.stringify({ password }),
      });
      setIsAdminLoggedIn(true); // memicu pemuatan data admin
      return true;
    } catch {
      return false;
    }
  };

  const adminLogout = async () => {
    try {
      await apiFetch('/admin/logout', { method: 'POST' });
    } catch (err) {
      console.warn('Logout request failed:', err.message);
    }
    setIsAdminLoggedIn(false); // memicu muat ulang data publik
    setAssessments([]);
    localStorage.removeItem(STORAGE_KEYS.STORIES); // buang cache cerita pending/rejected
  };

  // Derived values
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
        refreshFromBackend,
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