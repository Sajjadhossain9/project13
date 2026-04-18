import { AppProvider, useApp } from "./context";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Floating from "./components/Floating";
import Home from "./pages/Home";
import {
  About, Academic, Teachers, Notice, Gallery, Contact, Admission, Girls,
  Scholars, Guardians, Hafeez, Student,
} from "./pages/Pages";

function Router() {
  const { page } = useApp();
  switch (page) {
    case "home": return <Home />;
    case "about": return <About />;
    case "academic": return <Academic />;
    case "teachers": return <Teachers />;
    case "scholars": return <Scholars />;
    case "guardians": return <Guardians />;
    case "hafeez": return <Hafeez />;
    case "student": return <Student />;
    case "notice": return <Notice />;
    case "gallery": return <Gallery />;
    case "contact": return <Contact />;
    case "admission": return <Admission />;
    case "girls": return <Girls />;
    default: return <Home />;
  }
}

export default function App() {
  return (
    <AppProvider>
      <div className="min-h-screen bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-100">
        <Navbar />
        <main><Router /></main>
        <Footer />
        <Floating />
      </div>
    </AppProvider>
  );
}
