"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CreditCard, Calendar } from "lucide-react";
import { toast } from "sonner";

export default function BillingInfo() {


  const handleSaveBilling = (e) => {
    e.preventDefault();
    toast({
      title: "Billing Info Updated",
      description: "Your billing information has been saved successfully.",
    });
  };

  return (
    <div className="space-y-6 w-4/5 mx-auto my-10">
      {/* Current Subscription */}
      <Card>
        <CardHeader>
          <CardTitle>Current Subscription</CardTitle>
          <CardDescription>Manage your subscription plan</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <h3 className="font-semibold">Premium Plan</h3>
              <p className="text-sm text-muted-foreground">$29.99 / month</p>
            </div>
            <Badge>Active</Badge>
          </div>
          
          <div className="grid grid-cols-2 gap-4 pt-2">
            <div>
              <p className="text-sm text-muted-foreground">Next billing date</p>
              <p className="font-medium">April 1, 2025</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Payment method</p>
              <p className="font-medium">•••• 1234</p>
            </div>
          </div>

          <Separator />

          <div className="flex gap-2">
            <Button variant="outline" className="flex-1">Change Plan</Button>
            <Button variant="outline" className="flex-1">Cancel Subscription</Button>
          </div>
        </CardContent>
      </Card>

      {/* Payment Method */}
      <Card>
        <CardHeader>
          <CardTitle>Payment Method</CardTitle>
          <CardDescription>Update your payment information</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSaveBilling} className="space-y-4">
            <div>
              <Label htmlFor="card-holder">Card Holder Name</Label>
              <Input id="card-holder" placeholder="John Doe" defaultValue="John Doe" />
            </div>
            <div>
              <Label htmlFor="card-number">Card Number</Label>
              <div className="relative">
                <CreditCard className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input id="card-number" placeholder="1234 5678 9012 3456" className="pl-10" defaultValue="•••• •••• •••• 1234" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="expiry">Expiry Date</Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input id="expiry" placeholder="MM/YY" className="pl-10" defaultValue="12/25" />
                </div>
              </div>
              <div>
                <Label htmlFor="cvv">CVV</Label>
                <Input id="cvv" placeholder="123" maxLength={4} />
              </div>
            </div>
            <Button type="submit" className="w-full">Update Payment Method</Button>
          </form>
        </CardContent>
      </Card>

      {/* Billing Address */}
      <Card>
        <CardHeader>
          <CardTitle>Billing Address</CardTitle>
          <CardDescription>Update your billing address</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div>
              <Label htmlFor="billing-address">Street Address</Label>
              <Input id="billing-address" placeholder="123 Main St" defaultValue="123 Main St" />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="city">City</Label>
                <Input id="city" placeholder="New York" defaultValue="New York" />
              </div>
              <div>
                <Label htmlFor="state">State</Label>
                <Input id="state" placeholder="NY" defaultValue="NY" />
              </div>
              <div>
                <Label htmlFor="zip">ZIP Code</Label>
                <Input id="zip" placeholder="10001" defaultValue="10001" />
              </div>
            </div>
            <Button className="w-full">Save Billing Address</Button>
          </form>
        </CardContent>
      </Card>

      {/* Billing History */}
      <Card>
        <CardHeader>
          <CardTitle>Billing History</CardTitle>
          <CardDescription>View your past transactions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { date: "Mar 1, 2025", amount: "$29.99", status: "Paid" },
              { date: "Feb 1, 2025", amount: "$29.99", status: "Paid" },
              { date: "Jan 1, 2025", amount: "$29.99", status: "Paid" }
            ].map((transaction, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">{transaction.date}</p>
                  <p className="text-sm text-muted-foreground">Monthly subscription</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">{transaction.amount}</p>
                  <Badge variant="secondary" className="text-xs">{transaction.status}</Badge>
                </div>
              </div>
            ))}
          </div>
          <Button variant="outline" className="w-full mt-4">View All Transactions</Button>
        </CardContent>
      </Card>
    </div>
  );
}