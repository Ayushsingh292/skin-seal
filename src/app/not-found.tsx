import Link from "next/link";
import { PageHero } from "@/components/shared";
export default function NotFound() {
  return (
    <PageHero
      label="Page not found"
      title="Let’s find the right way forward."
      description="The page or product you requested could not be found."
    >
      <div className="button-row">
        <Link className="button" href="/">
          Back to Home
        </Link>
        <Link className="button outline" href="/products">
          Explore Products
        </Link>
      </div>
    </PageHero>
  );
}
