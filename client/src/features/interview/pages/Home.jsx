const Home = () => {
  return (
    <div className="min-h-screen w-full px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
      <section className="mx-auto w-full max-w-6xl overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/40 shadow-[0_28px_90px_rgba(0,0,0,0.42)] backdrop-blur-xl">
        <div className="relative px-4 py-6 sm:px-6 sm:py-8 md:px-10 md:py-10">
          <div className="pointer-events-none absolute -left-16 top-8 h-40 w-40 rounded-full bg-pink-500/10 blur-3xl" />
          <div className="pointer-events-none absolute -right-10 bottom-10 h-48 w-48 rounded-full bg-blue-500/10 blur-3xl" />

          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.34em] text-pink-200/80">
              AI-Powered Interview Planner
            </p>
            <h1 className="text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">
              Create Your Custom{" "}
              <span className="bg-gradient-to-r from-pink-400 to-rose-300 bg-clip-text text-transparent">
                Interview Plan
              </span>
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
              Let our AI analyze the job requirements and your profile to build
              a sharper strategy, targeted practice, and a cleaner preparation
              plan.
            </p>
          </div>

          <div className="mt-8 grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
            <div className="rounded-[1.6rem] border border-white/8 bg-slate-900/70 p-4 sm:p-5 md:p-6">
              <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-lg font-semibold text-white sm:text-xl">
                    Target Job Description
                  </p>
                  <p className="mt-1 text-sm text-slate-400">
                    Paste the role details you want to optimize for.
                  </p>
                </div>
                <span className="rounded-full border border-pink-400/20 bg-pink-500/10 px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-pink-200">
                  Required
                </span>
              </div>

              <div className="rounded-[1.35rem] border border-white/5 bg-slate-950/30 p-2">
                <textarea
                  placeholder="Paste the full job description here... e.g. Senior Frontend Engineer, React, TypeScript, large-scale systems, performance optimization, mentoring, and product collaboration."
                  className="h-72 w-full resize-none rounded-[1.1rem] border border-white/8 bg-slate-800/90 px-4 py-4 text-sm leading-7 text-white outline-none transition hover:border-white/15 focus:border-pink-400/40 focus:ring-4 focus:ring-pink-500/15 sm:h-[24rem] sm:text-base"
                />
                <div className="mt-3 flex items-center justify-between px-2 pb-1 text-xs text-slate-400">
                  <span>Role context powers the final strategy.</span>
                  <span>0 / 5000 chars</span>
                </div>
              </div>
            </div>

            <div className="rounded-[1.6rem] border border-white/8 bg-slate-900/70 p-4 sm:p-5 md:p-6">
              <div className="mb-4">
                <p className="text-lg font-semibold text-white sm:text-xl">
                  Your Profile
                </p>
                <p className="mt-1 text-sm text-slate-400">
                  Add a resume or a quick self-description for stronger results.
                </p>
              </div>

              <div className="space-y-5">
                <div>
                  <div className="mb-3 flex flex-wrap items-center gap-2">
                    <label className="text-sm font-semibold text-white">
                      Upload Resume
                    </label>
                    <span className="rounded-full border border-pink-400/20 bg-pink-500/10 px-2.5 py-1 text-[0.64rem] font-semibold uppercase tracking-[0.24em] text-pink-200">
                      Best Results
                    </span>
                  </div>

                  <label className="flex cursor-pointer flex-col items-center justify-center rounded-[1.35rem] border border-dashed border-pink-300/35 bg-slate-800/80 px-5 py-9 text-center transition hover:-translate-y-0.5 hover:border-pink-300/70 hover:shadow-[0_18px_30px_rgba(0,0,0,0.22)] active:scale-[0.99]">
                    <input type="file" accept=".pdf" className="hidden" />
                    <span className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-full border border-pink-400/25 bg-pink-500/10 text-2xl text-pink-300">
                      ↑
                    </span>
                    <span className="text-base font-semibold text-white">
                      Click to upload or drag and drop
                    </span>
                    <span className="mt-2 text-sm text-slate-400">
                      PDF only, up to 5MB
                    </span>
                  </label>
                </div>

                <div className="flex items-center gap-3">
                  <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                  <span className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
                    Or
                  </span>
                  <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                </div>

                <div>
                  <label className="mb-3 block text-sm font-semibold text-white">
                    Quick Self-Description
                  </label>
                  <textarea
                    placeholder="Briefly describe your experience, strongest skills, domain focus, and what kind of role you are targeting."
                    className="h-40 w-full resize-none rounded-[1.1rem] border border-white/8 bg-slate-800/90 px-4 py-4 text-sm leading-7 text-white outline-none transition hover:border-white/15 focus:border-pink-400/40 focus:ring-4 focus:ring-pink-500/15"
                  />
                </div>

                <div className="rounded-[1.15rem] border border-blue-400/20 bg-blue-500/10 px-4 py-4 text-sm leading-6 text-blue-100">
                  Either a resume or a self-description is enough to generate a
                  personalized plan. Adding both usually gives stronger results.
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-4 border-t border-white/8 pt-5 md:flex-row md:items-center md:justify-between">
            <div className="text-sm text-slate-300">
              AI-powered strategy generation
              <span className="mx-2 text-slate-600">•</span>
              Approx 30s
            </div>

            <button className="inline-flex w-full items-center justify-center rounded-2xl bg-gradient-to-r from-pink-500 to-rose-400 px-6 py-3.5 text-sm font-semibold tracking-wide text-white shadow-[0_16px_34px_rgba(255,63,134,0.28)] transition hover:-translate-y-0.5 hover:shadow-[0_20px_40px_rgba(255,63,134,0.34)] active:translate-y-0.5 active:scale-[0.985] sm:w-auto sm:min-w-72">
              Generate My Interview Strategy
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
