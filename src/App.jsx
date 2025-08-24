import React, { useState } from 'react'
import Announcebar from './components/Announcebar'
import Header from './components/Header'
import NewsLetter from './components/NewsLetter'
import Footer from './components/Footer'
import MainContent from './components/main-content/MainContent'

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  return (
    <div>
      <Announcebar/>
      <Header searchTerm={searchTerm} onSearch={handleSearch}/>
      <MainContent searchTerm={searchTerm}/>
      <NewsLetter/>
      <Footer/>
    </div>
  )
}

export default App