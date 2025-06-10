import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "My Account",
  description: "Manage your account settings and view your orders.",
}

export default function AccountPage() {
  // This would normally be a client component with authentication
  // For this demo, we'll use a static page
  return (
    <div className="container py-8 md:py-12">
      <h1 className="text-3xl font-bold tracking-tight mb-8">My Account</h1>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="addresses">Addresses</TabsTrigger>
          <TabsTrigger value="wishlist">Wishlist</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>Update your account details and preferences.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="first-name">First name</Label>
                  <Input id="first-name" defaultValue="John" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="last-name">Last name</Label>
                  <Input id="last-name" defaultValue="Doe" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" defaultValue="john.doe@example.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" type="tel" defaultValue="+1 (555) 123-4567" />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="orders">
          <Card>
            <CardHeader>
              <CardTitle>Order History</CardTitle>
              <CardDescription>View and track your recent orders.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead className="bg-muted">
                    <tr>
                      <th className="text-left p-4">Order #</th>
                      <th className="text-left p-4">Date</th>
                      <th className="text-left p-4">Status</th>
                      <th className="text-right p-4">Total</th>
                      <th className="p-4"></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t">
                      <td className="p-4 font-medium">ORD-12345</td>
                      <td className="p-4">June 5, 2025</td>
                      <td className="p-4">
                        <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                          Delivered
                        </span>
                      </td>
                      <td className="p-4 text-right">99,294 FCFA</td>
                      <td className="p-4 text-right">
                        <Button variant="ghost" size="sm">
                          View
                        </Button>
                      </td>
                    </tr>
                    <tr className="border-t">
                      <td className="p-4 font-medium">ORD-12344</td>
                      <td className="p-4">May 22, 2025</td>
                      <td className="p-4">
                        <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
                          Shipped
                        </span>
                      </td>
                      <td className="p-4 text-right">53,994 FCFA</td>
                      <td className="p-4 text-right">
                        <Button variant="ghost" size="sm">
                          View
                        </Button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="addresses">
          <Card>
            <CardHeader>
              <CardTitle>Saved Addresses</CardTitle>
              <CardDescription>Manage your shipping and billing addresses.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-medium">Home</h3>
                      <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded">Default</span>
                    </div>
                    <div className="space-x-2">
                      <Button variant="ghost" size="sm">
                        Edit
                      </Button>
                      <Button variant="ghost" size="sm">
                        Delete
                      </Button>
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    <p>John Doe</p>
                    <p>123 Main Street</p>
                    <p>Apt 4B</p>
                    <p>New York, NY 10001</p>
                    <p>United States</p>
                    <p>+1 (555) 123-4567</p>
                  </div>
                </div>

                <div className="border rounded-lg p-4 border-dashed flex items-center justify-center">
                  <Button variant="outline">+ Add New Address</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="wishlist">
          <Card>
            <CardHeader>
              <CardTitle>Wishlist</CardTitle>
              <CardDescription>Products you've saved for later.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                <div className="border rounded-lg overflow-hidden">
                  <div className="aspect-square relative bg-gray-50">
                    <Image
                      src="/placeholder.svg?height=200&width=200"
                      alt="Amber Mystique"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium">Amber Mystique</h3>
                    <p className="text-sm text-muted-foreground">Oriental</p>
                    <div className="mt-2 flex items-center justify-between">
                      <span className="font-medium">66,000 FCFA</span>
                      <Button size="sm">Add to Cart</Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
