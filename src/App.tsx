/* eslint-disable @typescript-eslint/no-explicit-any */
import Layout from './components/Layout';
import './App.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import PhotosPage from './pages/Photos';
import { Image, Videotape } from 'lucide-react';
import VideosPage from './pages/Videos';

export const routes = [
  {
    path: '/photos',
    label: 'Photos',
    component: PhotosPage,
    logo: <Image />,
    key: 1
  },
  {
    path: '/videos',
    label: 'Videos',
    component: VideosPage,
    logo: <Videotape />,
    key: 2
  }
]


const App = () => {
  return (
    <BrowserRouter>
      <div className='p-3 bg-gradient-to-r from-indigo-500 dark:from-indigo-950 via-purple-500 dark:via-purple-950 to-pink-500 dark:to-pink-950 font-mono flex-1 flex'>
        <Layout>
          <Routes>
            <Route path='/' element={<Navigate replace to='/photos' />} />
            {routes.map(route => <Route path={route.path} Component={route.component}/>)}
            <Route path='*' element={<Navigate replace to='/photos' />} />
          </Routes>
        </Layout>
      </div>
    </BrowserRouter>
  )
}

export default App
