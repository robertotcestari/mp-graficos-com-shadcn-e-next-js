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

type UfChartProps = {
  year: number;
  data: { year: string; data: { uf: string; total_expenses: number }[] }[];
};

export default function UfChart({ data, year = 2024 }: UfChartProps) {
  // Encontra os dados do ano
  let chartData = data.find((item) => Number(item.year) === year)?.data;
  if (!chartData) return null;

  // Adiciona média
  if (!chartData.some((item) => item.uf === 'Brasil')) {
    const average = {
      uf: 'Brasil',
      total_expenses:
        chartData.reduce((acc, item) => acc + item.total_expenses, 0) /
        chartData.length,
    };
    chartData.push(average);
  }

  // Ordena por gastos
  chartData = chartData.sort((a, b) => b.total_expenses - a.total_expenses);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white rounded p-2">
          <p className="label">
            <span className="text-violet-500 font-bold">{label}: </span>
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
        <CardTitle className="text-2xl">Gastos por UF</CardTitle>
        <CardDescription>Dados de {year} </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={{}} className="min-h-[600px] w-full ">
          <BarChart data={chartData} layout="vertical">
            <YAxis
              dataKey="uf"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              hide
            />
            <XAxis
              type="number"
              dataKey="total_expenses"
              tickMargin={10}
              tickFormatter={(value) =>
                new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                }).format(value)
              }
            />
            <ChartTooltip content={CustomTooltip} />
            <Bar dataKey="total_expenses" layout="vertical" radius={4}>
              <LabelList
                dataKey="uf"
                position="insideLeft"
                className="fill-white font-bold"
              />
              <LabelList
                dataKey="total_expenses"
                position="insideRight"
                fontSize={10}
                className="fill-white"
                formatter={(value: any) =>
                  new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  }).format(value)
                }
              />
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  className={cn(
                    'fill-current',
                    entry.uf === 'Brasil'
                      ? 'fill-violet-700'
                      : 'fill-violet-500'
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
