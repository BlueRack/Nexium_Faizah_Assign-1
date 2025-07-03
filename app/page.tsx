import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-gray-100">
      <div className="max-w-md w-full space-y-6">
        <h1 className="text-3xl font-bold text-center">Quote Generator</h1>
        <form className="space-y-4">
          <Input type="text" placeholder="Enter a topic e.g. success" />
          <Button type="submit" className="w-full">
            Get Quotes
          </Button>
        </form>
      </div>
    </main>
  );
}
