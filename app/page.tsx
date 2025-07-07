"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Copy, Heart, Check } from "lucide-react";
import Link from "next/link";
import confetti from "canvas-confetti";
import { toast } from "sonner"; // new toast system

const quotes = [
  // Success
  { topic: "success", text: "Success is not final, failure is not fatal: It is the courage to continue that counts." },
  { topic: "success", text: "Don’t watch the clock; do what it does. Keep going." },
  { topic: "success", text: "Success usually comes to those who are too busy to be looking for it." },
  { topic: "success", text: "The secret of success is to do the common thing uncommonly well." },
  { topic: "success", text: "Success is walking from failure to failure with no loss of enthusiasm." },

  // Life
  { topic: "life", text: "Life is what happens when you're busy making other plans." },
  { topic: "life", text: "Get busy living or get busy dying." },
  { topic: "life", text: "The purpose of our lives is to be happy." },
  { topic: "life", text: "Life is short, and it is up to you to make it sweet." },
  { topic: "life", text: "In the middle of every difficulty lies opportunity." },

  // Love
  { topic: "love", text: "Love all, trust a few, do wrong to none." },
  { topic: "love", text: "Where there is love there is life." },
  { topic: "love", text: "To love and be loved is to feel the sun from both sides." },
  { topic: "love", text: "The best thing to hold onto in life is each other." },
  { topic: "love", text: "Love does not dominate; it cultivates." },

  // Happiness
  { topic: "happiness", text: "Happiness is not something ready-made. It comes from your own actions." },
  { topic: "happiness", text: "For every minute you are angry you lose sixty seconds of happiness." },
  { topic: "happiness", text: "Happiness depends upon ourselves." },
  { topic: "happiness", text: "The most simple things can bring the most happiness." },
  { topic: "happiness", text: "Happiness is a direction, not a place." },

  // Courage
  { topic: "courage", text: "Courage is resistance to fear, mastery of fear – not absence of fear." },
  { topic: "courage", text: "You cannot swim for new horizons until you have courage to lose sight of the shore." },
  { topic: "courage", text: "Have the courage to follow your heart and intuition." },
  { topic: "courage", text: "It takes courage to grow up and become who you really are." },
  { topic: "courage", text: "Courage starts with showing up and letting ourselves be seen." },

  // Wisdom
  { topic: "wisdom", text: "The only true wisdom is in knowing you know nothing." },
  { topic: "wisdom", text: "Turn your wounds into wisdom." },
  { topic: "wisdom", text: "Knowledge speaks, but wisdom listens." },
  { topic: "wisdom", text: "Wisdom is not a product of schooling but of the lifelong attempt to acquire it." },
  { topic: "wisdom", text: "Wisdom begins in wonder." },

  // Learning
  { topic: "learning", text: "Live as if you were to die tomorrow. Learn as if you were to live forever." },
  { topic: "learning", text: "The beautiful thing about learning is that no one can take it away from you." },
  { topic: "learning", text: "A wise man can learn more from a foolish question than a fool can learn from a wise answer." },
  { topic: "learning", text: "Tell me and I forget. Teach me and I remember. Involve me and I learn." },
  { topic: "learning", text: "Learning never exhausts the mind." },

  // Change
  { topic: "change", text: "Be the change that you wish to see in the world." },
  { topic: "change", text: "Change your thoughts and you change your world." },
  { topic: "change", text: "Progress is impossible without change, and those who cannot change their minds cannot change anything." },
  { topic: "change", text: "Don't be afraid to give up the good to go for the great." },
  { topic: "change", text: "Change is the law of life." },

  // Failure
  { topic: "failure", text: "Failure is simply the opportunity to begin again, this time more intelligently." },
  { topic: "failure", text: "Success is not built on success. It's built on failure." },
  { topic: "failure", text: "Only those who dare to fail greatly can ever achieve greatly." },
  { topic: "failure", text: "Failures are finger posts on the road to achievement." },
  { topic: "failure", text: "Don’t fear failure. Fear being in the exact same place next year." },

  // Growth
  { topic: "growth", text: "Strive not to be a success, but rather to be of value." },
  { topic: "growth", text: "Growth is never by mere chance; it is the result of forces working together." },
  { topic: "growth", text: "The key to growth is the introduction of higher dimensions of consciousness." },
  { topic: "growth", text: "Without continual growth and progress, such words as improvement and achievement have no meaning." },
  { topic: "growth", text: "Every moment is a fresh beginning." }
];


