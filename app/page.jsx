import ComplimentRotator from '../components/ComplimentRotator';
import PetalField from '../components/PetalField';
import AtmosphericBackground from '../components/AtmosphericBackground';
import GlowParticles from '../components/GlowParticles';
import { siteContent } from '../content/siteContent';

function buildTitleParts(template, recipientName) {
  const [before = '', after = ''] = template.split('[Имя]');
  return { before, name: recipientName, after };
}

export default function HomePage() {
  const title = buildTitleParts(siteContent.titleTemplate, siteContent.recipientName);
  const paragraphs = siteContent.message.split('\n').filter(Boolean);

  return (
    <main className="relative min-h-screen overflow-hidden px-4 py-8 text-[#4f3e58] sm:px-8 sm:py-10">
      <AtmosphericBackground />
      <PetalField />
      <GlowParticles />

      <section className="glass-card relative z-10 mx-auto flex w-full max-w-3xl flex-col gap-8 rounded-[2rem] border border-white/70 bg-white/88 p-5 shadow-[0_20px_60px_rgba(48,30,64,0.18),0_0_40px_rgba(255,233,247,0.16)] backdrop-blur-xl ring-1 ring-white/55 sm:p-10">
        <div className="card-shimmer" aria-hidden="true" />

        <header className="animate-fade-up text-center" style={{ animationDelay: '0.05s' }}>
          <h1 className="hero-title text-balance text-3xl font-semibold leading-[1.12] sm:text-5xl">
            {title.before}
            <span className="hero-title-name">{title.name}</span>
            {title.after}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-[#745f82] sm:text-lg">
            {siteContent.subtitle}
          </p>
        </header>

        <article className="animate-fade-up space-y-4 rounded-2xl bg-white/64 p-5 sm:p-7" style={{ animationDelay: '0.15s' }}>
          {paragraphs.map((line, idx) => (
            <p key={idx} className="text-[15px] leading-8 text-[#5f4c69] sm:text-lg">
              {line}
            </p>
          ))}
        </article>

        <section className="animate-fade-up rounded-2xl border border-white/55 bg-gradient-to-r from-[#ffdbe8b3] via-[#efe2ffc9] to-[#ddedffc7] p-6 shadow-[0_10px_36px_rgba(185,145,196,0.24)] sm:p-8" style={{ animationDelay: '0.25s' }}>
          <h2 className="mb-3 text-sm font-medium uppercase tracking-[0.14em] text-[#8a6b96]">Мои пожелания</h2>
          <ComplimentRotator
            compliments={siteContent.compliments}
            rotateMinutes={siteContent.complimentRotateMinutes}
          />
        </section>

        <footer className="animate-fade-up pt-2 text-right text-sm text-[#7d6788] sm:text-base" style={{ animationDelay: '0.35s' }}>
          {siteContent.signature}
        </footer>
      </section>
    </main>
  );
}
