import Link from "next/link";
import { PageHero } from "@/components/Sections";

export default function NotFound() {
  return (
    <>
      <PageHero crumb="Not found" title="Page not found" text="The page you are looking for doesn't exist." />
      <section className="section">
        <div className="container narrow center">
          <Link href="/courses" className="btn btn-primary">Browse courses</Link>
        </div>
      </section>
    </>
  );
}
