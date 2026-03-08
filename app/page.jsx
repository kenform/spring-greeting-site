import ComplimentRotator from '../components/ComplimentRotator';
import PetalField from '../components/PetalField';
import AtmosphericBackground from '../components/AtmosphericBackground';
import GlowParticles from '../components/GlowParticles';
import MainMessageAuto from '../components/MainMessageAuto';
import TiltCard from '../components/TiltCard';
import TabTitleSwitch from '../components/TabTitleSwitch';
import { siteContent } from '../content/siteContent';

function buildTitleParts(template, recipientName) {
  const [before = '', after = ''] = template.split('[Имя]');
  return { before, name: recipientName, after };
}

export default function HomePage() {
  const title = buildTitleParts(siteContent.titleTemplate, siteContent.recipientName);

  return (
    <main className="relative min-h-screen overflow-hidden px-4 py-8 text-[#4f3e58] sm:px-8 sm:py-10">
      <TabTitleSwitch />
      <AtmosphericBackground />
      <PetalField />
      <GlowParticles />
      <div className="card-backlight" aria-hidden="true" />

      <TiltCard className="glass-card relative z-10 mx-auto flex w-full max-w-3xl flex-col gap-7 rounded-[2rem] border border-white/80 bg-white/90 p-5 shadow-[0_34px_90px_rgba(44,32,62,0.2),0_12px_30px_rgba(70,52,92,0.12),0_0_56px_rgba(255,233,247,0.18)] backdrop-blur-3xl ring-1 ring-white/70 sm:p-10">
        <div className="card-border-shimmer" aria-hidden="true" />
        <div className="card-shimmer" aria-hidden="true" />

        <header className="animate-fade-up text-center" style={{ animationDelay: '0.05s' }}>
          <p className="mb-3 text-[0.72rem] font-medium uppercase tracking-[0.34em] text-[#9d88ad] sm:text-[0.76rem]">8 марта</p>
          <div className="mx-auto mb-4 h-px w-28 bg-gradient-to-r from-transparent via-[#b895c5]/75 to-transparent" aria-hidden="true" />
          <h1 className="hero-title text-balance text-[2.05rem] font-semibold leading-[1.1] sm:text-[3.15rem]">
            {title.before}
            {title.name ? <span className="hero-title-name">{title.name}</span> : null}
            {title.after}
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-[1.02rem] leading-[1.65] text-[#715d80] sm:text-[1.1rem]">
            {siteContent.subtitle}
          </p>
        </header>

        <MainMessageAuto intro={siteContent.messageIntro} variants={siteContent.messageVariants} />

        <section className="animate-fade-up rounded-[1.35rem] border border-[#efbfd6]/85 bg-gradient-to-r from-[#ffeaf1d9] via-[#f4ecffe6] to-[#e8f3ffe0] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.7),0_12px_34px_rgba(170,136,184,0.2)] sm:p-6" style={{ animationDelay: '0.25s' }}>
          <h2 className="mb-2.5 text-[0.78rem] font-medium uppercase tracking-[0.16em] text-[#7f608e]">Мои пожелания</h2>
          <ComplimentRotator
            compliments={siteContent.compliments}
            rotateMinutes={siteContent.complimentRotateMinutes}
          />
        </section>

        {siteContent.signature ? (
          <footer className="animate-fade-up pt-2 text-right text-sm text-[#7d6788] sm:text-base" style={{ animationDelay: '0.35s' }}>
            {siteContent.signature}
          </footer>
        ) : null}
      </TiltCard>
    </main>
  );
}
