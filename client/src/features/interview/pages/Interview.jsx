import React, { useMemo, useState } from 'react'

const interviewReport = {
  title: "MERN Stack Developer",
  jobDescription: "",
  selfDescription: "",
  matchScore: 92,
  technicalQuestions: [
    {
      question: "Explain the MERN stack architecture and how its components interact to build a full-stack application.",
      intention: "To assess the candidate's fundamental understanding of the MERN stack and its integrated workflow.",
      answer: "The MERN stack consists of MongoDB, Express.js, React.js, and Node.js. MongoDB stores data, Express handles backend logic and API routing, React builds the interface, and Node provides the runtime. The frontend communicates with the backend through APIs, and the backend performs CRUD operations against MongoDB."
    },
    {
      question: "How do you manage state in a complex React application, particularly when using Redux Toolkit?",
      intention: "To evaluate the candidate's proficiency in frontend state management, specifically with Redux Toolkit.",
      answer: "For larger applications, I use Redux Toolkit because it reduces boilerplate and makes store setup, slices, reducers, and async thunks easier to organize. I use useSelector to read state, useDispatch to trigger actions, and keep small component state local with useState where it makes sense."
    },
    {
      question: "Describe your experience designing and implementing RESTful APIs. How do you handle authentication and authorization in your APIs?",
      intention: "To understand backend API design skills and security implementation, especially with JWT.",
      answer: "I design RESTful APIs around resources, clear route naming, and proper HTTP methods and status codes. For authentication, I use JWT tokens issued after login and verified through middleware. For authorization, I add role or permission checks before protected actions are allowed."
    },
    {
      question: "What are the advantages of using a NoSQL database like MongoDB in a MERN stack application compared to a relational database?",
      intention: "To gauge the candidate's understanding of why MongoDB often fits the MERN ecosystem well.",
      answer: "MongoDB fits naturally with JavaScript because its document model maps well to objects used in Node and React apps. It allows flexible schemas, is easy to evolve during product changes, and supports horizontal scaling. Relational databases are still strong for strict schemas and complex transactions, but MongoDB often speeds up development in MERN products."
    }
  ],
  behavioralQuestions: [
    {
      question: "Tell me about a challenging technical problem you encountered during the development of your Event Management Platform and how you resolved it.",
      intention: "To assess problem-solving skills, troubleshooting ability, and resilience.",
      answer: "A major challenge was API latency under heavier usage. I profiled the backend, optimized slow queries, added indexing where needed, and reduced redundant work in a few Express routes. On the frontend, I improved how async state was handled so the UI felt faster and more stable."
    },
    {
      question: "The job description emphasizes collaboration with cross-functional teams. Can you describe a situation where you collaborated effectively with others on a project?",
      intention: "To evaluate teamwork, communication, and ability to work across functions.",
      answer: "In a smart home university project, I worked with mobile and hardware teammates while owning backend work. We used Git, held quick syncs, and kept interface expectations clear. When the mobile team hit integration issues, I helped debug and updated the API response format so both sides could move forward smoothly."
    },
    {
      question: "You mentioned continuously learning new technologies. How do you stay updated with the fast-evolving tech ecosystem, and how do you apply new learnings to your work?",
      intention: "To understand commitment to continuous learning and practical application.",
      answer: "I follow official docs, newsletters, GitHub projects, and hands-on tutorials. I try to apply what I learn quickly in small project improvements. For example, after learning Redux Toolkit, I used it in a project and saw immediate gains in how clean and maintainable state management became."
    },
    {
      question: "The job description mentions writing clean and maintainable code. How do you ensure your code is clean, readable, and maintainable for others?",
      intention: "To assess software engineering habits and approach to long-term maintainability.",
      answer: "I focus on clear naming, small reusable units, predictable file structure, and consistent formatting. I also separate responsibilities cleanly across frontend and backend layers and avoid making components or controllers too large. Linting, formatting tools, and deliberate structure help keep the codebase easier to maintain."
    }
  ],
  skillGaps: [
    { skill: "Unit and Integration Testing", severity: "medium" },
    { skill: "Advanced Performance Optimization", severity: "medium" },
    { skill: "CI/CD and Deployment Automation", severity: "medium" }
  ],
  preparationPlan: [
    {
      day: 1,
      focus: "MERN Core and Project Review",
      tasks: [
        "Review MongoDB queries, Express middleware, React flow, and Node.js asynchronous patterns.",
        "Practice explaining the Event Management Platform architecture and the reasoning behind key technical decisions.",
        "Prepare concise stories around major project challenges and how you solved them."
      ]
    },
    {
      day: 2,
      focus: "Advanced Frontend and State Management",
      tasks: [
        "Revise Redux Toolkit concepts like slices, async thunks, and selectors.",
        "Review React performance tools such as memoization and lazy loading.",
        "Understand common React and Next.js data fetching approaches."
      ]
    },
    {
      day: 3,
      focus: "Backend APIs and Security",
      tasks: [
        "Revisit RESTful API design principles and consistent route naming.",
        "Practice JWT authentication and authorization flows.",
        "Review CORS, validation, XSS, and CSRF mitigation basics."
      ]
    },
    {
      day: 4,
      focus: "Behavioral and System Thinking",
      tasks: [
        "Prepare STAR answers for collaboration, ownership, and problem solving.",
        "Think through how a MERN app scales under increased traffic.",
        "Write down a few strong questions to ask the interviewer."
      ]
    },
    {
      day: 5,
      focus: "Skill Gap Focus and Mock Interview",
      tasks: [
        "Learn the basics of Jest and React Testing Library at a practical level.",
        "Review what a CI/CD pipeline looks like and why it matters.",
        "Do one full mock interview and refine your delivery."
      ]
    }
  ]
}

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

  const currentQuestions = useMemo(() => {
    if (activeSection === "behavioral") return interviewReport.behavioralQuestions
    if (activeSection === "technical") return interviewReport.technicalQuestions
    return []
  }, [activeSection])

  const progressOffset = 276 - (276 * interviewReport.matchScore) / 100

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
                    ? `${interviewReport.preparationPlan.length} days`
                    : `${currentQuestions.length} questions`}
                </span>
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
                {interviewReport.preparationPlan.map((dayPlan) => (
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
                      {interviewReport.matchScore}
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
                {interviewReport.skillGaps.map((gap) => (
                  <div
                    key={gap.skill}
                    className={`rounded-2xl border px-4 py-3 text-sm font-semibold leading-6 ${severityStyles[gap.severity]}`}
                  >
                    {gap.skill}
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </main>
      </section>
    </div>
  )
}

export default Interview
