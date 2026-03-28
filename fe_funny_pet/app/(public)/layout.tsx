import Navbar from "@/components/web/shared/Navbar";
import Footer from "@/components/web/shared/Footer";
function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Navbar />
      <div>
        {children}
      </div>
      <Footer />
    </div>
  )
}
export default HomeLayout;