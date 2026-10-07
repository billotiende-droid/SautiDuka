"use client"

import { FormEvent, ReactNode, useEffect, useMemo, useState } from "react"

type IconName = "home" | "receipt" | "users" | "box" | "chart" | "settings" | "bell" | "cloud" | "wallet" | "phone" | "arrowUp" | "arrowDown" | "plus" | "mic" | "more" | "close" | "check" | "chevron"

type Activity = {
  id: number
  title: string
  detail: string
  time: string
  amount: number
  tone: "income" | "expense" | "debt"
  icon: "sale" | "expense" | "debt" | "stock"
}

const iconPaths: Record<IconName, ReactNode> = {
  home: (
    <>
      <path d="m3 10 9-7 9 7" />
      <path d="M5 9v11h14V9M9 20v-6h6v6" />
    </>
  ),
  receipt: (
    <>
      <path d="M6 3h12v18l-3-2-3 2-3-2-3 2V3Z" />
      <path d="M9 8h6M9 12h6" />
    </>
  ),
  users: (
    <>
      <path d="M16 20v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M18 8a3 3 0 0 1 0 6M22 20v-2a4 4 0 0 0-3-3.87" />
    </>
  ),
  box: (
    <>
      <path d="m21 8-9 5-9-5 9-5 9 5Z" />
      <path d="m3 8 9 5 9-5v8l-9 5-9-5V8ZM12 13v8" />
    </>
  ),
  chart: (
    <>
      <path d="M4 20V10M10 20V4M16 20v-7M22 20H2" />
    </>
  ),
  settings: (
    <>
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.7 1.7 0 0 0 .34 1.88l.06.06-2.83 2.83-.06-.06a1.7 1.7 0 0 0-1.88-.34 1.7 1.7 0 0 0-1.03 1.56V21h-4v-.08A1.7 1.7 0 0 0 9 19.37a1.7 1.7 0 0 0-1.88.34l-.06.06-2.83-2.83.06-.06A1.7 1.7 0 0 0 4.63 15 1.7 1.7 0 0 0 3.08 14H3v-4h.08A1.7 1.7 0 0 0 4.63 9a1.7 1.7 0 0 0-.34-1.88l-.06-.06 2.83-2.83.06.06A1.7 1.7 0 0 0 9 4.63h.02A1.7 1.7 0 0 0 10 3.08V3h4v.08A1.7 1.7 0 0 0 15 4.63a1.7 1.7 0 0 0 1.88-.34l.06-.06 2.83 2.83-.06.06A1.7 1.7 0 0 0 19.37 9v.02A1.7 1.7 0 0 0 20.92 10H21v4h-.08A1.7 1.7 0 0 0 19.4 15Z" />
    </>
  ),
  bell: (
    <>
      <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9ZM10 21h4" />
    </>
  ),
  cloud: (
    <>
      <path d="M17.5 19H7a5 5 0 1 1 1.4-9.8A7 7 0 0 1 22 11.5a4.5 4.5 0 0 1-4.5 7.5Z" />
      <path d="m9 14 2 2 4-4" />
    </>
  ),
  wallet: (
    <>
      <path d="M3 6h16v14H3V6Z" />
      <path d="M3 9h18v7h-6a3 3 0 0 1 0-6h6M16 13h.01M6 6V4h10v2" />
    </>
  ),
  phone: (
    <>
      <rect x="6" y="2" width="12" height="20" rx="2" />
      <path d="M10 5h4M11 18h2" />
    </>
  ),
  arrowUp: (
    <>
      <path d="m18 15-6-6-6 6" />
    </>
  ),
  arrowDown: (
    <>
      <path d="m6 9 6 6 6-6" />
    </>
  ),
  plus: (
    <>
      <path d="M12 5v14M5 12h14" />
    </>
  ),
  mic: (
    <>
      <rect x="9" y="2" width="6" height="12" rx="3" />
      <path d="M5 10a7 7 0 0 0 14 0M12 17v5M8 22h8" />
    </>
  ),
  more: (
    <>
      <circle cx="5" cy="12" r="1" />
      <circle cx="12" cy="12" r="1" />
      <circle cx="19" cy="12" r="1" />
    </>
  ),
  close: (
    <>
      <path d="m6 6 12 12M18 6 6 18" />
    </>
  ),
  check: (
    <>
      <path d="m5 12 4 4L19 6" />
    </>
  ),
  chevron: (
    <>
      <path d="m9 18 6-6-6-6" />
    </>
  ),
}

