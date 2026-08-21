import * as React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { NotFound, ThemeProvider } from "@arcevo/facet-components";
import { LandingLayout } from "@arcevo/facet-layout";
import { Nav } from "./components/Nav.js";
import { HeroSection } from "./components/HeroSection.js";
import { PackagesSection } from "./components/PackagesSection.js";
import { FeaturesSection } from "./components/FeaturesSection.js";
import { DemoSection } from "./components/DemoSection.js";
import { InstallSection } from "./components/InstallSection.js";
import { RoadmapSection } from "./components/RoadmapSection.js";
import { FaqSection } from "./components/FaqSection.js";
import { CTASection } from "./components/CTASection.js";
import { Footer } from "./components/Footer.js";
import { FeedbackPage } from "./components/FeedbackPage.js";
import { AboutPage } from "./components/AboutPage.js";

function HomePage() {
  return (
    <LandingLayout nav={<Nav />} hero={<HeroSection />} footer={<Footer />}>
      <PackagesSection />
      <FeaturesSection />
      <DemoSection />
      <RoadmapSection />
      <FaqSection />
      <InstallSection />
      <CTASection />
    </LandingLayout>
  );
}

function ScrollToTop() {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/feedback" element={<FeedbackPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

function NotFoundPage() {
  return (
    <>
      <Nav />
      <main className="mx-auto max-w-7xl px-8 py-20">
        <NotFound
          animation="gradient"
          title="Page not found"
          description="The page you're looking for doesn't exist or has been moved."
          actionLabel="Go back home"
          actionHref="/"
        />
      </main>
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <ThemeProvider defaultTheme="system">
      <BrowserRouter>
        <ScrollToTop />
        <AppRoutes />
      </BrowserRouter>
    </ThemeProvider>
  );
}
