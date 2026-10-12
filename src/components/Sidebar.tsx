import { Icon } from "./ui/Icon"
import { navItems, type IconName } from "./ui/types"

export function Sidebar({
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
          <strong>Smooch Juice Bar</strong>
          <small>Juice & snacks</small>
        </span>
        <Icon name="chevron" size={16} />
      </button>
      <nav className="side-nav" aria-label="Main navigation">
        <p className="nav-label">WORKSPACE</p>
        {navItems.map((item) => (
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
            <strong>Hamphrey Kayange</strong>
            <small>Owner</small>
          </span>
          <Icon name="more" size={18} />
        </div>
      </div>
    </aside>
  )
}
