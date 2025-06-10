"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Package, Users, ShoppingCart, DollarSign, Plus, Edit, Trash2, Eye } from "lucide-react"
import { toast } from "sonner"

export default function AdminDashboard() {
  const [isAddingProduct, setIsAddingProduct] = useState(false)

  // Mock data
  const stats = [
    {
      title: "Total Revenue",
      value: "7,407,000 FCFA",
      change: "+12.5%",
      icon: DollarSign,
      color: "text-green-600",
    },
    {
      title: "Orders",
      value: "156",
      change: "+8.2%",
      icon: ShoppingCart,
      color: "text-blue-600",
    },
    {
      title: "Products",
      value: "24",
      change: "+2",
      icon: Package,
      color: "text-purple-600",
    },
    {
      title: "Customers",
      value: "89",
      change: "+15.3%",
      icon: Users,
      color: "text-orange-600",
    },
  ]

  const orders = [
    {
      id: "ORD-001",
      customer: "John Doe",
      email: "john@example.com",
      total: "99,294 FCFA",
      status: "completed",
      date: "2025-06-09",
    },
    {
      id: "ORD-002",
      customer: "Jane Smith",
      email: "jane@example.com",
      total: "53,994 FCFA",
      status: "processing",
      date: "2025-06-08",
    },
    {
      id: "ORD-003",
      customer: "Bob Johnson",
      email: "bob@example.com",
      total: "126,000 FCFA",
      status: "shipped",
      date: "2025-06-07",
    },
  ]

  const products = [
    {
      id: "1",
      name: "Enchanted Bloom",
      category: "Floral",
      price: "53,990 FCFA",
      stock: 15,
      status: "active",
    },
    {
      id: "2",
      name: "Midnight Oud",
      category: "Woody",
      price: "72,000 FCFA",
      stock: 10,
      status: "active",
    },
    {
      id: "3",
      name: "Ocean Breeze",
      category: "Fresh",
      price: "45,300 FCFA",
      stock: 0,
      status: "out_of_stock",
    },
  ]

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsAddingProduct(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    toast.success("Product added successfully!")
    setIsAddingProduct(false)
  }

  const getStatusBadge = (status: string) => {
    const variants = {
      completed: "default",
      processing: "secondary",
      shipped: "outline",
      active: "default",
      out_of_stock: "destructive",
    } as const

    return <Badge variant={variants[status as keyof typeof variants] || "default"}>{status.replace("_", " ")}</Badge>
  }

  return (
    <div className="container mx-auto px-4 py-8 md:py-12 max-w-7xl">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
          <p className="text-muted-foreground mt-1">Manage your V-Scent Aura store</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
        {stats.map((stat) => (
          <Card key={stat.title} className="overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className={`text-sm ${stat.color}`}>{stat.change}</p>
                </div>
                <div className={`h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="orders" className="space-y-6">
        <TabsList className="w-full sm:w-auto">
          <TabsTrigger value="orders" className="flex-1 sm:flex-none">Orders</TabsTrigger>
          <TabsTrigger value="products" className="flex-1 sm:flex-none">Products</TabsTrigger>
          <TabsTrigger value="customers" className="flex-1 sm:flex-none">Customers</TabsTrigger>
          <TabsTrigger value="analytics" className="flex-1 sm:flex-none">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="orders">
          <Card>
            <CardHeader>
              <CardTitle>Recent Orders</CardTitle>
              <CardDescription>Manage and track customer orders</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Order ID</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Total</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {orders.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell className="font-medium">{order.id}</TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium">{order.customer}</p>
                            <p className="text-sm text-muted-foreground">{order.email}</p>
                          </div>
                        </TableCell>
                        <TableCell>{order.total}</TableCell>
                        <TableCell>{getStatusBadge(order.status)}</TableCell>
                        <TableCell>{order.date}</TableCell>
                        <TableCell>
                          <div className="flex justify-end space-x-2">
                            <Button variant="ghost" size="icon">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Edit className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="products">
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h2 className="text-2xl font-bold tracking-tight">Products</h2>
                <p className="text-muted-foreground mt-1">Manage your product catalog</p>
              </div>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Product
              </Button>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Product List</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Stock</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {products.map((product) => (
                        <TableRow key={product.id}>
                          <TableCell className="font-medium">{product.name}</TableCell>
                          <TableCell>{product.category}</TableCell>
                          <TableCell>{product.price}</TableCell>
                          <TableCell>{product.stock}</TableCell>
                          <TableCell>{getStatusBadge(product.status)}</TableCell>
                          <TableCell>
                            <div className="flex justify-end space-x-2">
                              <Button variant="ghost" size="icon">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Add New Product</CardTitle>
                <CardDescription>Create a new product in your catalog</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleAddProduct} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="productName">Product Name</Label>
                      <Input id="productName" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="category">Category</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="floral">Floral</SelectItem>
                          <SelectItem value="woody">Woody</SelectItem>
                          <SelectItem value="fresh">Fresh</SelectItem>
                          <SelectItem value="oriental">Oriental</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="price">Price</Label>
                      <Input id="price" type="number" step="0.01" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="stock">Stock</Label>
                      <Input id="stock" type="number" required />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea id="description" required className="min-h-[100px]" />
                  </div>
                  <div className="flex justify-end">
                    <Button type="submit" disabled={isAddingProduct}>
                      {isAddingProduct ? "Adding..." : "Add Product"}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="customers">
          <Card>
            <CardHeader>
              <CardTitle>Customer Management</CardTitle>
              <CardDescription>View and manage customer accounts</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Customer management features coming soon...</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics">
          <Card>
            <CardHeader>
              <CardTitle>Analytics & Reports</CardTitle>
              <CardDescription>View detailed analytics and reports</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Analytics dashboard coming soon...</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
