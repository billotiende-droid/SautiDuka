"use client"

import { useEffect, useState } from "react"
import { Sidebar } from "@/components/Sidebar"
import { Dashboard } from "@/components/Dashboard"
import { RecordModal } from "@/components/RecordModal"
import { Icon } from "@/components/ui/Icon"
import { initialActivities, navItems, type Activity } from "@/components/ui/types"

export default function App() {
  const [active, setActive] = useState("Overview")
  const [activities, setActivities] = useState<Activity[]>(initialActivities)
  const [modalKind, setModalKind] = useState<string | null>(null)
  const [closed, setClosed] = useState(false)
  const [online, setOnline] = useState(true)
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    const savedActivities = localStorage.getItem("sautiduka.activities")
    if (savedActivities) {
      try {
        setActivities(JSON.parse(savedActivities) as Activity[])
      } catch {
        setActivities(initialActivities)
      }
    }
    setClosed(localStorage.getItem("sautiduka.closed") === "true")
    setOnline(navigator.onLine)
    setHydrated(true)
  }, [])

  useEffect(() => {
    if (!hydrated) return
    localStorage.setItem("sautiduka.activities", JSON.stringify(activities))
  }, [activities, hydrated])

  useEffect(() => {
    if (!hydrated) return
    localStorage.setItem("sautiduka.closed", String(closed))
  }, [closed, hydrated])

  useEffect(() => {
    const updateConnection = () => setOnline(navigator.onLine)
    window.addEventListener("online", updateConnection)
    window.addEventListener("offline", updateConnection)
    return () => {
      window.removeEventListener("online", updateConnection)
      window.removeEventListener("offline", updateConnection)
    }
  }, [])

  function saveActivity(activity: Activity) {
    setActivities((current) => [activity, ...current])
    setModalKind(null)
  }

  return (
    <div className="app-shell">
      <Sidebar active={active} onChange={setActive} />
      <main className="content">
        {active === "Overview" ? (
          <Dashboard
            activities={activities}
            onRecord={(kind = "Sale") => setModalKind(kind)}
            closed={closed}
            onEndDay={() => setClosed(true)}
            online={online}
          />
        ) : (
          <section className="empty-state">
            <span>
              <Icon
                name={navItems.find((item) => item.label === active)?.icon || "home"}
                size={28}
              />
            </span>
            <p className="eyebrow">SAUTIDUKA WORKSPACE</p>
            <h1>{active}</h1>
            <p>
              Your {active.toLowerCase()} workspace is ready. Use the overview
              to add today's first entry.
            </p>
            <button
              className="primary-button"
              onClick={() => setActive("Overview")}
              type="button"
            >
              Back to overview
            </button>
          </section>
        )}
      </main>
      <nav className="mobile-nav" aria-label="Mobile navigation">
        {navItems.slice(0, 4).map((item) => (
          <button
            className={active === item.label ? "active" : ""}
            onClick={() => setActive(item.label)}
            key={item.label}
            type="button"
          >
            <Icon name={item.icon} />
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
      <button
        className="voice-fab"
        aria-label="Record a voice entry"
        onClick={() => setModalKind("Sale")}
        type="button"
      >
        <Icon name="mic" size={24} />
      </button>
      {modalKind && (
        <RecordModal
          initialKind={modalKind}
          onClose={() => setModalKind(null)}
          onSave={saveActivity}
        />
      )}
    </div>
  )
}
