import React, { useEffect, useMemo, useState } from 'react'
import { useInterview } from '../hooks/useInterview'
import { useParams } from 'react-router'



const sections = [
  { key: "technical", label: "Technical Questions", icon: "</>" },
  { key: "behavioral", label: "Behavioral Questions", icon: "?" },
  { key: "roadmap", label: "Road Map", icon: "↗" }
]

const severityStyles = {
  low: "border-emerald-500/20 bg-emerald-500/10 text-emerald-300",
  medium: "border-amber-500/20 bg-amber-500/10 text-amber-300",
  high: "border-rose-500/20 bg-rose-500/10 text-rose-300"
}

const Interview = () => {
  const [activeSection, setActiveSection] = useState("technical")
  const [expandedQuestion, setExpandedQuestion] = useState(0)
  const [pageError, setPageError] = useState("")
  const [downloadError, setDownloadError] = useState("")
  const [isDownloading, setIsDownloading] = useState(false)
  const { interviewId } = useParams()

  const { loading, report, generateReportById, getResumePdf } = useInterview()

  useEffect(() => {
    if (!interviewId) {
      return
    }

    if (report?._id === interviewId) {
      return
    }

    const loadReport = async () => {
      try {
        setPageError("")
        await generateReportById(interviewId)
      } catch (error) {
        setPageError(error?.response?.data?.message || "Unable to load this interview report.")
      }
    }

    loadReport()
  }, [generateReportById, interviewId, report?._id])

  const handleDownloadResume = async () => {
    setDownloadError("")
    setIsDownloading(true)
    try {
      await getResumePdf({ interviewId })
    } catch (error) {
      setDownloadError(error?.response?.data?.message || "Failed to download resume PDF")
    } finally {
      setIsDownloading(false)
    }
  }

  const safeReport = report ?? {
    title: "",
    matchScore: 0,
    technicalQuestions: [],
    behavioralQuestions: [],
    skillGaps: [],
    preparationPlan: []
  }

  const currentQuestions = useMemo(() => {
    if (activeSection === "behavioral") return safeReport.behavioralQuestions
    if (activeSection === "technical") return safeReport.technicalQuestions
    return []
  }, [activeSection, safeReport.behavioralQuestions, safeReport.technicalQuestions])

  const progressOffset = 276 - (276 * safeReport.matchScore) / 100

  if (loading && !report) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-pink-400/90 border-t-transparent" />
      </div>
    )
  }

  if (pageError) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="w-full max-w-xl rounded-[1.5rem] border border-rose-400/25 bg-rose-500/10 px-6 py-8 text-center text-rose-200">
          {pageError}
        </div>
      </div>
    )
  }

  if (!report) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="w-full max-w-xl rounded-[1.5rem] border border-white/8 bg-white/[0.03] px-6 py-8 text-center text-slate-200">
          No interview report is available yet.
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen w-full px-4 py-5 sm:px-6 lg:px-8">
      <section className="mx-auto flex w-full max-w-[1520px] flex-col overflow-hidden rounded-[1.8rem] border border-white/8 bg-[#0d131d]/95 shadow-[0_30px_80px_rgba(0,0,0,0.45)] backdrop-blur-xl lg:min-h-[calc(100vh-2.5rem)] lg:flex-row">
        <aside className="border-b border-white/8 bg-[#0f141d] px-4 py-5 lg:w-[260px] lg:border-b-0 lg:border-r lg:px-5 lg:py-7">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">
            Sections
          </p>

          <div className="mt-6 flex gap-3 overflow-x-auto lg:flex-col">
            {sections.map((section) => {
              const isActive = activeSection === section.key

              return (
                <button
                  key={section.key}
                  type="button"
                  onClick={() => {
                    setActiveSection(section.key)
                    setExpandedQuestion(0)
                  }}
                  className={`flex min-w-fit items-center gap-3 rounded-2xl border px-4 py-3 text-left text-sm font-medium transition lg:w-full ${
                    isActive
                      ? "border-pink-500/25 bg-pink-500/10 text-pink-300 shadow-[0_12px_24px_rgba(255,61,129,0.12)]"
                      : "border-transparent bg-transparent text-slate-300 hover:border-white/8 hover:bg-white/[0.03] hover:text-white"
                  }`}
                >
                  <span className={`inline-flex h-7 w-7 items-center justify-center rounded-full text-[0.7rem] font-bold ${
                    isActive ? "bg-pink-500/15 text-pink-300" : "bg-white/[0.04] text-slate-400"
                  }`}>
                    {section.icon}
                  </span>
                  <span>{section.label}</span>
                </button>
              )
            })}
          </div>
        </aside>

        <main className="flex min-w-0 flex-1 flex-col xl:flex-row">
          <div className="min-w-0 flex-1 px-4 py-5 sm:px-6 lg:px-8 lg:py-7">
            <div className="flex flex-col gap-3 border-b border-white/8 pb-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-bold text-white">
                  {activeSection === "technical"
                    ? "Technical Questions"
                    : activeSection === "behavioral"
                      ? "Behavioral Questions"
                      : "Road Map"}
                </h1>
                <span className="rounded-full border border-white/8 bg-white/[0.03] px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                  {activeSection === "roadmap"
                    ? `${safeReport.preparationPlan.length} days`
                    : `${currentQuestions.length} questions`}
                </span>
              </div>
              <div className="text-sm text-slate-400">
                Role: <span className="font-medium text-slate-200">{safeReport.title || "Interview Report"}</span>
              </div>
            </div>

            {activeSection !== "roadmap" ? (
              <div className="mt-6 space-y-4">
                {currentQuestions.map((item, index) => {
                  const isExpanded = expandedQuestion === index

                  return (
                    <article
                      key={item.question}
                      className="overflow-hidden rounded-[1.35rem] border border-white/8 bg-[#151c28] shadow-[inset_0_1px_0_rgba(255,255,255,0.02)]"
                    >
                      <button
                        type="button"
                        onClick={() => setExpandedQuestion(isExpanded ? -1 : index)}
                        className="flex w-full items-center gap-3 px-4 py-4 text-left transition hover:bg-white/[0.02] sm:px-5"
                      >
                        <span className="rounded-xl bg-pink-500/10 px-2.5 py-1 text-xs font-bold uppercase tracking-[0.18em] text-pink-300">
                          Q{index + 1}
                        </span>
                        <span className="flex-1 text-base font-semibold leading-7 text-white">
                          {item.question}
                        </span>
                        <span className="text-xl text-slate-500">
                          {isExpanded ? "⌃" : "⌄"}
                        </span>
                      </button>

                      {isExpanded && (
                        <div className="border-t border-white/8 px-4 py-5 sm:px-5">
                          <div className="space-y-5">
                            <div>
                              <span className="rounded-lg bg-indigo-500/12 px-3 py-1 text-[0.72rem] font-semibold uppercase tracking-[0.25em] text-indigo-300">
                                Intention
                              </span>
                              <p className="mt-3 text-base leading-8 text-slate-300">
                                {item.intention}
                              </p>
                            </div>

                            <div>
                              <span className="rounded-lg bg-emerald-500/12 px-3 py-1 text-[0.72rem] font-semibold uppercase tracking-[0.25em] text-emerald-300">
                                Model Answer
                              </span>
                              <p className="mt-3 text-base leading-8 text-slate-300">
                                {item.answer}
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                    </article>
                  )
                })}
              </div>
            ) : (
              <div className="mt-6 grid gap-4">
                {safeReport.preparationPlan.map((dayPlan) => (
                  <article
                    key={dayPlan.day}
                    className="rounded-[1.35rem] border border-white/8 bg-[#151c28] p-4 sm:p-5"
                  >
                    <div className="flex flex-col gap-3 border-b border-white/8 pb-4 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <div className="text-sm font-semibold uppercase tracking-[0.25em] text-pink-300">
                          Day {dayPlan.day}
                        </div>
                        <h2 className="mt-2 text-xl font-semibold text-white">
                          {dayPlan.focus}
                        </h2>
                      </div>
                      <span className="rounded-full border border-white/8 bg-white/[0.03] px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                        {dayPlan.tasks.length} tasks
                      </span>
                    </div>

                    <div className="mt-4 space-y-3">
                      {dayPlan.tasks.map((task) => (
                        <div
                          key={task}
                          className="flex gap-3 rounded-2xl border border-white/6 bg-white/[0.02] px-4 py-3"
                        >
                          <span className="mt-1 h-2.5 w-2.5 rounded-full bg-pink-400" />
                          <p className="text-sm leading-7 text-slate-300 sm:text-base">
                            {task}
                          </p>
                        </div>
                      ))}
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>

          <aside className="border-t border-white/8 bg-[#0f141d] px-4 py-5 sm:px-6 xl:w-[280px] xl:border-l xl:border-t-0 xl:px-5 xl:py-7">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">
                Match Score
              </p>

              <div className="mt-5 flex flex-col items-center rounded-[1.5rem] border border-white/6 bg-white/[0.02] px-4 py-5">
                <div className="relative h-32 w-32">
                  <svg className="h-32 w-32 -rotate-90" viewBox="0 0 120 120">
                    <circle
                      cx="60"
                      cy="60"
                      r="44"
                      fill="none"
                      stroke="rgba(255,255,255,0.08)"
                      strokeWidth="6"
                    />
                    <circle
                      cx="60"
                      cy="60"
                      r="44"
                      fill="none"
                      stroke="#34d058"
                      strokeWidth="6"
                      strokeLinecap="round"
                      strokeDasharray="276"
                      strokeDashoffset={progressOffset}
                    />
                  </svg>

                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-4xl font-bold text-white">
                      {safeReport.matchScore}
                    </span>
                    <span className="mt-1 text-sm font-semibold text-slate-400">%</span>
                  </div>
                </div>

                <p className="mt-4 text-center text-sm font-medium text-emerald-400">
                  Strong match for this role
                </p>
              </div>
            </div>

            <div className="mt-8 border-t border-white/8 pt-6">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">
                Skill Gaps
              </p>

              <div className="mt-4 space-y-3">
                {safeReport.skillGaps.map((gap) => (
                  <div
                    key={gap.skill}
                    className={`rounded-2xl border px-4 py-3 text-sm font-semibold leading-6 ${severityStyles[gap.severity]}`}
                  >
                    {gap.skill}
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 border-t border-white/8 pt-6">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500 mb-4">
                Actions
              </p>

              {downloadError && (
                <p className="mb-3 text-sm text-rose-300">{downloadError}</p>
              )}

              <button
                onClick={handleDownloadResume}
                disabled={isDownloading || !report}
                className="w-full rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 px-4 py-3 text-sm font-semibold text-white transition hover:shadow-[0_10px_25px_rgba(59,130,246,0.25)] disabled:cursor-not-allowed disabled:opacity-50 hover:-translate-y-0.5 active:translate-y-0.5"
              >
                {isDownloading ? "Downloading..." : "📥 Download Resume PDF"}
              </button>
            </div>
          </aside>
        </main>
      </section>
    </div>
  )
}

export default Interview
