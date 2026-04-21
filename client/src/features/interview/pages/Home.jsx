import React, { useMemo, useRef, useState, useEffect } from "react";
import { useInterview } from "../hooks/useInterview";
import { useNavigate } from "react-router";

const Home = () => {
  const { loading, generateReport, reports, getReports } = useInterview()
  const [reportsLoaded, setReportsLoaded] = useState(false)

  const [jobDescription, setJobDescription] = useState("")
  const [selfDescription, setSelfDescription] = useState("")
  const [resumeFile, setResumeFile] = useState(null)
  const [errors, setErrors] = useState({})
  const [submitError, setSubmitError] = useState("")

  const resumeInputRef = useRef(null)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchReports = async () => {
      try {
        await getReports()
      } catch (error) {
        console.log("Error loading reports:", error)
      } finally {
        setReportsLoaded(true)
      }
    }
    fetchReports()
  }, [getReports])

  const hasJobDescription = jobDescription.trim().length > 0
  const hasProfileInput = Boolean(resumeFile) || selfDescription.trim().length > 0
  const formComplete = hasJobDescription && hasProfileInput

  const completionItems = useMemo(() => ([
    {
      key: "jobDescription",
      label: "Job description added",
      complete: hasJobDescription
    },
    {
      key: "profile",
      label: resumeFile ? "Resume uploaded" : "Profile information added",
      complete: hasProfileInput
    }
  ]), [hasJobDescription, hasProfileInput, resumeFile])

  const validateForm = () => {
    const nextErrors = {}

    if (!hasJobDescription) {
      nextErrors.jobDescription = "Job description is required."
    }

    if (!hasProfileInput) {
      nextErrors.profile = "Upload a resume or write a quick self-description."
    }

    if (resumeFile && resumeFile.type !== "application/pdf") {
      nextErrors.resume = "Only PDF resumes are supported."
    }

    if (resumeFile && resumeFile.size > 5 * 1024 * 1024) {
      nextErrors.resume = "Resume file must be 5MB or smaller."
    }

    return nextErrors
  }

  const handleResumeChange = (event) => {
    const nextFile = event.target.files?.[0] ?? null
    setResumeFile(nextFile)
    setErrors((currentErrors) => ({
      ...currentErrors,
      profile: undefined,
      resume: undefined
    }))
  }

  const handleGenerateReport = async (event) => {
    event.preventDefault()
    setSubmitError("")

    const nextErrors = validateForm()
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors)
      return
    }

    setErrors({})

    try {
      const data = await generateReport({
        jobDescription: jobDescription.trim(),
        selfDescription: selfDescription.trim(),
        resumeFile
      })

      navigate(`/interview/${data._id}`)
    } catch (error) {
      setSubmitError(error?.response?.data?.message || "We couldn't generate the report right now. Please try again.")
    }
  }

  return (
    <div className="min-h-screen w-full px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
      <section className="mx-auto w-full max-w-6xl overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/40 shadow-[0_28px_90px_rgba(0,0,0,0.42)] backdrop-blur-xl">
        <form onSubmit={handleGenerateReport} className="relative px-4 py-6 sm:px-6 sm:py-8 md:px-10 md:py-10">
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

              <div className={`rounded-[1.35rem] border bg-slate-950/30 p-2 transition ${
                errors.jobDescription ? "border-rose-400/40" : "border-white/5"
              }`}>
                <textarea
                  value={jobDescription}
                  onChange={(e) => {
                    setJobDescription(e.target.value)
                    setErrors((currentErrors) => ({ ...currentErrors, jobDescription: undefined }))
                  }}
                  placeholder="Paste the full job description here... e.g. Senior Frontend Engineer, React, TypeScript, large-scale systems, performance optimization, mentoring, and product collaboration."
                  className={`h-72 w-full resize-none rounded-[1.1rem] border bg-slate-800/90 px-4 py-4 text-sm leading-7 text-white outline-none transition hover:border-white/15 focus:ring-4 sm:h-[24rem] sm:text-base ${
                    errors.jobDescription
                      ? "border-rose-400/40 focus:border-rose-400/40 focus:ring-rose-500/15"
                      : "border-white/8 focus:border-pink-400/40 focus:ring-pink-500/15"
                  }`}
                />
                <div className="mt-3 flex items-center justify-between px-2 pb-1 text-xs text-slate-400">
                  <span>{errors.jobDescription || "Role context powers the final strategy."}</span>
                  <span>{jobDescription.length} / 5000 chars</span>
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

                  <label className={`flex cursor-pointer flex-col items-center justify-center rounded-[1.35rem] border px-5 py-9 text-center transition hover:-translate-y-0.5 hover:shadow-[0_18px_30px_rgba(0,0,0,0.22)] active:scale-[0.99] ${
                    resumeFile
                      ? "border-emerald-400/35 bg-emerald-500/10 hover:border-emerald-300/60"
                      : errors.resume || errors.profile
                        ? "border-dashed border-rose-300/45 bg-rose-500/10 hover:border-rose-300/70"
                        : "border-dashed border-pink-300/35 bg-slate-800/80 hover:border-pink-300/70"
                  }`}>
                    <input
                      type="file"
                      accept=".pdf"
                      className="hidden"
                      ref={resumeInputRef}
                      onChange={handleResumeChange}
                    />
                    <span className={`mb-3 inline-flex h-12 w-12 items-center justify-center rounded-full border text-2xl ${
                      resumeFile
                        ? "border-emerald-400/30 bg-emerald-500/15 text-emerald-300"
                        : "border-pink-400/25 bg-pink-500/10 text-pink-300"
                    }`}>
                      {resumeFile ? "✓" : "↑"}
                    </span>
                    <span className="text-base font-semibold text-white">
                      {resumeFile ? "Resume ready to use" : "Click to upload or drag and drop"}
                    </span>
                    <span className="mt-2 text-sm text-slate-400">
                      {resumeFile
                        ? `${resumeFile.name} • ${(resumeFile.size / 1024 / 1024).toFixed(2)} MB`
                        : "PDF only, up to 5MB"}
                    </span>
                    {resumeFile && (
                      <span className="mt-4 rounded-full border border-emerald-400/25 bg-emerald-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-emerald-300">
                        Upload complete
                      </span>
                    )}
                  </label>
                  {(errors.resume || errors.profile) && (
                    <p className="mt-3 text-sm text-rose-300">
                      {errors.resume || errors.profile}
                    </p>
                  )}
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
                    value={selfDescription}
                    onChange={(e) => {
                      setSelfDescription(e.target.value)
                      setErrors((currentErrors) => ({ ...currentErrors, profile: undefined }))
                    }}
                    placeholder="Briefly describe your experience, strongest skills, domain focus, and what kind of role you are targeting."
                    className="h-40 w-full resize-none rounded-[1.1rem] border border-white/8 bg-slate-800/90 px-4 py-4 text-sm leading-7 text-white outline-none transition hover:border-white/15 focus:border-pink-400/40 focus:ring-4 focus:ring-pink-500/15"
                  />
                </div>

                <div className="rounded-[1.15rem] border border-blue-400/20 bg-blue-500/10 px-4 py-4 text-sm leading-6 text-blue-100">
                  Either a resume or a self-description is enough to generate a
                  personalized plan. Adding both usually gives stronger results.
                </div>

                <div className="rounded-[1.15rem] border border-white/8 bg-white/[0.03] px-4 py-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">
                    Completion Status
                  </p>

                  <div className="mt-4 space-y-3">
                    {completionItems.map((item) => (
                      <div key={item.key} className="flex items-center justify-between gap-3 rounded-xl border border-white/6 bg-white/[0.02] px-3 py-2.5">
                        <span className="text-sm text-slate-200">{item.label}</span>
                        <span className={`rounded-full px-2.5 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.18em] ${
                          item.complete
                            ? "bg-emerald-500/12 text-emerald-300"
                            : "bg-amber-500/12 text-amber-300"
                        }`}>
                          {item.complete ? "Complete" : "Pending"}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-4 border-t border-white/8 pt-5 md:flex-row md:items-center md:justify-between">
            <div className="space-y-2">
              <div className="text-sm text-slate-300">
                AI-powered strategy generation
                <span className="mx-2 text-slate-600">•</span>
                Approx 30s
              </div>
              <div className="h-6">
                {submitError && (
                  <p className="text-sm text-rose-300">{submitError}</p>
                )}
                {!submitError && formComplete && (
                  <p className="text-sm text-emerald-300">
                    All required inputs are complete. You're ready to generate the report.
                  </p>
                )}
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="inline-flex w-full items-center justify-center rounded-2xl bg-gradient-to-r from-pink-500 to-rose-400 px-6 py-3.5 text-sm font-semibold tracking-wide text-white shadow-[0_16px_34px_rgba(255,63,134,0.28)] transition hover:-translate-y-0.5 hover:shadow-[0_20px_40px_rgba(255,63,134,0.34)] active:translate-y-0.5 active:scale-[0.985] disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0 sm:w-auto sm:min-w-72"
            >
              {loading ? "Generating..." : "Generate My Interview Strategy"}
            </button>
          </div>
        </form>
      </section>

      {/* Recent Reports Section */}
      {reportsLoaded && (
        <section className="mx-auto mt-12 w-full max-w-6xl">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-white sm:text-3xl">Recent Reports</h2>
            <p className="mt-2 text-sm text-slate-400">Click on any report to view or continue your preparation</p>
          </div>

          {reports && reports.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {reports.map((report) => (
                <button
                  key={report._id}
                  onClick={() => navigate(`/interview/${report._id}`)}
                  className="group overflow-hidden rounded-[1.35rem] border border-white/8 bg-gradient-to-br from-slate-900/60 to-slate-900/30 p-5 text-left transition hover:border-pink-500/25 hover:bg-slate-900/80 hover:shadow-[0_12px_30px_rgba(255,61,129,0.15)]"
                >
                  <div className="mb-3 flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-white transition group-hover:text-pink-300">
                        {report.title || "Interview Report"}
                      </h3>
                      <p className="mt-1 text-xs text-slate-500">
                        {new Date(report.createdAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric"
                        })}
                      </p>
                    </div>
                    <div className="rounded-full border border-pink-500/25 bg-pink-500/10 px-3 py-1 text-xs font-semibold text-pink-300">
                      {report.matchScore || 0}%
                    </div>
                  </div>

                  <p className="line-clamp-2 text-sm text-slate-400">
                    {report.jobDescription ? report.jobDescription.substring(0, 100) : "No description"} ...
                  </p>

                  <div className="mt-4 flex gap-2">
                    <span className="rounded-full bg-blue-500/12 px-2.5 py-1 text-xs text-blue-300">
                      {report.technicalQuestions?.length || 0} Technical
                    </span>
                    <span className="rounded-full bg-amber-500/12 px-2.5 py-1 text-xs text-amber-300">
                      {report.behavioralQuestions?.length || 0} Behavioral
                    </span>
                  </div>

                  <div className="mt-4 inline-flex items-center gap-2 text-xs font-semibold text-pink-300 opacity-0 transition group-hover:opacity-100">
                    View Report →
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="rounded-[1.5rem] border border-white/8 bg-slate-900/50 px-6 py-12 text-center">
              <p className="text-slate-400">No reports yet. Create your first interview strategy above!</p>
            </div>
          )}
        </section>
      )}
    </div>
  );
};

export default Home;
