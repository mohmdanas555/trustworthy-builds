import { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";

interface LayoutProps {
  children: ReactNode;
  headerBrandName?: string;
  headerBrandSubtitle?: string;
}

const Layout = ({ children, headerBrandName, headerBrandSubtitle }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header brandName={headerBrandName} brandSubtitle={headerBrandSubtitle} />
      <main className="flex-1 pt-20">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
