import StatusBadge from "./StatusBadge";

export const CarCard = ({ name, price, status, image }: any) => {
  return (
    <div className="group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all hover:shadow-lg dark:border-gray-800 dark:bg-gray-900">
      <div className="relative overflow-hidden">
        <img 
          src={image} 
          alt={name} 
          className="h-44 w-full object-cover transition-transform duration-500 group-hover:scale-110" 
        />
        <div className="absolute top-3 right-3">
          <StatusBadge status={status} />
        </div>
      </div>

      <div className="p-5">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">{name}</h3>
        <div className="mt-1 flex items-baseline gap-1">
          <span className="text-xl font-extrabold text-blue-600 dark:text-blue-400">₹{price}</span>
          <span className="text-xs font-medium text-gray-500 dark:text-gray-400">/day</span>
        </div>
      </div>
    </div>
  );
};