function Icon({ name, size = 20 }: { name: IconName; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {iconPaths[name]}
    </svg>
  )
}

const money = (value: number) => new Intl.NumberFormat("en-KE").format(value)

const initialActivities: Activity[] = [
  {
    id: 1,
    title: "Passion juice · 3 cups",
    detail: "M-Pesa sale",
    time: "10:42 AM",
    amount: 360,
    tone: "income",
    icon: "sale",
  },
  {
    id: 2,
    title: "Market supplies",
    detail: "Wakulima Market · Cash",
    time: "9:18 AM",
    amount: -850,
    tone: "expense",
    icon: "expense",
  },
  {
    id: 3,
    title: "Allan · 2 cups",
    detail: "Payment pending",
    time: "8:56 AM",
    amount: 160,
    tone: "debt",
    icon: "debt",
  },
  {
    id: 4,
    title: "Passion fruit batch",
    detail: "10 fruits → 7 cups",
    time: "8:15 AM",
    amount: -100,
    tone: "expense",
    icon: "stock",
  },
]

const nav = [
  { label: "Overview", icon: "home" as IconName },
  { label: "Transactions", icon: "receipt" as IconName },
  { label: "Debts", icon: "users" as IconName, badge: "2" },
  { label: "Inventory", icon: "box" as IconName },
  { label: "Reports", icon: "chart" as IconName },
]

function Sidebar({
  active,
  onChange,
}: {
  active: string
  onChange: (value: string) => void
}) {
  return (
    <aside className="sidebar">
      <div className="brand">
        <span className="brand-mark">
          <span>S</span>
        </span>
        <span>SautiDuka</span>
      </div>
      <button className="business-switcher" type="button">
        <span className="business-avatar">A</span>
        <span>
          <strong>Amina’s Juice Bar</strong>
          <small>Juice & snacks</small>
        </span>
        <Icon name="chevron" size={16} />
      </button>
      <nav className="side-nav" aria-label="Main navigation">
        <p className="nav-label">WORKSPACE</p>
        {nav.map((item) => (
          <button
            className={active === item.label ? "nav-item active" : "nav-item"}
            key={item.label}
            onClick={() => onChange(item.label)}
            type="button"
          >
            <Icon name={item.icon} />
            <span>{item.label}</span>
            {item.badge && <em>{item.badge}</em>}
          </button>
        ))}
      </nav>
      <div className="sidebar-bottom">
        <button className="nav-item" type="button">
          <Icon name="settings" />
          <span>Settings</span>
        </button>
        <div className="help-card">
          <span className="help-icon">
            <Icon name="mic" size={18} />
          </span>
          <strong>Talk to Sauti</strong>
          <p>Record in Sheng, Kiswahili or English.</p>
          <button type="button">Try voice entry</button>
        </div>
        <div className="profile">
          <span className="profile-avatar">AM</span>
          <span>
            <strong>Amina Mwangi</strong>
            <small>Owner</small>
          </span>
          <Icon name="more" size={18} />
        </div>
      </div>
    </aside>
  )
}

function MetricCard({
  label,
  amount,
  note,
  icon,
  trend,
  tone,
}: {
  label: string
  amount: number
  note: string
  icon: IconName
  trend?: string
  tone: "green" | "dark" | "amber"
}) {
  return (
    <article className={`metric-card ${tone}`}>
      <div className="metric-top">
        <span className="metric-icon">
          <Icon name={icon} size={19} />
        </span>
        {trend && (
          <span className="trend">
            <Icon name="arrowUp" size={13} />
            {trend}
          </span>
        )}
      </div>
      <p>{label}</p>
      <h3>
        <small>KES</small> {money(amount)}
      </h3>
      <span className="metric-note">{note}</span>
    </article>
  )
}

function ActivityIcon({ kind }: { kind: Activity["icon"] }) {
  const map = {
    sale: "arrowDown",
    expense: "arrowUp",
    debt: "users",
    stock: "box",
  } as const
  return (
    <span className={`activity-icon ${kind}`}>
      <Icon name={map[kind]} size={17} />
    </span>
  )
}

