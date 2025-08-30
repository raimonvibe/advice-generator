'use client';

import { useState, useEffect } from 'react';
import { Moon, Sun, RefreshCw, Lightbulb, Sparkles } from 'lucide-react';

interface AdviceData {
  slip: {
    id: number;
    advice: string;
  };
}

export default function AdviceGenerator() {
  const [advice, setAdvice] = useState<string>('Click the button to get some advice!');
  const [loading, setLoading] = useState<boolean>(false);
  const [darkMode, setDarkMode] = useState<boolean>(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const isDark = savedTheme === 'dark' || (!savedTheme && prefersDark);
    
    setDarkMode(isDark);
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
  }, []);

  useEffect(() => {
    fetchAdvice();
  }, []);

  const fetchAdvice = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://api.adviceslip.com/advice');
      const data: AdviceData = await response.json();
      setAdvice(data.slip.advice);
    } catch (error) {
      setAdvice('Oops! Could not fetch advice. Try again later.');
    } finally {
      setLoading(false);
    }
  };

  const toggleTheme = () => {
    const newTheme = !darkMode;
    setDarkMode(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme ? 'dark' : 'light');
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
  };

  return (
    <div className="gradient-bg min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-md sm:max-w-lg lg:max-w-xl">
        {/* Theme Toggle */}
        <div className="flex justify-end mb-6">
          <button
            onClick={toggleTheme}
            className="theme-transition p-3 rounded-full bg-card-bg backdrop-blur-sm border border-white/20 hover:scale-110 hover:rotate-12 shadow-lg"
            aria-label="Toggle theme"
          >
            {darkMode ? (
              <Sun className="w-6 h-6 text-gradient-4 transition-transform duration-300" />
            ) : (
              <Moon className="w-6 h-6 text-gradient-1 transition-transform duration-300" />
            )}
          </button>
        </div>

        {/* Main Card */}
        <div className="card-hover bg-card-bg backdrop-blur-sm rounded-3xl p-8 sm:p-10 lg:p-12 shadow-2xl border border-white/20">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Lightbulb className="w-8 h-8 sm:w-10 sm:h-10 text-gradient-3" />
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-gradient-1 via-gradient-2 to-gradient-3 bg-clip-text text-transparent">
                Daily Advice
              </h1>
              <Sparkles className="w-8 h-8 sm:w-10 sm:h-10 text-gradient-5" />
            </div>
          </div>

          {/* Advice Display */}
          <div className="mb-8">
            <div className="bg-gradient-to-r from-gradient-1/10 via-gradient-2/10 to-gradient-3/10 rounded-2xl p-6 sm:p-8 border border-gradient-2/20">
              <p className="text-lg sm:text-xl lg:text-2xl font-medium text-center leading-relaxed italic min-h-[3rem] flex items-center justify-center">
                {loading ? (
                  <span className="flex items-center gap-2">
                    <RefreshCw className="w-5 h-5 animate-spin" />
                    Getting wisdom...
                  </span>
                ) : (
                  advice
                )}
              </p>
            </div>
          </div>

          {/* Action Button */}
          <div className="text-center">
            <button
              onClick={fetchAdvice}
              disabled={loading}
              className="theme-transition bg-gradient-to-r from-gradient-2 via-gradient-3 to-gradient-4 hover:from-gradient-3 hover:via-gradient-4 hover:to-gradient-5 text-white font-semibold py-4 px-8 sm:px-10 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none text-lg sm:text-xl flex items-center gap-3 mx-auto"
            >
              <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
              {loading ? 'Getting Advice...' : 'Get New Advice'}
            </button>
          </div>

          {/* Decorative Elements */}
          <div className="mt-8 flex justify-center space-x-4 opacity-60">
            <div className="w-2 h-2 bg-gradient-1 rounded-full animate-pulse"></div>
            <div className="w-2 h-2 bg-gradient-2 rounded-full animate-pulse delay-100"></div>
            <div className="w-2 h-2 bg-gradient-3 rounded-full animate-pulse delay-200"></div>
            <div className="w-2 h-2 bg-gradient-4 rounded-full animate-pulse delay-300"></div>
            <div className="w-2 h-2 bg-gradient-5 rounded-full animate-pulse delay-500"></div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 opacity-75">
          <p className="text-sm sm:text-base">
            ✨ Powered by wisdom and good vibes ✨
          </p>
        </div>
      </div>
    </div>
  );
}
