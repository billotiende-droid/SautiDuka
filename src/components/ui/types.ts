export type IconName =
  | "home" | "receipt" | "users" | "box" | "chart" | "settings"
  | "bell" | "cloud" | "wallet" | "phone" | "arrowUp" | "arrowDown"
  | "plus" | "mic" | "more" | "close" | "check" | "chevron"

export type Activity = {
  id: number
  title: string
  detail: string
  time: string
  amount: number
  tone: "income" | "expense" | "debt"
  icon: "sale" | "expense" | "debt" | "stock"
}

export const initialActivities: Activity[] = [
  {
    id: 1,
    title: "Passion juice · 3 cups",
    detail: "M-Pesa sale",
    time: "10:42 AM",
    amount: 360,
    tone: "income",
    icon: "sale",
  },
  {
    id: 2,
    title: "Market supplies",
    detail: "Wakulima Market · Cash",
    time: "9:18 AM",
    amount: -850,
    tone: "expense",
    icon: "expense",
  },
  {
    id: 3,
    title: "Allan · 2 cups",
    detail: "Payment pending",
    time: "8:56 AM",
    amount: 160,
    tone: "debt",
    icon: "debt",
  },
  {
    id: 4,
    title: "Passion fruit batch",
    detail: "10 fruits → 7 cups",
    time: "8:15 AM",
    amount: -100,
    tone: "expense",
    icon: "stock",
  },
]

export const navItems = [
  { label: "Overview", icon: "home" as IconName },
  { label: "Transactions", icon: "receipt" as IconName },
  { label: "Debts", icon: "users" as IconName, badge: "2" },
  { label: "Inventory", icon: "box" as IconName },
  { label: "Reports", icon: "chart" as IconName },
]
