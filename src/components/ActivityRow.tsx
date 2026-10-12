import { Icon, money } from "./ui/Icon"
import type { Activity } from "./ui/types"

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

export function ActivityRow({ item }: { item: Activity }) {
  return (
    <div className="activity-row">
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
        {item.amount > 0 ? "+" : "−"} KES {money(Math.abs(item.amount))}
      </strong>
      <button
        className="row-more"
        aria-label={`More options for ${item.title}`}
        type="button"
      >
        <Icon name="more" size={17} />
      </button>
    </div>
  )
}
