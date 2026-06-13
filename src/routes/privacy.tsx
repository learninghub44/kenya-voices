import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader, SiteFooter } from "@/components/layout";

export const Route = createFileRoute("/privacy")({
  head: () => ({ meta: [{ title: "Privacy — Voice of Kenya" }, { name: "description", content: "Privacy policy of Voice of Kenya." }] }),
  component: Privacy,
});

function Privacy() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1 container-vok py-16 max-w-3xl prose prose-neutral">
        <h1 className="font-display text-4xl font-bold">Privacy Policy</h1>
        <h2 className="font-display text-xl font-bold mt-8">Independent Community Platform</h2>
        <p>Voice of Kenya (Sauti ya Wananchi) is an independently operated civic platform. It is not owned, endorsed, or controlled by the Government of Kenya or any public institution unless explicitly stated.</p>
        <h2 className="font-display text-xl font-bold mt-6">Public Nature of Reports</h2>
        <p>Reports submitted are public by design. Title, description, county, sub-county, images, status updates, and comments may be visible to all visitors. Do not include unnecessary personal information.</p>
        <h2 className="font-display text-xl font-bold mt-6">Media and Image Usage</h2>
        <p>By uploading images, you confirm you have the right to do so and that the image does not violate rights of others or contain unlawful content.</p>
        <h2 className="font-display text-xl font-bold mt-6">Analytics and Research</h2>
        <p>Anonymous, aggregated data may be used for civic research, public-interest reporting, and statistical analysis.</p>
        <h2 className="font-display text-xl font-bold mt-6">Data Deletion</h2>
        <p>You may request removal of personal information associated with a report where practical and lawful. Issue records may be retained in anonymized form.</p>
        <h2 className="font-display text-xl font-bold mt-6">Legal Requests</h2>
        <p>Information may be disclosed when required by court orders, legal proceedings, law enforcement requests, or regulatory obligations.</p>
      </main>
      <SiteFooter />
    </div>
  );
}
