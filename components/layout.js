import Header from '../components/header'
import Footer from '../components/footer'

export default function Layout ({children}) {
  return (
    <>
      <Header/>
      <main className="container mx-auto">
        {children}
      </main>
      <Footer/>
    </>
  )
}