import { ActivityRow } from "../ActivityRow"
import { Icon } from "../ui/Icon"
import type { Activity } from "../ui/types"

export function RecentActivity({ activities }: { activities: Activity[] }) {
  return (
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
          <ActivityRow key={item.id} item={item} />
        ))}
      </div>
    </article>
  )
}
