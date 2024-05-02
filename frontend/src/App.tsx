import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import "./App.css";
import { useEffect, useState } from "react";

function App() {

  const [totalSpent, setTotalSpent] = useState(0)

  useEffect(() => {
    async function fetchTotalSpent() {
      const res = await fetch("/api/expenses/total-spent")
      const data = await res.json()
      setTotalSpent(data.total)
      console.log(data)
    }

    fetchTotalSpent()
  }, [])

  return (
    <>
      <div>
        <h1>Hi mom!</h1>
        <div className="max-w-sm">
          <Card>
            <CardHeader>
              <CardTitle>Total Spent</CardTitle>
              <CardDescription>Card description</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{totalSpent}</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}

export default App;
