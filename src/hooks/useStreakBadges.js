import { useState, useEffect } from "react";

// Helper: today date in YYYY-MM-DD

function getToday() {
  const today = new Date();
  today.setMinutes(today.getMinutes() - today.getTimezoneOffset());
  return today.toISOString().split("T")[0];
}


export default function useStreakBadges() {
  const [streak, setStreak] = useState(0);
  const [badges, setBadges] = useState([]);
  const [currentBadge, setCurrentBadge] = useState(null);
  const [nextBadge, setNextBadge] = useState(null);
  const [unlockedToday, setUnlockedToday] = useState(false);

  useEffect(() => {
    // 1️⃣ Load badges JSON
    fetch("/data/badges.json")
      .then((res) => res.json())
      .then((data) => setBadges(data.badges || []));
  }, []);

  useEffect(() => {
    // 2️⃣ Check & update streak
    const today = getToday();
    const stored = JSON.parse(localStorage.getItem("solPawStreak")) || {
      streak: 0,
      lastVisit: null
    };

    if (stored.lastVisit === today) {
      // Already counted today
      setStreak(stored.streak);
    } else {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const ymdYesterday = yesterday.toISOString().split("T")[0];

      const newStreak =
        stored.lastVisit === ymdYesterday ? stored.streak + 1 : 1;

      localStorage.setItem(
        "solPawStreak",
        JSON.stringify({ streak: newStreak, lastVisit: today })
      );
      setStreak(newStreak);
    }
  }, []);

  useEffect(() => {
    if (badges.length === 0) return;

    // 3️⃣ Find current & next badge
    const sorted = badges.sort((a, b) => a.day - b.day);
    let current = null;
    let next = null;

    for (let i = 0; i < sorted.length; i++) {
      if (streak >= sorted[i].day) {
        current = sorted[i];
      } else {
        next = sorted[i];
        break;
      }
    }

    setCurrentBadge(current);
    setNextBadge(next);

    // 4️⃣ Check if unlocked new today
    const unlockedKey = `solPawBadgeUnlocked-${getToday()}`;
    if (current && !localStorage.getItem(unlockedKey)) {
      localStorage.setItem(unlockedKey, "true");
      setUnlockedToday(true);
    } else {
      setUnlockedToday(false);
    }
  }, [badges, streak]);

  return {
    streak,
    currentBadge,
    nextBadge,
    unlockedToday
  };
}
