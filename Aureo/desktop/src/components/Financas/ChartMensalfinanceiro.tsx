import {
  ResponsiveContainer,
  Legend,
  Tooltip,
  CartesianGrid,
  XAxis,
  YAxis,
  BarChart,
  Bar,
} from "recharts";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { ChartContainer } from "@/components/ui/chart";

//utils
import { useFinance } from "@/utils/finance/useFinance";

interface ChartMensalFinanceiroProps {
  title: string;
  description: string;
  height?: string;
}

const ChartMensalFinanceiro = ({
  title,
  description,
}: ChartMensalFinanceiroProps) => {
  const { data, dataKeys, config } = useFinance();

  return (
    <Card className="border border-[#33363D] text-white bg-zinc-800/50 backdrop-blur">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>

      <CardContent className="items-center flex justify-center">
        <ChartContainer config={config} className={"h-[400px]"}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} barGap={6}>
              <CartesianGrid strokeDasharray="3 3" stroke="#444" />
              <XAxis dataKey="mes" stroke="#ccc" />
              <YAxis stroke="#ccc" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#0b0b0b",
                  borderRadius: 8,
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
                itemStyle={{ color: "#fff" }}
              />
              <Legend />

              {dataKeys.map((key) => (
                <Bar
                  key={key}
                  dataKey={key}
                  fill={config[key].color}
                  name={config[key].label}
                  radius={[6, 6, 0, 0]}
                />
              ))}
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default ChartMensalFinanceiro;
