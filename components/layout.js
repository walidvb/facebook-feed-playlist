import Header from '../components/header'
import Footer from '../components/footer'

export default function Layout ({children}) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header/>
      <main className="container mx-auto flex-grow flex flex-col">
        {children}
      </main>
      <Footer/>
    </div>
  )
}