function Dashboard({
  activities,
  onRecord,
  closed,
  onEndDay,
  online,
}: {
  activities: Activity[]
  onRecord: (kind?: string) => void
  closed: boolean
  onEndDay: () => void
  online: boolean
}) {
  const totals = useMemo(() => {
    const sales =
      activities
        .filter((a) => a.tone === "income")
        .reduce((sum, a) => sum + a.amount, 0) + 3240
    const expenses =
      Math.abs(
        activities
          .filter((a) => a.tone === "expense")
          .reduce((sum, a) => sum + a.amount, 0),
      ) + 500
    return { sales, expenses, profit: sales - expenses }
  }, [activities])

  return (
    <>
      <header className="topbar">
        <div>
          <p className="eyebrow">THURSDAY, 24 OCTOBER</p>
          <h1>Good morning, Amina</h1>
          <p className="subhead">
            {closed
              ? "Today’s books are closed and ready to review."
              : "Here’s how your business is doing today."}
          </p>
        </div>
        <div className="top-actions">
          <span className={online ? "sync-pill" : "sync-pill offline"}>
            <Icon name="cloud" size={16} />
            {online
              ? "Offline ready · Synced"
              : "Offline · Entries saved on device"}
          </span>
          <button
            className="icon-button notification"
            aria-label="Notifications"
            type="button"
          >
            <Icon name="bell" />
            <i />
          </button>
          <button
            className="primary-button"
            onClick={() => onRecord()}
            type="button"
          >
            <Icon name="plus" size={18} />
            Record transaction
          </button>
        </div>
      </header>

      <section className="metrics-grid" aria-label="Today’s financial summary">
        <MetricCard
          label="Money in"
          amount={totals.sales}
          note="12 transactions today"
          icon="arrowDown"
          trend="12.5%"
          tone="green"
        />
        <MetricCard
          label="Money out"
          amount={totals.expenses}
          note="4 expenses today"
          icon="arrowUp"
          trend="3.2%"
          tone="dark"
        />
        <MetricCard
          label="Net profit"
          amount={totals.profit}
          note="After stock & expenses"
          icon="chart"
          trend="18.4%"
          tone="amber"
        />
      </section>

      <section className="dashboard-grid">
        <div className="main-column">
          <article className="panel flow-panel">
            <div className="panel-heading">
              <div>
                <h2>Today’s money flow</h2>
                <p>Sales and expenses through the day</p>
              </div>
              <div className="legend">
                <span>
                  <i className="green-dot" />
                  Money in
                </span>
                <span>
                  <i className="dark-dot" />
                  Money out
                </span>
              </div>
            </div>
            <div className="chart-area" aria-label="Hourly money flow chart">
              <div className="y-axis">
                <span>1,500</span>
                <span>1,000</span>
                <span>500</span>
                <span>0</span>
              </div>
              <div className="bars">
                {[
                  [32, 10],
                  [52, 18],
                  [42, 28],
                  [72, 20],
                  [60, 34],
                  [90, 26],
                  [68, 16],
                ].map(([income, expense], index) => (
                  <div className="bar-group" key={index}>
                    <div className="bar-pair">
                      <i
                        className="income-bar"
                        style={{ height: `${income}%` }}
                      />
                      <i
                        className="expense-bar"
                        style={{ height: `${expense}%` }}
                      />
                    </div>
                    <span>
                      {
                        ["8am", "9am", "10am", "11am", "12pm", "1pm", "2pm"][
                          index
                        ]
                      }
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </article>

          <article className="panel activity-panel">
            <div className="panel-heading">
              <div>
                <h2>Recent activity</h2>
                <p>Latest entries from today</p>
              </div>
              <button className="text-button" type="button">
                View all <Icon name="chevron" size={14} />
              </button>
            </div>
            <div className="activity-list">
              {activities.slice(0, 5).map((item) => (
                <div className="activity-row" key={item.id}>
                  <ActivityIcon kind={item.icon} />
                  <div className="activity-copy">
                    <strong>{item.title}</strong>
                    <span>{item.detail}</span>
                  </div>
                  <time>{item.time}</time>
                  <strong
                    className={
                      item.tone === "income"
                        ? "amount-positive"
                        : item.tone === "debt"
                          ? "amount-debt"
                          : ""
                    }
                  >
                    {item.amount > 0 ? "+" : "−"} KES{" "}
                    {money(Math.abs(item.amount))}
                  </strong>
                  <button
                    className="row-more"
                    aria-label={`More options for ${item.title}`}
                    type="button"
                  >
                    <Icon name="more" size={17} />
                  </button>
                </div>
              ))}
            </div>
          </article>
        </div>

        <aside className="right-column">
          <article className="panel balance-panel">
            <div className="panel-heading">
              <div>
                <h2>Cash position</h2>
                <p>Available balance</p>
              </div>
              <button
                className="row-more"
                aria-label="Balance options"
                type="button"
              >
                <Icon name="more" size={18} />
              </button>
            </div>
            <div className="donut-wrap">
              <div className="donut">
                <div>
                  <small>TOTAL</small>
                  <strong>KES 8,520</strong>
                </div>
              </div>
            </div>
            <div className="balance-split">
              <div>
                <span>
                  <i className="cash-dot" />
                  Cash
                </span>
                <strong>KES 3,820</strong>
                <small>45%</small>
              </div>
              <div>
                <span>
                  <i className="mpesa-dot" />
                  M-Pesa
                </span>
                <strong>KES 4,700</strong>
                <small>55%</small>
              </div>
            </div>
          </article>

          <article className="panel quick-panel">
            <div className="panel-heading">
              <div>
                <h2>Quick record</h2>
                <p>Add an entry in seconds</p>
              </div>
            </div>
            <div className="quick-actions">
              <button onClick={() => onRecord("Sale")} type="button">
                <span className="quick-icon sale">
                  <Icon name="arrowDown" />
                </span>
                <span>
                  <strong>Sale</strong>
                  <small>Cash or M-Pesa</small>
                </span>
                <Icon name="chevron" size={16} />
              </button>
              <button onClick={() => onRecord("Expense")} type="button">
                <span className="quick-icon expense">
                  <Icon name="arrowUp" />
                </span>
                <span>
                  <strong>Expense</strong>
                  <small>Stock or utility</small>
                </span>
                <Icon name="chevron" size={16} />
              </button>
              <button onClick={() => onRecord("Debt")} type="button">
                <span className="quick-icon debt">
                  <Icon name="users" />
                </span>
                <span>
                  <strong>Debt</strong>
                  <small>Record or collect</small>
                </span>
                <Icon name="chevron" size={16} />
              </button>
            </div>
          </article>

          <article className="panel stock-panel">
            <div className="stock-heading">
              <div>
                <span className="stock-icon">
                  <Icon name="box" size={20} />
                </span>
                <div>
                  <h2>Passion juice</h2>
                  <p>Today’s batch</p>
                </div>
              </div>
              <span className="stock-status">12 left</span>
            </div>
            <div className="stock-progress">
              <i />
            </div>
            <div className="stock-stats">
              <span>
                <small>MADE</small>
                <strong>28 cups</strong>
              </span>
              <span>
                <small>SOLD</small>
                <strong>16 cups</strong>
              </span>
              <span>
                <small>UNIT COST</small>
                <strong>KES 14</strong>
              </span>
            </div>
          </article>

          <button
            className={closed ? "end-day closed" : "end-day"}
            onClick={onEndDay}
            type="button"
          >
            <span className="end-day-icon">
              <Icon name={closed ? "check" : "chart"} />
            </span>
            <span>
              <strong>{closed ? "Day closed" : "End today’s session"}</strong>
              <small>
                {closed ? "Summary is ready" : "Review and close your books"}
              </small>
            </span>
            <Icon name="chevron" size={17} />
          </button>
        </aside>
      </section>
    </>
  )
}

function RecordModal({
  initialKind,
  onClose,
  onSave,
}: {
  initialKind: string
  onClose: () => void
  onSave: (activity: Activity) => void
}) {
  const [kind, setKind] = useState(initialKind || "Sale")
  const [description, setDescription] = useState("")
  const [amount, setAmount] = useState("")
  const [payment, setPayment] = useState("M-Pesa")

  function submit(event: FormEvent) {
    event.preventDefault()
    const value = Number(amount)
    if (!description.trim() || !value) return
    const isExpense = kind === "Expense"
    onSave({
      id: Date.now(),
      title: description,
      detail:
        kind === "Debt" ? "Payment pending" : `${payment} · Added manually`,
      time: "Just now",
      amount: isExpense ? -value : value,
      tone: isExpense ? "expense" : kind === "Debt" ? "debt" : "income",
      icon: isExpense ? "expense" : kind === "Debt" ? "debt" : "sale",
    })
  }

  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={onClose}>
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="record-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="modal-header">
          <div>
            <p className="eyebrow">NEW ENTRY</p>
            <h2 id="record-title">Record transaction</h2>
          </div>
          <button
            className="icon-button"
            onClick={onClose}
            aria-label="Close"
            type="button"
          >
            <Icon name="close" />
          </button>
        </div>
        <form onSubmit={submit}>
          <div className="type-tabs">
            {["Sale", "Expense", "Debt"].map((item) => (
              <button
                className={kind === item ? "active" : ""}
                key={item}
                onClick={() => setKind(item)}
                type="button"
              >
                {item}
              </button>
            ))}
          </div>
          <label>
            What was it?
            <input
              autoFocus
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              placeholder={
                kind === "Debt"
                  ? "e.g. Allan · 2 passion juices"
                  : `e.g. ${
                      kind === "Sale" ? "3 passion juices" : "Market supplies"
                    }`
              }
            />
          </label>
          <label>
            Amount (KES)
            <input
              inputMode="decimal"
              value={amount}
              onChange={(event) => setAmount(event.target.value)}
              placeholder="0"
            />
          </label>
          {kind !== "Debt" && (
            <label>
              Payment method
              <select
                value={payment}
                onChange={(event) => setPayment(event.target.value)}
              >
                <option>M-Pesa</option>
                <option>Cash</option>
              </select>
            </label>
          )}
          <button className="voice-input" type="button">
            <span>
              <Icon name="mic" />
            </span>
            <span>
              <strong>Say it instead</strong>
              <small>Sheng, Kiswahili or English</small>
            </span>
          </button>
          <div className="modal-footer">
            <button
              className="secondary-button"
              onClick={onClose}
              type="button"
            >
              Cancel
            </button>
            <button className="primary-button" type="submit">
              <Icon name="check" size={17} />
              Save entry
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default function App() {
  const [active, setActive] = useState("Overview")
  const [activities, setActivities] = useState<Activity[]>(initialActivities)
  const [modalKind, setModalKind] = useState<string | null>(null)
  const [closed, setClosed] = useState(false)
  const [online, setOnline] = useState(true)
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    const savedActivities = localStorage.getItem("sautiduka.activities")
    if (savedActivities) {
      try {
        setActivities(JSON.parse(savedActivities) as Activity[])
      } catch {
        setActivities(initialActivities)
      }
    }
    setClosed(localStorage.getItem("sautiduka.closed") === "true")
    setOnline(navigator.onLine)
    setHydrated(true)
  }, [])

  useEffect(() => {
    if (!hydrated) return
    localStorage.setItem("sautiduka.activities", JSON.stringify(activities))
  }, [activities, hydrated])

  useEffect(() => {
    if (!hydrated) return
    localStorage.setItem("sautiduka.closed", String(closed))
  }, [closed, hydrated])

  useEffect(() => {
    const updateConnection = () => setOnline(navigator.onLine)
    window.addEventListener("online", updateConnection)
    window.addEventListener("offline", updateConnection)
    return () => {
      window.removeEventListener("online", updateConnection)
      window.removeEventListener("offline", updateConnection)
    }
  }, [])

  function saveActivity(activity: Activity) {
    setActivities((current) => [activity, ...current])
    setModalKind(null)
  }

  return (
    <div className="app-shell">
      <Sidebar active={active} onChange={setActive} />
      <main className="content">
        {active === "Overview" ? (
          <Dashboard
            activities={activities}
            onRecord={(kind = "Sale") => setModalKind(kind)}
            closed={closed}
            onEndDay={() => setClosed(true)}
            online={online}
          />
        ) : (
          <section className="empty-state">
            <span>
              <Icon
                name={nav.find((item) => item.label === active)?.icon || "home"}
                size={28}
              />
            </span>
            <p className="eyebrow">SAUTIDUKA WORKSPACE</p>
            <h1>{active}</h1>
            <p>
              Your {active.toLowerCase()} workspace is ready. Use the overview
              to add today’s first entry.
            </p>
            <button
              className="primary-button"
              onClick={() => setActive("Overview")}
              type="button"
            >
              Back to overview
            </button>
          </section>
        )}
      </main>
      <nav className="mobile-nav" aria-label="Mobile navigation">
        {nav.slice(0, 4).map((item) => (
          <button
            className={active === item.label ? "active" : ""}
            onClick={() => setActive(item.label)}
            key={item.label}
            type="button"
          >
            <Icon name={item.icon} />
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
      <button
        className="voice-fab"
        aria-label="Record a voice entry"
        onClick={() => setModalKind("Sale")}
        type="button"
      >
        <Icon name="mic" size={24} />
      </button>
      {modalKind && (
        <RecordModal
          initialKind={modalKind}
          onClose={() => setModalKind(null)}
          onSave={saveActivity}
        />
      )}
    </div>
  )
}
