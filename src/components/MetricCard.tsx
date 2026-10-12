import { Icon, money } from "./ui/Icon"
import type { IconName } from "./ui/types"

export function MetricCard({
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
