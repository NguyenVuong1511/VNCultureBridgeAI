import { createBrowserRouter } from 'react-router-dom'
import { GuestLayout } from '../layouts/GuestLayout'
import { AboutPage } from '../pages/AboutPage'
import { AiGuidePage } from '../pages/AiGuidePage'
import { ArticleDetailPage } from '../pages/ArticleDetailPage'
import { CategoriesPage } from '../pages/CategoriesPage'
import { HomePage } from '../pages/HomePage'
import { MapPage } from '../pages/MapPage'
import { SearchPage } from '../pages/SearchPage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <GuestLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'map', element: <MapPage /> },
      { path: 'categories', element: <CategoriesPage /> },
      { path: 'search', element: <SearchPage /> },
      { path: 'articles/:slug', element: <ArticleDetailPage /> },
      { path: 'ai-guide', element: <AiGuidePage /> },
      { path: 'about', element: <AboutPage /> },
    ],
  },
])
