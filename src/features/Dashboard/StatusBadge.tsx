const StatusBadge = ({ status }: { status: string }) => {
  const styles: Record<string, string> = {
    Confirmed: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
    Pending: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
    Completed: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
    Available: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
    Booked: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  };

  const currentStyle = styles[status] || "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400";

  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-bold uppercase tracking-wider ${currentStyle}`}>
      {status}
    </span>
  );
};

export default StatusBadge;