"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// Local quotes array
const quotes = [
	{
		topic: "success",
		text: "Success is not final, failure is not fatal: It is the courage to continue that counts.",
	},
	{
		topic: "success",
		text: "Don’t watch the clock; do what it does. Keep going.",
	},
	{
		topic: "success",
		text: "Success usually comes to those who are too busy to be looking for it.",
	},
	{
		topic: "life",
		text: "Life is what happens when you're busy making other plans.",
	},
	{
		topic: "life",
		text: "Get busy living or get busy dying.",
	},
	{
		topic: "life",
		text: "The purpose of our lives is to be happy.",
	},
];





export default function Home() {
	const [topic, setTopic] = useState("");
	const [filteredQuotes, setFilteredQuotes] = useState<string[]>([]);
	const [submitted, setSubmitted] = useState(false);
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) return null;
	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		setSubmitted(true);

		const results = quotes
			.filter((q) => q.topic.toLowerCase() === topic.toLowerCase())
			.slice(0, 3)
			.map((q) => q.text);

		setFilteredQuotes(results);
	};

	return (
		<main className="flex min-h-screen flex-col items-center justify-center p-6 bg-gradient-to-br from-black via-gray-900 to-purple-900 animate-gradient-x text-white transition-colors duration-1000">
			<div className="max-w-md w-full space-y-6">
				<div className="text-center space-y-4">
					<h1 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
						Quote Generator
					</h1>
					<div className="text-base md:text-lg text-gray-600 font-medium leading-relaxed space-y-1">
						<p>Need a boost of inspiration?</p>
						<p>
							Just type in a topic — like{" "}
							<span className="italic text-purple-600">success</span> or{" "}
							<span className="italic text-blue-600">life</span>.
						</p>
						<p>
							You’ll instantly get 3 powerful quotes to brighten your thoughts.
						</p>
						<p>Simple, fast, and motivating ✨</p>
					</div>
				</div>

				<form className="space-y-4" onSubmit={handleSubmit}>
					<Input
						type="text"
						placeholder="Enter a topic e.g. success"
						value={topic}
						onChange={(e) => setTopic(e.target.value)}
					/>
					<Button type="submit" className="w-full">
						Get Quotes
					</Button>
				</form>

				<div className="space-y-2">
					{filteredQuotes.length > 0 ? (
						filteredQuotes.map((quote, index) => (
							<div
								key={index}
								className="p-4 bg-white/10 backdrop-blur-md shadow-lg rounded text-sm border-l-4 border-purple-500"
							>
								{quote}
							</div>
						))
					) : (
						submitted && (
							<p className="text-sm text-gray-500">
								No quotes found for &quot;{topic}&quot;.
							</p>
						)
					)}
				</div>
			</div>
		</main>
	);
}