export default function Home() {
  const [topic, setTopic] = useState("");
  const [filteredQuotes, setFilteredQuotes] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [randomTopic, setRandomTopic] = useState("");
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [favourites, setFavourites] = useState<string[]>([]);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem("favouriteQuotes");
    if (stored) setFavourites(JSON.parse(stored));
  }, []);

  if (!mounted) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setRandomTopic("");

    const results = quotes
      .filter((q) => q.topic.toLowerCase() === topic.toLowerCase())
      .slice(0, 3)
      .map((q) => q.text);

    setFilteredQuotes(results);
  };

  const handleSurprise = () => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];

    setFilteredQuotes([randomQuote.text]);
    setRandomTopic(randomQuote.topic);
    setSubmitted(false);

    confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
  };

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    toast.success("Copied to clipboard");

    setTimeout(() => setCopiedIndex(null), 1500);
  };

  const handleFavourite = (quote: string) => {
    if (!favourites.includes(quote)) {
      const updated = [...favourites, quote];
      setFavourites(updated);
      localStorage.setItem("favouriteQuotes", JSON.stringify(updated));
      toast.success("Added to favourites 💖");
    } else {
      const updated = favourites.filter((q) => q !== quote);
      setFavourites(updated);
      localStorage.setItem("favouriteQuotes", JSON.stringify(updated));
      toast.error("Removed from favourites 💔");
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-gradient-to-br from-black via-gray-900 to-purple-900 text-white">
      <div className="max-w-md w-full space-y-6">
        <div className="text-center space-y-4">
          <h1 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
            Quote Generator
          </h1>
          <div className="text-base md:text-lg text-gray-400 font-medium space-y-1">
            <p>Need a boost of inspiration?</p>
            <p>
              Type a topic — like <span className="italic text-purple-400">success</span> or{" "}
              <span className="italic text-blue-400">life</span>.
            </p>
            <p>Or click “Surprise Me” ✨</p>
          </div>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <Input
            type="text"
            placeholder="Enter a topic e.g. success"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
          />
          <div className="flex gap-2">
            <Button type="submit" className="w-full">
              Get Quotes
            </Button>
            <Button
              type="button"
              onClick={handleSurprise}
              className="bg-gradient-to-r from-pink-600 via-purple-500 to-indigo-500 text-white hover:opacity-90"
            >
              Surprise Me
            </Button>
          </div>
        </form>

        <div className="space-y-2">
          {filteredQuotes.length > 0 ? (
            filteredQuotes.map((quote, index) => (
              <div
                key={index}
                className="relative p-4 bg-white/10 backdrop-blur-md shadow-lg rounded text-sm border-l-4 border-purple-500"
              >
                <p className="italic pr-10">"{quote}"</p>
                {randomTopic && (
                  <p className="text-right text-xs text-gray-400 mt-1">Topic: {randomTopic}</p>
                )}

                <button
                  onClick={() => handleCopy(quote, index)}
                  className="absolute top-2 right-2 text-purple-400 hover:text-purple-200"
                  aria-label="Copy quote"
                >
                  {copiedIndex === index ? <Check size={16} /> : <Copy size={16} />}
                </button>

                <button
                  onClick={() => handleFavourite(quote)}
                  className="absolute bottom-2 right-2 text-pink-400 hover:text-pink-200"
                  aria-label="Favourite"
                >
                  <Heart size={16} />
                </button>
              </div>
            ))
          ) : (
            submitted && (
              <p className="text-sm text-gray-500">No quotes found for &quot;{topic}&quot;.</p>
            )
          )}
        </div>

        <Link
          href="/favourites"
          className="block text-center text-sm text-gray-400 hover:underline mt-4"
        >
          💖 View My Favourite Quotes
        </Link>
      </div>
    </main>
  );
}
