import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import Footer from "./components/Footer";
import About from "./components/About";
import ContactUs from "./components/ContactUs";
import Games from "./components/Games";
import GamePackages from "./components/GamePackages";
import ScrollToTop from "./components/ScrollToTop";
import FAQ from "./components/FAQ";
import ReviewsButton from "./components/ReviewsButton";
import GiftCards from "./components/GiftCards";
import UploadImage from "./components/UploadImage";
import NavBar2 from "./components/NavBar2";
import PackageDetails from "./components/PackageDetails";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import CartDetails from "./components/CartDetails";
import WishlistDetails from "./components/WishlistDetails";
const App= () => {

  return (
    <main className="overflow-x-hidden bg-black">
      <ScrollToTop />
      <NavBar2/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contactus" element={<ContactUs />} />
        <Route path="/games" element={<Games />} />
        <Route path="/giftcards" element={<GiftCards />} />
        <Route path='/games/:group_id' element={<GamePackages />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/upload" element={<UploadImage />} />
        <Route path="/games/:group_id/packages/:package_id" element={<PackageDetails />} />
        <Route path="login" element={<LoginPage/>}/>
        <Route path="/signup" element={<RegisterPage/>}/>
        <Route path="/cartdetails" element={<CartDetails/>}/>
        <Route path="/wishlist" element={<WishlistDetails/>}/>
      </Routes>
      <ReviewsButton />
      <Footer/>
    </main>
  )
}

export default App
