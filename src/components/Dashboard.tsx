import { useMemo } from "react"
import { MetricCard } from "./MetricCard"
import { MoneyFlowChart } from "./dashboard/MoneyFlowChart"
import { RecentActivity } from "./dashboard/RecentActivity"
import { CashPosition } from "./dashboard/CashPosition"
import { QuickRecord } from "./dashboard/QuickRecord"
import { StockPanel } from "./dashboard/StockPanel"
import { Icon } from "./ui/Icon"
import type { Activity } from "./ui/types"

export function Dashboard({
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
          <p className="eyebrow">Monday, 12 OCTOBER</p>
          <h1>Good morning, Bill</h1>
          <p className="subhead">
            {closed
              ? "Today's books are closed and ready to review."
              : "Here's how your business is doing today."}
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

      <section className="metrics-grid" aria-label="Today's financial summary">
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
          <MoneyFlowChart />
          <RecentActivity activities={activities} />
        </div>

        <aside className="right-column">
          <CashPosition />
          <QuickRecord onRecord={onRecord} />
          <StockPanel />
          <button
            className={closed ? "end-day closed" : "end-day"}
            onClick={onEndDay}
            type="button"
          >
            <span className="end-day-icon">
              <Icon name={closed ? "check" : "chart"} />
            </span>
            <span>
              <strong>{closed ? "Day closed" : "End today's session"}</strong>
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
