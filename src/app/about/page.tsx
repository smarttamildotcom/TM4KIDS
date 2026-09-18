import type { Metadata } from "next";
import Image from "next/image";
import { CallToAction } from "@/components/sections/CallToAction";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { questyArt } from "@/lib/questy-art";
import {
  creatorQuestions,
  everydayIp,
  fourBigIdeas,
  learningPromise,
  whyIpMatters,
} from "@/lib/about-content";

export const metadata: Metadata = {
  title: "About IP2Kids | Intellectual Property Learning for Kids",
  description: "Discover why intellectual property matters for young learners. IP2Kids helps children explore creativity, brands, inventions, copyright and design through fun, age-appropriate learning adventures.",
};

export default function AboutPage() {
  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-detective-blue-600 focus:px-5 focus:py-3 focus:font-display focus:text-white">
        Skip to main content
      </a>
      <SiteHeader />
      <main id="main">
        <section className="relative overflow-hidden bg-gradient-to-b from-detective-blue-50 via-white to-white">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-detective-yellow-300/40 blur-3xl" />
            <div className="absolute -right-20 top-40 h-80 w-80 rounded-full bg-detective-orange-400/30 blur-3xl" />
          </div>
          <Container className="relative grid items-center gap-10 py-16 lg:grid-cols-2 lg:gap-16 lg:py-24">
            <div className="text-center lg:text-left">
              <p className="inline-flex rounded-full bg-detective-yellow-100 px-4 py-2 font-display text-sm font-semibold text-detective-orange-600">WHY IP2KIDS?</p>
              <h1 className="mt-6 font-display text-4xl font-bold leading-tight text-detective-blue-900 sm:text-5xl lg:text-6xl">About IP2Kids</h1>
              <h2 className="mt-4 font-display text-3xl font-bold text-detective-orange-500 sm:text-4xl">Children are already creators.</h2>
              <p className="mx-auto mt-6 max-w-xl text-lg text-detective-blue-700/85 lg:mx-0">Every time a child draws a picture, writes a story, invents a game, designs something or dreams up a new solution to a problem, they are creating.</p>
              <p className="mx-auto mt-5 max-w-xl rounded-3xl border-2 border-detective-yellow-300 bg-detective-yellow-100 px-5 py-4 font-display text-xl font-bold text-detective-blue-900 shadow-sm lg:mx-0">“What we create has value.”</p>
              <p className="mx-auto mt-5 max-w-xl text-detective-blue-700/85 lg:mx-0">IP2Kids makes intellectual property easy to discover through stories, mysteries, games and challenges — encouraging creativity, inventive thinking and respect for creators.</p>
            </div>
            <div className="mx-auto w-full max-w-md">
              <Image src={questyArt.detective} alt="Questy ready to investigate creative ideas" priority sizes="(min-width: 640px) 380px, 260px" className="h-[270px] w-full object-contain drop-shadow-2xl sm:h-[380px]" />
            </div>
          </Container>
        </section>

        <section className="bg-detective-blue-50/70 py-16 sm:py-24">
          <Container>
            <SectionHeading eyebrow="Why it matters" title="Why Should Kids Learn About IP?" subtitle="Intellectual property may sound like a grown-up subject, but the ideas behind it are already part of a child’s everyday world." />
            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {whyIpMatters.map((card) => (
                <article key={card.title} className={`rounded-3xl border-2 p-6 shadow-sm ${card.surface}`}>
                  <span className="text-4xl" aria-hidden="true">{card.emoji}</span>
                  <h3 className="mt-4 font-display text-2xl font-bold text-detective-blue-900">{card.title}</h3>
                  <p className="mt-2 font-display font-semibold text-detective-orange-600">“{card.statement}”</p>
                  <p className="mt-3 text-sm leading-relaxed text-detective-blue-700/85">{card.description}</p>
                </article>
              ))}
            </div>
          </Container>
        </section>

        <section className="py-16 sm:py-24">
          <Container>
            <SectionHeading eyebrow="Everyday clues" title="They already see IP every day. We help them understand it." subtitle="From the logo on their shoes and the design of their toys to the stories they read and inventions they use, children are surrounded by intellectual property." />
            <p className="mx-auto mt-4 max-w-3xl text-center text-detective-blue-700/85">IP2Kids turns everyday experiences into opportunities to observe, question, create and discover.</p>
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {everydayIp.map((item) => (
                <article key={item.kind} className="rounded-3xl border-2 border-detective-blue-100 bg-white p-5 text-center shadow-sm">
                  <span className="text-4xl" aria-hidden="true">{item.emoji}</span>
                  <p className="mt-3 text-xs font-bold tracking-widest text-detective-blue-500">{item.clue}</p>
                  <p className="mt-2 font-display text-2xl font-bold text-detective-orange-500">→ {item.kind}</p>
                  <p className="mt-3 text-sm text-detective-blue-700/85">{item.description}</p>
                </article>
              ))}
            </div>
          </Container>
        </section>

        <section className="bg-gradient-to-br from-detective-blue-700 to-detective-blue-900 py-16 text-white sm:py-24">
          <Container className="grid items-center gap-10 lg:grid-cols-[1fr_auto]">
            <div>
              <p className="font-display text-sm font-semibold uppercase tracking-[0.2em] text-detective-yellow-300">Our philosophy</p>
              <h2 className="mt-4 max-w-3xl font-display text-3xl font-bold leading-tight sm:text-5xl">We don&apos;t teach children IP law. We teach them to think like creators.</h2>
              <p className="mt-5 max-w-3xl text-lg text-detective-blue-100">IP2Kids isn&apos;t about turning children into lawyers. It&apos;s about helping them become curious creators, thoughtful innovators and responsible users of other people&apos;s work.</p>
              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {creatorQuestions.map((question) => <p key={question} className="rounded-2xl bg-white/10 px-4 py-3 font-display font-semibold text-white shadow-sm">🔍 {question}</p>)}
              </div>
            </div>
            <Image src={questyArt.thinking} alt="Questy thinking about a creative clue" sizes="(min-width: 1024px) 300px, 220px" className="mx-auto h-[220px] w-auto object-contain drop-shadow-2xl lg:h-[300px]" />
          </Container>
        </section>

        <section className="py-16 sm:py-24">
          <Container>
            <SectionHeading eyebrow="Our promise" title="The IP2Kids Learning Promise" />
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {learningPromise.map((item) => (
                <article key={item.title} className={`rounded-3xl p-6 shadow-lg ${item.tone}`}>
                  <h3 className="font-display text-2xl font-bold">{item.title}</h3>
                  <p className="mt-4 text-sm leading-relaxed">{item.description}</p>
                </article>
              ))}
            </div>
          </Container>
        </section>

        <section className="bg-detective-blue-50/70 py-16 sm:py-24">
          <Container>
            <SectionHeading eyebrow="The basics" title="Four Big Ideas to Discover" subtitle="These are introductory ideas, not legal advice. Different creations may be protected in different ways." />
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {fourBigIdeas.map((item) => (
                <article key={item.title} className={`rounded-3xl border-2 p-6 shadow-sm ${item.tone}`}>
                  <span className="text-4xl" aria-hidden="true">{item.emoji}</span>
                  <h3 className="mt-4 font-display text-2xl font-bold text-detective-blue-900">{item.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-detective-blue-700/85">{item.description}</p>
                </article>
              ))}
            </div>
          </Container>
        </section>

        <section className="py-16 sm:py-24">
          <Container className="grid items-center gap-10 lg:grid-cols-2">
            <div>
              <p className="font-display text-sm font-semibold uppercase tracking-[0.2em] text-detective-orange-500">Learning through adventure</p>
              <h2 className="mt-4 font-display text-3xl font-bold text-detective-blue-900 sm:text-4xl">Curious, involved and having fun.</h2>
              <p className="mt-5 max-w-xl text-lg text-detective-blue-700/85">Instead of long legal explanations, IP2Kids uses mysteries, stories, quizzes, puzzles, colouring activities, challenges, rewards, Questy and the 15-World learning journey.</p>
              <p className="mt-6 font-display text-2xl font-bold text-detective-orange-500">15 Worlds. 4 Types of IP. One Big Adventure.</p>
            </div>
            <div className="rounded-[2.5rem] bg-detective-yellow-100 p-8 text-center shadow-sm">
              <Image src={questyArt.celebrating} alt="Questy celebrating a learning adventure" sizes="(min-width: 640px) 320px, 240px" className="mx-auto h-[240px] w-auto object-contain sm:h-[320px]" />
            </div>
          </Container>
        </section>

        <section className="bg-detective-blue-50/70 py-16 sm:py-24">
          <Container className="grid items-center gap-10 lg:grid-cols-[auto_1fr]">
            <Image src={questyArt.reading} alt="Questy, the IP2Kids detective companion" sizes="(min-width: 1024px) 300px, 220px" className="mx-auto h-[220px] w-auto object-contain sm:h-[300px]" />
            <div>
              <p className="font-display text-sm font-semibold uppercase tracking-[0.2em] text-detective-orange-500">Your guide</p>
              <h2 className="mt-4 font-display text-3xl font-bold text-detective-blue-900 sm:text-4xl">Meet Questy</h2>
              <p className="mt-5 max-w-2xl text-lg text-detective-blue-700/85">Questy is the IP2Kids detective companion who guides young learners through the world of ideas, brands, inventions, creativity and design. With Questy&apos;s magnifying glass ready, children investigate clues, solve mysteries and discover how intellectual property appears in everyday life.</p>
            </div>
          </Container>
        </section>

        <section className="py-16 sm:py-24">
          <Container>
            <div className="mx-auto max-w-4xl rounded-[2.5rem] border-2 border-detective-yellow-300 bg-detective-yellow-100 px-6 py-10 text-center shadow-sm sm:px-12">
              <p className="font-display text-sm font-semibold uppercase tracking-[0.2em] text-detective-orange-600">For parents</p>
              <h2 className="mt-4 font-display text-3xl font-bold text-detective-blue-900 sm:text-4xl">A foundation for tomorrow&apos;s creators.</h2>
              <p className="mx-auto mt-5 max-w-3xl text-lg text-detective-blue-700/85">Today&apos;s children will grow up in a world where creativity, technology, content, brands and innovation are increasingly connected. IP2Kids gives young learners an age-appropriate introduction to intellectual property — helping them understand the value of creating something original and respecting what others create.</p>
            </div>
          </Container>
        </section>

        <CallToAction title="Ready to Become a Little IP Detective?" subtitle="Join Questy and explore 15 fun learning worlds filled with mysteries, challenges and discoveries." buttonLabel="Start the Adventure" buttonHref="/#journey" />
      </main>
      <SiteFooter />
    </>
  );
}
