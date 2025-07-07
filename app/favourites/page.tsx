"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { X } from "lucide-react";

export default function FavouritesPage() {
  const [favourites, setFavourites] = useState<string[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("favouriteQuotes");
    if (stored) {
      setFavourites(JSON.parse(stored));
    }
  }, []);

  const handleRemove = (quote: string) => {
    const updated = favourites.filter((q) => q !== quote);
    setFavourites(updated);
    localStorage.setItem("favouriteQuotes", JSON.stringify(updated));
    toast.warning("Removed from favourites");
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-gradient-to-br from-black via-gray-900 to-purple-900 text-white">
      <div className="max-w-md w-full space-y-6">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
            My Favourites 💖
          </h1>
          <Link
            href="/"
            className="text-sm text-purple-300 hover:underline"
          >
            ⬅ Go back to Home
          </Link>
        </div>

        {favourites.length > 0 ? (
          favourites.map((quote, index) => (
            <div
              key={index}
              className="relative p-4 bg-white/10 backdrop-blur-md shadow-lg rounded text-sm border-l-4 border-pink-500"
            >
              <p className="italic pr-8">&quot;{quote}&quot;</p>
              <button
                onClick={() => handleRemove(quote)}
                className="absolute top-2 right-2 text-pink-400 hover:text-pink-200 transition"
                aria-label="Remove quote"
              >
                <X size={16} />
              </button>
            </div>
          ))
        ) : (
          <p className="text-center text-sm text-gray-400">
            No favourites yet. Add some from the home page!
          </p>
        )}
      </div>
    </main>
  );



}
