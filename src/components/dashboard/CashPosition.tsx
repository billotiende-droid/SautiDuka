import { Icon } from "../ui/Icon"

export function CashPosition() {
  return (
    <article className="panel balance-panel">
      <div className="panel-heading">
        <div>
          <h2>Cash position</h2>
          <p>Available balance</p>
        </div>
        <button className="row-more" aria-label="Balance options" type="button">
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
  )
}
