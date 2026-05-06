// src/components/InstallPrompt.jsx
//
// Captures the `beforeinstallprompt` event (Chrome/Edge/Samsung Internet on
// Android) and shows a discreet banner inviting the user to install Sol's
// app to their home screen. iOS Safari does not fire this event — those
// users install via Share → "Add to Home Screen" manually (the manifest
// + apple-touch-icon meta tags still apply).
//
// Dismissal is sticky for 30 days via localStorage so we don't nag users.

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { useLanguage } from "../context/LanguageContext.jsx";

const DISMISS_KEY = "solInstallDismissedAt";
const DISMISS_DAYS = 30;

export default function InstallPrompt() {
  const { language } = useLanguage();
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [show, setShow] = useState(false);

  const t = {
    en: {
      title: "Install SOLadventures",
      subtitle: "Add to home screen for quick paw access 🐾",
      install: "Install",
      dismiss: "Dismiss",
    },
    el: {
      title: "Εγκατέστησε το SOLadventures",
      subtitle: "Πρόσθεσέ το στην αρχική για γρήγορη πρόσβαση 🐾",
      install: "Εγκατάσταση",
      dismiss: "Κλείσιμο",
    },
  }[language];

  useEffect(() => {
    const dismissedAt = parseInt(localStorage.getItem(DISMISS_KEY) || "0", 10);
    const cutoff = Date.now() - DISMISS_DAYS * 24 * 60 * 60 * 1000;
    const recentlyDismissed = dismissedAt > cutoff;

    const handler = (event) => {
      // Stop the browser's default install mini-infobar.
      event.preventDefault();
      setDeferredPrompt(event);
      if (!recentlyDismissed) setShow(true);
    };

    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  // Listen for successful install — hide banner immediately.
  useEffect(() => {
    const onInstalled = () => {
      setShow(false);
      setDeferredPrompt(null);
    };
    window.addEventListener("appinstalled", onInstalled);
    return () => window.removeEventListener("appinstalled", onInstalled);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    await deferredPrompt.userChoice;
    setDeferredPrompt(null);
    setShow(false);
  };

  const handleDismiss = () => {
    setShow(false);
    localStorage.setItem(DISMISS_KEY, String(Date.now()));
  };

  if (!show) return null;

  return (
    <div
      className="fixed bottom-28 md:bottom-20 left-4 right-4 md:left-auto md:right-6 md:max-w-sm
                 z-[1100] bg-white rounded-2xl shadow-[0_8px_24px_rgba(170,77,200,0.25)]
                 border border-[#f8bbd0] p-4 flex items-start gap-3"
      role="dialog"
      aria-label={t.title}
    >
      <img
        src="/icons/pwa-192.png"
        alt=""
        className="w-12 h-12 rounded-xl flex-shrink-0"
        width="48"
        height="48"
      />
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-[#6a1b9a] text-sm">{t.title}</p>
        <p className="text-[#5b2b7b] text-xs mt-0.5">{t.subtitle}</p>
        <div className="flex gap-2 mt-2">
          <button
            onClick={handleInstall}
            className="px-3 py-1.5 bg-[#c187d8] text-white text-xs font-bold rounded-full
                       hover:scale-105 transition-transform shadow"
          >
            {t.install}
          </button>
        </div>
      </div>
      <button
        onClick={handleDismiss}
        className="p-1 rounded-full hover:bg-[#fce4ec] transition-colors flex-shrink-0"
        aria-label={t.dismiss}
      >
        <X className="w-4 h-4 text-[#5b2b7b]" />
      </button>
    </div>
  );
}
