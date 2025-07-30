// 'use client'
// import React from 'react';
// import { Card, CardContent} from '@/components/ui/card';
// import { useMovieStats } from '@/hooks/useMovieImport';
// import { Database, Film, Star} from 'lucide-react';

// export const MovieStats: React.FC = () => {
//   const { data: stats, isLoading } = useMovieStats();

//   const statItems = [
//     {
//       title: 'Total Movies',
//       value: stats?.total_movies || 0,
//       icon: Database,
//       color: 'text-blue-600',
//       bgColor: 'bg-blue-100',
//     },
//     {
//       title: 'Total Genres',
//       value: stats?.total_genres || 0,
//       icon: Film,
//       color: 'text-green-600',
//       bgColor: 'bg-green-200',
//     },
//     {
//       title: 'Total Ratings',
//       value: stats?.total_ratings || 0,
//       icon: Star,
//       color: 'text-yellow-600',
//       bgColor: 'bg-yellow-100',
//     },

//   ];

//   if (isLoading) {
//     return (
//       <>
//         {Array.from({ length: 3 }).map((_, i) => (
//           <Card key={i}>
//             <CardContent className="p-6">
//               <div className="animate-pulse">
//                 <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
//                 <div className="h-8 bg-gray-200 rounded w-1/2"></div>
//               </div>
//             </CardContent>
//           </Card>
//         ))}
//       </>
//     );
//   }

//   return (
//     <>
//       {statItems.map((item) => (
//         <Card key={item.title}>
//           <CardContent className="p-6">
//             <div className="flex items-center justify-evenly">
//               <div>
//                 <p className="text-sm font-medium text-gray-600">{item.title}</p>
//                 <p className="text-2xl font-bold text-gray-900">
//                   {item.value.toLocaleString()}
//                 </p>
//               </div>
//               <div className={`p-3 rounded-full ${item.bgColor}`}>
//                 <item.icon className={`h-6 w-6 ${item.color}`} />
//               </div>
//             </div>
//           </CardContent>
//         </Card>
//       ))}
//     </>
//   );
// };

'use client'
import React from 'react';
import { Card, CardContent} from '@/components/ui/card';
import { useMovieStats } from '@/hooks/useMovieImport';
import { Database, Film, Star} from 'lucide-react';

export const MovieStats: React.FC = () => {
  const { data: stats, isLoading } = useMovieStats();

  const statItems = [
    {
      title: 'Total Movies',
      value: stats?.total_movies || 0,
      icon: Database,
      color: 'text-blue-600 dark:text-blue-400',
      bgColor: 'bg-blue-100 dark:bg-blue-900/50',
    },
    {
      title: 'Total Genres',
      value: stats?.total_genres || 0,
      icon: Film,
      color: 'text-green-600 dark:text-green-400',
      bgColor: 'bg-green-100 dark:bg-green-900/50',
    },
    {
      title: 'Total Ratings',
      value: stats?.total_ratings || 0,
      icon: Star,
      color: 'text-yellow-600 dark:text-yellow-400',
      bgColor: 'bg-yellow-100 dark:bg-yellow-900/50',
    },
  ];

  if (isLoading) {
    return (
      <>
        {Array.from({ length: 3 }).map((_, i) => (
          <Card key={i}>
            <CardContent className="p-6">
              <div className="animate-pulse">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
                <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </>
    );
  }

  return (
    <>
      {statItems.map((item) => (
        <Card key={item.title}>
          <CardContent className="p-6">
            <div className="flex items-center justify-evenly">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  {item.title}
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {item.value.toLocaleString()}
                </p>
              </div>
              <div className={`p-3 rounded-full ${item.bgColor}`}>
                <item.icon className={`h-6 w-6 ${item.color}`} />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </>
  );
};