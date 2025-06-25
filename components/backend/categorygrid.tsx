
// import { useCategories } from "@/hooks/use-reactquery-category";
// import CategoryCard, { type Card08Props } from "./categorycard";

// interface CardGrid {
//     items: Card08Props[];
//     gridTitle?: string;
// }

// const collections: Card08Props[] = [
//     {
//         title: "Summer Dress Collection",
//         subtitle: "Fit with the latest trends",
//         image: "https://assets.lummi.ai/assets/QmVQpR9kUDEiFupgWrzaUYVii2TLa5zE7h9XDU7okBFdyc?auto=format&w=450",
//         badge: {
//             text: "New",
//             variant: "orange",
//         },
//     },
//     {
//         image: "https://assets.lummi.ai/assets/QmXFtkNH6GJy581VwChHZeQF6qfQM9bkLhF2kDh1px5qKB?auto=format&w=1500",
//         title: "Autumn Essentials",
//         subtitle: "Warm and cozy for the colder months",
//         badge: {
//             text: "New",
//             variant: "orange",
//         },
//     },
//     {
//         image: "https://www.lummi.ai/api/pro/image/a06ede0d-63fb-4d99-be4c-9ba0840cf779?asset=original&cb=1nK52A&auto=format&w=1500",
//         title: "Winter Collection",
//         subtitle: "Colorful for the festive season",
//         badge: {
//             text: "New",
//             variant: "orange",
//         },
//     },
//     {
//         image: "https://assets.lummi.ai/assets/QmPdy3qFqQF8gDQ6KuuUrRaqez3cbdeaYw3GMrxBynLfGd?auto=format&w=1500",
//         title: "Spring Accessories",
//         subtitle: "Hidden treasures for the spring season",
//         badge: {
//             text: "New",
//             variant: "orange",
//         },
//     },
//     {
//         image: "https://assets.lummi.ai/assets/QmVQpR9kUDEiFupgWrzaUYVii2TLa5zE7h9XDU7okBFdyc?auto=format&w=450",
//         title: "Holiday Special",
//         subtitle: "Simple.",
//         badge: {
//             text: "New",
//             variant: "orange",
//         },
//     },
// ];

// export default function CardGrid({
//     items = collections,
//     gridTitle = "Collections 2025 - Summer",
// }: CardGrid) {
//     const {categories} = useCategories()
//     if (!items || items.length === 0) {
//         return (
//             <div className="flex items-center justify-center h-64">
//                 <p className="text-lg text-zinc-500 dark:text-zinc-400">
//                     No items to display.
//                 </p>
//             </div>
//         );
//     }

//     return (
//         <section className="w-full py-0 md:py-0">
//             <div className="container mx-auto px-4 md:px-6">
//                 {gridTitle && (
//                     <h2 className="mb-2 tracking-tighter text-3xl font-bold  text-left text-zinc-900 dark:text-zinc-100 sm:text-4xl">
//                         {gridTitle}
//                     </h2>
//                 )}
//                 <p className="mb-8 text-lg text-left text-zinc-900 dark:text-zinc-100 tracking-tight">
//                     Explore the latest collections for the summer season.
//                 </p>
//                 <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 place-items-center">
//                     {items.map((item, index) => (
//                         <CategoryCard
//                             key={`${item.href}-${item.title}-${index}`}
//                             title={item.title}
//                             subtitle={item.subtitle}
//                             image={item.image}
//                             badge={item.badge}
//                             href={item.href}
//                         />
//                     ))}
//                 </div>
//             </div>
//         </section>
//     );
// }
