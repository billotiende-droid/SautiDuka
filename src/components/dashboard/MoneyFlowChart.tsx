const BARS: [number, number][] = [
  [32, 10], [52, 18], [42, 28], [72, 20],
  [60, 34], [90, 26], [68, 16],
]
const LABELS = ["8am", "9am", "10am", "11am", "12pm", "1pm", "2pm"]

export function MoneyFlowChart() {
  return (
    <article className="panel flow-panel">
      <div className="panel-heading">
        <div>
          <h2>Today's money flow</h2>
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
          {BARS.map(([income, expense], index) => (
            <div className="bar-group" key={index}>
              <div className="bar-pair">
                <i className="income-bar" style={{ height: `${income}%` }} />
                <i className="expense-bar" style={{ height: `${expense}%` }} />
              </div>
              <span>{LABELS[index]}</span>
            </div>
          ))}
        </div>
      </div>
    </article>
  )
}
