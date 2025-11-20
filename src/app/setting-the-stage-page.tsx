import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen w-full bg-[#B3B3B3] text-black px-6 py-12 sm:px-12 lg:px-20 font-sans">
      <header className="mb-32">
        <div className="flex items-center gap-4">
          <div className="h-8 w-8 rounded-full bg-black" />
          <h1 className="text-4xl font-bold tracking-tight">SOURCE</h1>
        </div>
      </header>

      <section className="mb-32 text-center">
        <h2 className="text-5xl sm:text-6xl font-medium mb-4 tracking-tight">
          Setting the Stage
        </h2>
        <h3 className="text-4xl sm:text-5xl font-medium mb-8 tracking-tight">
          Current Systemic Conditions
        </h3>
        <p className="mx-auto max-w-2xl text-lg sm:text-xl leading-relaxed">
          To understand what comes next we must first understand the
          current systemic civilisational problem set.
        </p>
      </section>

      <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4 max-w-7xl mx-auto">
        {/* Economic */}
        <div className="space-y-6">
          <h4 className="text-2xl font-medium border-l-2 border-black pl-4">
            Economic
          </h4>
          <ul className="space-y-3 text-lg font-medium">
            <li>Escalating Layoffs</li>
            <li>AI agentification of the org</li>
            <li>Supply chain disruptions</li>
            <li>Erosion of purchasing power</li>
            <li>Inflation</li>
          </ul>
        </div>

        {/* Social */}
        <div className="space-y-6">
          <h4 className="text-2xl font-medium border-l-2 border-black pl-4">
            Social
          </h4>
          <ul className="space-y-3 text-lg font-medium">
            <li>Social media algos</li>
            <li>Loneliness Epidemic</li>
            <li>Pair-bonding Crisis</li>
            <li>Social Division</li>
            <li>Classism</li>
          </ul>
        </div>

        {/* Political */}
        <div className="space-y-6">
          <h4 className="text-2xl font-medium border-l-2 border-black pl-4">
            Political
          </h4>
          <ul className="space-y-3 text-lg font-medium">
            <li>Inadequate Problem Solving</li>
            <li>Political Polarization</li>
            <li>Erosion of Trust</li>
          </ul>
        </div>

        {/* Technological */}
        <div className="space-y-6">
          <h4 className="text-2xl font-medium border-l-2 border-black pl-4">
            Technological
          </h4>
          <ul className="space-y-3 text-lg font-medium">
            <li>Social media algos</li>
            <li>Data Privacy Concerns</li>
            <li>Security Vulnerabilities</li>
            <li>Deepfakes</li>
            <li>AI Biases</li>
          </ul>
        </div>
      </div>
      
      <div className="mt-20 text-center">
        <Link href="/old-homepage" className="text-sm underline opacity-50 hover:opacity-100">
            View Old Homepage
        </Link>
      </div>
    </main>
  );
}
