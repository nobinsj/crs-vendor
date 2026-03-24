import { useState, useMemo } from "react"
import {
  IndianRupee,
  TrendingUp,
  TrendingDown,
  Search,
  Filter,
  Download,
  Calendar,
  ArrowUpRight,
  Wallet,
  Clock,
  ChevronRight,
} from "lucide-react"

// Chart.js Imports
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
  type ChartData,
  type ChartOptions,
} from "chart.js"
import { Line } from "react-chartjs-2"

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
)

// ---------- TYPES & MOCK DATA ----------
type PaymentStatus = "Paid" | "Pending" | "Failed"

interface TransactionT {
  id: string
  customerName: string
  carName: string
  date: string
  amount: number
  status: PaymentStatus
}

const MOCK_TRANSACTIONS: TransactionT[] = [
  {
    id: "TX-901",
    customerName: "Rahul Sharma",
    carName: "Maruti Swift",
    date: "24 Mar, 2026",
    amount: 4500,
    status: "Paid",
  },
  {
    id: "TX-902",
    customerName: "Priya Patel",
    carName: "Mahindra Thar",
    date: "23 Mar, 2026",
    amount: 12000,
    status: "Pending",
  },
  {
    id: "TX-903",
    customerName: "Amit Verma",
    carName: "Honda City",
    date: "22 Mar, 2026",
    amount: 3200,
    status: "Failed",
  },
  {
    id: "TX-904",
    customerName: "Sanya Malhotra",
    carName: "Toyota Innova",
    date: "21 Mar, 2026",
    amount: 8500,
    status: "Paid",
  },
]

// ---------- SUB-COMPONENTS ----------

