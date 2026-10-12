import { Icon } from "../ui/Icon"

export function QuickRecord({ onRecord }: { onRecord: (kind: string) => void }) {
  const actions = [
    { kind: "Sale", icon: "arrowDown", sub: "Cash or M-Pesa" },
    { kind: "Expense", icon: "arrowUp", sub: "Stock or utility" },
    { kind: "Debt", icon: "users", sub: "Record or collect" },
  ] as const

  return (
    <article className="panel quick-panel">
      <div className="panel-heading">
        <div>
          <h2>Quick record</h2>
          <p>Add an entry in seconds</p>
        </div>
      </div>
      <div className="quick-actions">
        {actions.map(({ kind, icon, sub }) => (
          <button key={kind} onClick={() => onRecord(kind)} type="button">
            <span className={`quick-icon ${kind.toLowerCase()}`}>
              <Icon name={icon} />
            </span>
            <span>
              <strong>{kind}</strong>
              <small>{sub}</small>
            </span>
            <Icon name="chevron" size={16} />
          </button>
        ))}
      </div>
    </article>
  )
}
