import { Icon } from "../ui/Icon"

export function StockPanel() {
  return (
    <article className="panel stock-panel">
      <div className="stock-heading">
        <div>
          <span className="stock-icon">
            <Icon name="box" size={20} />
          </span>
          <div>
            <h2>Passion juice</h2>
            <p>Today's batch</p>
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
  )
}
