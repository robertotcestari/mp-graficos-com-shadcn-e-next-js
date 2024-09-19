'use client';
import { ChartContainer, ChartTooltip } from '@/components/ui/chart';
import { Bar, BarChart, Cell, LabelList, XAxis, YAxis } from 'recharts';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { cn } from '@/lib/utils';

type PartyChartProps = {
  year: number;
  data: {
    year: string;
    data: {
      party: string;
      senator_ids: string[];
      total_expenses: number;
      total_per_senator: number;
    }[];
  }[];
};

export default function PartyChart({ data, year = 2024 }: PartyChartProps) {
  // Encontra os dados do ano
  const chartData = data.find((item) => Number(item.year) === year)?.data;
  if (!chartData) return null;

  let partyChartData = chartData.map((item) => {
    return {
      party: item.party,
      total_per_senator: item.total_per_senator,
    };
  });

  // adiciona a média
  if (!partyChartData.some((item) => item.party === 'Brasil')) {
    const average = {
      party: 'Brasil',
      total_per_senator:
        partyChartData.reduce((acc, item) => acc + item.total_per_senator, 0) /
        partyChartData.length,
    };
    partyChartData.push(average);
  }

  // ordena por gastos
  partyChartData = partyChartData.sort(
    (a, b) => b.total_per_senator - a.total_per_senator
  );

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white rounded p-2">
          <p className="label">
            <span className="text-orange-500 font-bold">{label}: </span>
            <span>
              {new Intl.NumberFormat('pt-br').format(payload[0].value)}
            </span>
          </p>
        </div>
      );
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Gastos por Partido</CardTitle>
        <CardDescription>Dados de {year} </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={{}} className="min-h-[600px] w-full ">
          <BarChart
            data={partyChartData}
            layout="vertical"
            margin={{
              right: 50,
            }}
          >
            <YAxis
              dataKey="party"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              hide
            />
            <XAxis
              type="number"
              dataKey="total_per_senator"
              tickMargin={10}
              tickFormatter={(value) =>
                new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                }).format(value)
              }
            />
            <ChartTooltip content={CustomTooltip} />
            <Bar dataKey="total_per_senator" layout="vertical" radius={4}>
              <LabelList
                dataKey="party"
                position="insideLeft"
                className="fill-white font-bold"
              />
              <LabelList
                dataKey="total_per_senator"
                position="right"
                fontSize={10}
                className="fill-slate-600"
                formatter={(value: any) =>
                  new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  }).format(value)
                }
              />
              {partyChartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  className={cn(
                    'fill-current',
                    entry.party === 'Brasil'
                      ? 'fill-orange-600'
                      : 'fill-orange-500'
                  )}
                />
              ))}
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
