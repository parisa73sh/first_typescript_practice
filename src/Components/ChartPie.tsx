import { RootState } from '../redux/store';
import { useSelector } from 'react-redux';
import { PieChart, Pie, Cell } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
type Transaction = {
  id: number;
  Title: string;
  Amount: number;
  Category: string | string[];
  Date: string;
  Type: string;
};

type ResultItem = {
  name: string | string[];
  value: number;
};

const ChartPie = () => {
  const transactions = useSelector(
    (state: RootState) => state.transactions?.transactions ?? []
  ) as Transaction[];

  const validTransactions = transactions.filter(
    (t): t is Transaction =>
      t &&
      typeof t === 'object' &&
      typeof t.Category === 'string' &&
      typeof t.Amount === 'number'
  );

  const data: ResultItem[] = validTransactions.reduce<ResultItem[]>((acc, t) => {
    const found = acc.find((item) => item.name === t.Category);
    if (found) {
      found.value += t.Amount;
    } else {
      acc.push({ name: t.Category, value: t.Amount });
    }
    return acc;
  }, []);
  const defaultData: ResultItem[] = [
  { name: 'بدون داده', value: 1 },
];

const chartData = data.length === 0 ? defaultData : data;

  return (
    <div className="bg-[#1f1d2b76] p-4 rounded-2xl shadow-md flex flex-col justify-center items-center">
      <h2 className="text-lg font-bold mb-4 items-center">نمودار دایره‌ای</h2>
      {data.length === 0 ? (
        <PieChart width={400} height={300}>
            <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
          >
            {chartData.map((entry, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
      ) : (
        <PieChart width={400} height={300}>
          <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100}>
            {data.map((entry, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
      )}
    </div>
  );
};

export default ChartPie;