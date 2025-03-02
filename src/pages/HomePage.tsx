import React from "react";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold p-2 m-2">💡Ideas & 📬Feedback</h1>

      <div>
        <h1 className="text-3xl p-1">
          Collecting feedback from the community easier than ever!
        </h1>
        <h2 className="text-2xl p-1">Organized and fast response collection</h2>
        <h3 className="text-xl p-1">
          Completely free and <span>open source</span>
        </h3>
        <Button className="text-2xl p-4 cursor-pointer m-2" variant="outline">
          {">"}Enter{"<"}
        </Button>
      </div>
    </div>
  );
}
