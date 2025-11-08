import IconsUi from "../ui/IconsUi";

interface Props {
  icon: React.ElementType;
  color: "red" | "blue" | "green" | "amber" | "purple";
  text: string;
  value: number;
}

const CardFinancas = ({ icon, color, text, value }: Props) => {
  const colorMap: Record<string, string> = {
    red: "text-red-500",
    blue: "text-blue-500",
    green: "text-green-500",
    amber: "text-amber-500",
    purple: "text-purple-500",
  };

  return (
    <div className="cursor-pointer flex flex-col border border-[#33363D] backdrop-blur bg-zinc-800/20 rounded-md px-4 py-6 max-w-80 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.3)]  transition-colors duration-300">
      {/* Header */}
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-sm font-medium text-muted-foreground">{text}</h3>
        <IconsUi icon={icon} size={18} className={`${colorMap[color]}`} />
      </div>

      {/* Valor */}
      <h2 className={`text-xl font-bold ${colorMap[color]}`}>R$ {value}</h2>

      {/* Data */}
      <p className="text-xs text-[#777] mt-1">junho 2025</p>
    </div>
  );
};

export default CardFinancas;
