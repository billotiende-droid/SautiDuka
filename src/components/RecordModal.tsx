import { type FormEvent, useState } from "react"
import { Icon } from "./ui/Icon"
import type { Activity } from "./ui/types"

export function RecordModal({
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
                  : `e.g. ${kind === "Sale" ? "3 passion juices" : "Market supplies"}`
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
