import { useLocation, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";

export default function OrderConfirmationPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const state = location.state as {
    total?: number;
  } | null;

  const total = state?.total ?? 0;

  return (
    <div className="flex items-center justify-center min-h-screen p-6">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <CardTitle className="text-green-600 text-2xl">
            Order Created Successfully
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <p className="text-gray-500">
            Your order has been processed successfully.
          </p>

          <div className="text-lg font-bold">
            Total: €{total.toFixed(2)}
          </div>

          <Button onClick={() => navigate("/products")} className="w-full">
            Back to Products
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}