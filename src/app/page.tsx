import Link from "next/link";
import { Logo } from "@/components/shared/Logo";
import {
  ArrowRight,
  MessageSquareText,
  Wand2,
  Rocket,
  Quote,
  Zap,
  Shield,
  Globe,
} from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="fixed top-0 w-full bg-white/80 backdrop-blur-sm border-b z-50">
        <div className="max-w-6xl mx-auto flex items-center justify-between h-14 px-6">
          <Logo />
          <div className="flex items-center gap-4">
            <Link
              href="/builder"
              className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
            >
              Dashboard
            </Link>
            <Link
              href="/builder"
              className="inline-flex items-center gap-2 rounded-full bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 transition-colors"
            >
              Get Started
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-indigo-50 px-4 py-1.5 text-sm font-medium text-indigo-700 mb-6">
            <Zap className="h-3.5 w-3.5" />
            Powered by Claude
          </div>
          <h1 className="text-5xl sm:text-6xl font-bold tracking-tight text-gray-900 leading-tight">
            Build Your AI Receptionist
            <br />
            <span className="text-indigo-600">in Minutes</span>
          </h1>
          <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Describe your business, and our AI builder creates a fully
            functional customer service agent. No code required &mdash; just
            vibe-code your way to 24/7 automated support.
          </p>
          <div className="mt-10 flex items-center justify-center gap-4">
            <Link
              href="/builder"
              className="inline-flex items-center gap-2 rounded-full bg-indigo-600 px-6 py-3 text-base font-medium text-white hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-600/25"
            >
              Start Building
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/playground"
              className="inline-flex items-center gap-2 rounded-full border border-gray-300 px-6 py-3 text-base font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Try Playground
            </Link>
          </div>
        </div>
      </section>

      {/* 3-Step Process */}
      <section className="py-20 bg-gray-50 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">
            Three steps. That&apos;s it.
          </h2>
          <p className="text-center text-gray-600 mb-14 max-w-xl mx-auto">
            From zero to a live AI receptionist handling your customers &mdash;
            no technical skills needed.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                icon: MessageSquareText,
                title: "Describe",
                description:
                  "Tell our AI builder about your business. It researches your website and asks smart follow-up questions to understand your needs.",
                color: "indigo",
              },
              {
                step: "02",
                icon: Wand2,
                title: "Test",
                description:
                  "Preview your AI receptionist in real-time. Have test conversations, refine its personality, and upload your knowledge base.",
                color: "emerald",
              },
              {
                step: "03",
                icon: Rocket,
                title: "Deploy",
                description:
                  "Embed a live chat widget on your website with a single line of code. Your AI receptionist is live 24/7.",
                color: "amber",
              },
            ].map((item) => (
              <div
                key={item.step}
                className="relative bg-white rounded-xl border p-6 hover:shadow-lg transition-shadow"
              >
                <span className="text-xs font-bold text-gray-300 uppercase tracking-widest">
                  Step {item.step}
                </span>
                <div
                  className={`mt-4 inline-flex items-center justify-center w-10 h-10 rounded-lg ${
                    item.color === "indigo"
                      ? "bg-indigo-100 text-indigo-600"
                      : item.color === "emerald"
                        ? "bg-emerald-100 text-emerald-600"
                        : "bg-amber-100 text-amber-600"
                  }`}
                >
                  <item.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-gray-900">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-14">
            Everything you need
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Wand2,
                title: "Vibe-Code Builder",
                desc: "Describe what you want in natural language. Our AI does the rest.",
              },
              {
                icon: MessageSquareText,
                title: "Smart Conversations",
                desc: "Context-aware responses powered by Claude with tool-calling capabilities.",
              },
              {
                icon: Globe,
                title: "Embeddable Widget",
                desc: "Drop a single script tag on your site for instant live chat.",
              },
              {
                icon: Shield,
                title: "Your API Key",
                desc: "Runs on your own Anthropic account. Full control, no middleman.",
              },
              {
                icon: Zap,
                title: "Knowledge Base",
                desc: "Upload docs or paste URLs. Your agent learns your business instantly.",
              },
              {
                icon: Rocket,
                title: "Handoff to Human",
                desc: "Seamless escalation to your team when the AI needs backup.",
              },
            ].map((feature) => (
              <div
                key={feature.title}
                className="flex gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors"
              >
                <div className="flex-shrink-0 mt-0.5">
                  <feature.icon className="h-5 w-5 text-indigo-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">
                    {feature.title}
                  </h3>
                  <p className="mt-1 text-sm text-gray-600">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-14">
            Loved by businesses
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                quote:
                  "Set up our dental clinic receptionist in 10 minutes. It handles appointment scheduling perfectly.",
                author: "Sarah Chen",
                role: "Owner, Bright Smile Dental",
              },
              {
                quote:
                  "Replaced our after-hours answering service. Saves us $2,000/month and customers love the instant responses.",
                author: "Marcus Johnson",
                role: "GM, Metro Property Management",
              },
              {
                quote:
                  "The vibe-coding builder is magical. I just described our business and it built exactly what I needed.",
                author: "Priya Patel",
                role: "Founder, Bloom & Co",
              },
            ].map((testimonial) => (
              <div
                key={testimonial.author}
                className="bg-white rounded-xl border p-6"
              >
                <Quote className="h-5 w-5 text-indigo-300 mb-3" />
                <p className="text-sm text-gray-700 leading-relaxed">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
                <div className="mt-4 pt-4 border-t">
                  <p className="text-sm font-semibold text-gray-900">
                    {testimonial.author}
                  </p>
                  <p className="text-xs text-gray-500">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900">
            Ready to build your AI receptionist?
          </h2>
          <p className="mt-4 text-gray-600">
            It takes less than 5 minutes. Bring your Anthropic API key and
            start building.
          </p>
          <Link
            href="/builder"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-600/25"
          >
            Get Started Free
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8 px-6">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Logo />
          <p className="text-sm text-gray-500">
            Built with Claude &middot; Demo by Solvea
          </p>
        </div>
      </footer>
    </div>
  );
}