const StatusBadge = ({ status }: { status: PaymentStatus }) => {
  const styles: Record<PaymentStatus, string> = {
    Paid: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
    Pending:
      "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
    Failed: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  }
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-bold ${styles[status]}`}
    >
      {status}
    </span>
  )
}

const EarningsCard = ({
  title,
  value,
  trend,
  isPositive,
  icon: Icon,
  color,
}: any) => (
  <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all hover:shadow-md dark:border-gray-800 dark:bg-gray-900">
    <div className="flex items-center justify-between">
      <div className={`rounded-xl p-2.5 ${color}`}>
        <Icon size={20} />
      </div>
      <div
        className={`flex items-center gap-1 text-xs font-bold ${isPositive ? "text-emerald-600" : "text-red-600"}`}
      >
        {isPositive ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
        {trend}
      </div>
    </div>
    <div className="mt-4">
      <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
        {title}
      </p>
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
        ₹{value.toLocaleString()}
      </h3>
    </div>
  </div>
)

// ---------- MAIN PAGE ----------

const Earnings = () => {
  const [searchTerm, setSearchTerm] = useState("")

  // Chart Configuration
  const chartData: ChartData<"line"> = useMemo(
    () => ({
      labels: [
        "Mar 18",
        "Mar 19",
        "Mar 20",
        "Mar 21",
        "Mar 22",
        "Mar 23",
        "Mar 24",
      ],
      datasets: [
        {
          fill: true,
          label: "Revenue",
          data: [4200, 6800, 5100, 9400, 7200, 11000, 8500],
          borderColor: "#2563eb", // Blue-600
          backgroundColor: "rgba(37, 99, 235, 0.1)",
          tension: 0.4,
          borderWidth: 3,
          pointRadius: 4,
          pointBackgroundColor: "#2563eb",
        },
      ],
    }),
    []
  )

  const chartOptions: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: "#1f2937",
        titleFont: { size: 12 },
        bodyFont: { size: 14, weight: "bold" },
        padding: 12,
        displayColors: false,
        callbacks: {
          label: (context) => ` ₹${context.parsed.y.toLocaleString()}`,
        },
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: "#9ca3af", font: { size: 11 } },
      },
      y: {
        beginAtZero: true,
        grid: { color: "rgba(156, 163, 175, 0.1)" },
        ticks: {
          color: "#9ca3af",
          font: { size: 11 },
          callback: (value) => `₹${value}`,
        },
      },
    },
  }

  return (
    <div className="mx-auto max-w-7xl space-y-8 p-4 transition-colors md:p-8">
      {/* 1. HEADER */}
      <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            Earnings
          </h1>
          <p className="font-medium text-gray-500 dark:text-gray-400">
            Analyze your revenue and business growth
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-bold text-gray-700 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-200">
            <Calendar size={16} className="text-gray-400" />
            Mar 18 - Mar 24, 2026
          </div>
          <button className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition-all hover:bg-blue-700 active:scale-95">
            <Download size={16} />
            Export
          </button>
        </div>
      </header>

      {/* 2. SUMMARY CARDS */}
      <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <EarningsCard
          title="Total Earnings"
          value={245000}
          trend="+12.5%"
          isPositive={true}
          icon={IndianRupee}
          color="bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400"
        />
        <EarningsCard
          title="This Month"
          value={42800}
          trend="+8.2%"
          isPositive={true}
          icon={ArrowUpRight}
          color="bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400"
        />
        <EarningsCard
          title="Pending"
          value={18400}
          trend="-2.4%"
          isPositive={false}
          icon={Clock}
          color="bg-orange-50 text-orange-600 dark:bg-orange-900/20 dark:text-orange-400"
        />
        <EarningsCard
          title="Available Balance"
          value={125000}
          trend="+5.0%"
          isPositive={true}
          icon={Wallet}
          color="bg-purple-50 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400"
        />
      </section>

      {/* 3. CHART SECTION */}
      <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">
              Revenue Overview
            </h2>
            <p className="mt-1 text-xs font-medium tracking-wide text-gray-500 uppercase">
              Daily performance
            </p>
          </div>
          <div className="flex rounded-lg bg-gray-100 p-1 dark:bg-gray-800">
            <button className="rounded-md bg-white px-4 py-1.5 text-xs font-bold text-gray-900 shadow-sm dark:bg-gray-700 dark:text-white">
              Weekly
            </button>
            <button className="rounded-md px-4 py-1.5 text-xs font-bold text-gray-500 hover:text-gray-900 dark:hover:text-gray-300">
              Monthly
            </button>
          </div>
        </div>

        <div className="h-72 w-full">
          <Line data={chartData} options={chartOptions} />
        </div>
      </section>

      {/* 4. TRANSACTIONS TABLE */}
      <section className="space-y-4">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <h2 className="font-display text-xl font-bold text-gray-900 dark:text-white">
            Recent Transactions
          </h2>
          <div className="flex gap-2">
            <div className="relative">
              <Search
                className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400"
                size={16}
              />
              <input
                type="text"
                placeholder="Search payments..."
                className="rounded-xl border border-gray-200 bg-white py-2 pr-4 pl-9 text-sm outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-800 dark:bg-gray-900 dark:text-white"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button className="flex items-center gap-2 rounded-xl border border-gray-200 px-4 py-2 text-sm font-bold text-gray-600 hover:bg-gray-50 dark:border-gray-800 dark:text-gray-400 dark:hover:bg-gray-800">
              <Filter size={16} />
              Filter
            </button>
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50/50 text-[10px] font-bold tracking-widest text-gray-500 uppercase dark:border-gray-800 dark:bg-gray-950/50 dark:text-gray-400">
                  <th className="px-6 py-4">Transaction Details</th>
                  <th className="px-6 py-4">Car</th>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4">Amount</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {MOCK_TRANSACTIONS.map((tx) => (
                  <tr
                    key={tx.id}
                    className="group transition-colors hover:bg-gray-50/50 dark:hover:bg-gray-800/50"
                  >
                    <td className="px-6 py-4">
                      <p className="text-sm font-bold text-gray-900 dark:text-white">
                        {tx.customerName}
                      </p>
                      <p className="text-[10px] font-semibold tracking-tighter text-gray-400 uppercase">
                        {tx.id}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-200">
                        {tx.carName}
                      </p>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-500 dark:text-gray-400">
                      {tx.date}
                    </td>
                    <td className="px-6 py-4 text-sm font-extrabold text-gray-900 dark:text-white">
                      ₹{tx.amount.toLocaleString()}
                    </td>
                    <td className="px-6 py-4">
                      <StatusBadge status={tx.status} />
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-gray-400 transition-colors hover:text-blue-600">
                        <ChevronRight size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="border-t border-gray-100 p-4 text-center dark:border-gray-800">
            <button className="text-xs font-bold text-blue-600 hover:underline dark:text-blue-400">
              View Transaction History
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Earnings
