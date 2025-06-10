// "use client"

// import { Button } from "@/components/ui/button"
// import { useChatbot } from "@/hooks/use-chatbot"

// export default function HomePageContent() {
//   const { openChatbot } = useChatbot()

//   return (
//     <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
//       <div className="container px-4 md:px-6">
//         <div className="flex flex-col items-center space-y-4 text-center">
//           <div className="space-y-2">
//             <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
//               Discover Your Signature Scent
//             </h1>
//             <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
//               Explore our collection of luxury perfumes and find your perfect fragrance.
//             </p>
//           </div>
//           <div className="space-x-4">
//             <Button size="lg" className="text-base px-8 py-3" onClick={openChatbot}>
//               Chat with our AI Assistant
//             </Button>
//           </div>
//         </div>
//       </div>
//     </section>
//   )
// } 