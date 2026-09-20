import { ProfileLinks } from "./profile-links";

import type { ProfileContent } from "@/src/types/content";

type ProfileIntroProps = {
  content: ProfileContent;
};

export function ProfileIntro({ content }: ProfileIntroProps) {
  const displayName = content.displayName?.trim() || "Profile";
  const bio = content.bio?.trim();
  const links = content.links ?? [];

  return (
    <article aria-labelledby="profile-heading" className="flex flex-col gap-10 sm:gap-12">
      <div className="grid items-stretch gap-8 lg:grid-cols-12 lg:gap-12">
        <header className="flex min-w-0 flex-col justify-center lg:col-span-7 lg:py-10">
          <p className="font-mono text-xs font-medium uppercase tracking-[0.18em] text-[var(--text-muted)]">
            Profile <span aria-hidden="true">/</span> Personal context
          </p>

          <h1
            id="profile-heading"
            className="mt-5 break-words text-[clamp(3.5rem,12vw,7.5rem)] font-extrabold leading-[0.86] tracking-[-0.065em] text-[var(--text-primary)]"
          >
            {displayName}
            <span className="text-[var(--border-focus)]" aria-hidden="true">
              .
            </span>
          </h1>

          {bio ? (
            <p className="mt-8 max-w-2xl text-pretty text-lg leading-8 text-[var(--text-secondary)] sm:text-xl sm:leading-9">
              {bio}
            </p>
          ) : null}
        </header>

        <div
          aria-hidden="true"
          className="relative min-h-72 overflow-hidden rounded-[1.75rem] border border-[var(--border-subtle)] bg-[var(--surface-base)] lg:col-span-5 lg:min-h-[28rem]"
        >
          <div className="absolute -right-20 -top-20 size-64 rounded-full border border-[var(--border-default)]" />
          <div className="absolute -right-8 -top-8 size-40 rounded-full border border-[var(--border-subtle)] bg-[var(--color-accent-subtle)]" />
          <div className="absolute inset-x-6 top-6 flex items-center justify-between font-mono text-[0.65rem] uppercase tracking-[0.18em] text-[var(--text-muted)] sm:inset-x-8 sm:top-8">
            <span>Profile</span>
            <span>01</span>
          </div>
          <div className="absolute inset-x-6 bottom-6 border-t border-[var(--border-subtle)] pt-4 sm:inset-x-8 sm:bottom-8">
            <span className="block max-w-full overflow-hidden text-5xl font-bold tracking-[-0.06em] text-[var(--text-primary)]/90 sm:text-6xl lg:text-7xl">
              {displayName}
            </span>
          </div>
          <div className="absolute bottom-24 left-6 h-px w-20 -rotate-45 bg-[var(--border-focus)] sm:left-8" />
        </div>
      </div>

      <ProfileLinks links={links} />
    </article>
  );
}
