import PortfolioClient from "../../components/PortfolioClient";
import { createMetadata } from "../../lib/seo";

export const metadata = createMetadata({
  title: "Portfolio Projects",
  description:
    "Explore Ayon Bit's portfolio of responsive websites, e-commerce interfaces, chat apps, dashboards, and full-stack web applications.",
  path: "/portfolio",
  keywords: ["web development portfolio", "Next.js projects", "React projects"],
});

const PortfolioPage = () => {
  return (
    <section className="container mx-auto">
      <PortfolioClient />
    </section>
  );
};

export default PortfolioPage;
