import { MisceláneoIcon } from "../../icons/CategoryIcons";

export function IndexCard({ name, value = 0, icon: Icon = MisceláneoIcon, color = "bg-gray-500" }) {
  return (
    <div className="flex flex-col rounded-md p-6 shadow-sm bg-white">
      <div className="flex items-center gap-4">
        <div className={`p-3 rounded-full ${color} text-white flex items-center justify-center`}>
          <Icon size={30} />
        </div>
        <h2 className="text-xl font-semibold text-gray-700">{name}</h2>
      </div>
      <span className="mt-4 text-3xl font-bold text-gray-900">{value}</span>
    </div>
  );
}