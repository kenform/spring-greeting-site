import ComplimentRotator from '../components/ComplimentRotator';
import PetalField from '../components/PetalField';
import { siteContent } from '../content/siteContent';

function buildTitle(template, recipientName) {
  return template.replace('[Имя]', recipientName);
}

export default function HomePage() {
  const title = buildTitle(siteContent.titleTemplate, siteContent.recipientName);
  const paragraphs = siteContent.message.split('\n').filter(Boolean);

  return (
    <main className="relative min-h-screen overflow-hidden px-5 py-10 text-[#4f3e58] sm:px-8">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/spring-bg.jpg')" }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#2d20361f] via-[#3e2c4a33] to-[#1c1b2a4d]" />
      <div className="absolute inset-0 backdrop-blur-[2px]" />

      <PetalField />

      <section className="relative z-10 mx-auto flex w-full max-w-3xl flex-col gap-8 rounded-3xl border border-white/55 bg-white/58 p-6 shadow-[0_16px_50px_rgba(48,30,64,0.18),0_0_36px_rgba(255,232,246,0.22)] backdrop-blur-xl ring-1 ring-white/35 sm:p-10">
        <header className="text-center">
          <h1 className="text-3xl font-semibold leading-tight text-[#5f476d] sm:text-5xl">{title}</h1>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-[#7a6684] sm:text-lg">
            {siteContent.subtitle}
          </p>
        </header>

        <article className="space-y-4 rounded-2xl bg-white/70 p-5 sm:p-7">
          {paragraphs.map((line, idx) => (
            <p key={idx} className="text-base leading-8 text-[#5f4c69] sm:text-lg">
              {line}
            </p>
          ))}
        </article>

        <section className="rounded-2xl border border-white/50 bg-gradient-to-r from-blush/65 via-lilac/55 to-sky/60 p-5 sm:p-7">
          <h2 className="mb-3 text-sm font-medium uppercase tracking-[0.16em] text-[#8a6b96]">Мои пожелания</h2>
          <ComplimentRotator
            compliments={siteContent.compliments}
            rotateMinutes={siteContent.complimentRotateMinutes}
          />
        </section>

        <footer className="pt-2 text-right text-sm text-[#7d6788] sm:text-base">{siteContent.signature}</footer>
      </section>
    </main>
  );
}
