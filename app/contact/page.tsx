import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { MapPin, Phone, Mail, Clock } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with V-Scent Aura for any questions or support.",
}

export default function ContactPage() {
  return (
    <main className="flex min-h-screen flex-col">
      <section className="w-full bg-gradient-to-r from-purple-50 to-pink-50 py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">Contact Us</h1>
            <p className="text-lg text-muted-foreground">
              We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-bold tracking-tight mb-6">Get in Touch</h2>
            <Card className="shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle>Send us a message</CardTitle>
                <CardDescription>Fill out the form below and we'll get back to you within 24 hours.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="first-name">First name</Label>
                    <Input id="first-name" placeholder="Enter your first name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="last-name">Last name</Label>
                    <Input id="last-name" placeholder="Enter your last name" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="Enter your email" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input id="subject" placeholder="What is this about?" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea id="message" placeholder="Tell us how we can help you..." className="min-h-[120px]" />
                </div>
                <Button className="w-full">Send Message</Button>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold tracking-tight mb-6">Contact Information</h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="h-10 w-10 bg-purple-100 rounded-full flex items-center justify-center">
                    <MapPin className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">Address</h3>
                    <p className="text-muted-foreground">
                      123 Fragrance Avenue
                      <br />
                      Molyko
                      <br />
                      Buea
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="h-10 w-10 bg-purple-100 rounded-full flex items-center justify-center">
                    <Phone className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">Phone</h3>
                    <p className="text-muted-foreground">+1(237)677777777</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="h-10 w-10 bg-purple-100 rounded-full flex items-center justify-center">
                    <Mail className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">Email</h3>
                    <p className="text-muted-foreground">hello@vscentaura.com</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="h-10 w-10 bg-purple-100 rounded-full flex items-center justify-center">
                    <Clock className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">Business Hours</h3>
                    <p className="text-muted-foreground">
                      Monday - Friday: 9:00 AM - 6:00 PM
                      <br />
                      Saturday: 10:00 AM - 4:00 PM
                      <br />
                      Sunday: Closed
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-medium mb-4">Frequently Asked Questions</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium">How long does shipping take?</h4>
                  <p className="text-sm text-muted-foreground">
                    Standard shipping takes 3-5 business days. Express shipping is available for next-day delivery.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium">What is your return policy?</h4>
                  <p className="text-sm text-muted-foreground">
                    We accept returns within 30 days of purchase for a full refund.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium">Do you offer samples?</h4>
                  <p className="text-sm text-muted-foreground">
                    Yes! We offer 2ml samples of all our fragrances for 15000 XAF each.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
