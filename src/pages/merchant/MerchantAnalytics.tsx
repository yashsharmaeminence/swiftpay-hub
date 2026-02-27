import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { dailyRevenue } from "@/data/mockData";

export default function MerchantAnalytics() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Revenue Analytics</h1>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="glass-card">
          <CardHeader><CardTitle className="text-lg">Daily Revenue</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={dailyRevenue}>
                <defs>
                  <linearGradient id="rev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(195, 90%, 50%)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(195, 90%, 50%)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 15%, 88%)" />
                <XAxis dataKey="date" tick={{ fontSize: 11 }} stroke="hsl(220, 10%, 50%)" />
                <YAxis tick={{ fontSize: 11 }} stroke="hsl(220, 10%, 50%)" />
                <Tooltip />
                <Area type="monotone" dataKey="revenue" stroke="hsl(195, 90%, 50%)" fill="url(#rev)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader><CardTitle className="text-lg">Daily Transactions</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={dailyRevenue}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 15%, 88%)" />
                <XAxis dataKey="date" tick={{ fontSize: 11 }} stroke="hsl(220, 10%, 50%)" />
                <YAxis tick={{ fontSize: 11 }} stroke="hsl(220, 10%, 50%)" />
                <Tooltip />
                <Bar dataKey="transactions" fill="hsl(170, 70%, 40%)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
