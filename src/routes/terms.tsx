import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader, SiteFooter } from "@/components/layout";

export const Route = createFileRoute("/terms")({
  head: () => ({ meta: [{ title: "Terms — Voice of Kenya" }, { name: "description", content: "Terms of service for Voice of Kenya." }] }),
  component: Terms,
});

function Terms() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1 container-vok py-16 max-w-3xl prose prose-neutral">
        <h1 className="font-display text-4xl font-bold">Terms of Service</h1>
        <h2 className="font-display text-xl font-bold mt-8">Platform Ownership</h2>
        <p>Voice of Kenya is a privately developed and independently operated civic reporting platform. It is not a government agency, county office, or law enforcement body.</p>
        <h2 className="font-display text-xl font-bold mt-6">No Government Affiliation</h2>
        <p>Issue publication does not guarantee official action by any government entity.</p>
        <h2 className="font-display text-xl font-bold mt-6">Community Responsibility</h2>
        <p>Users are responsible for the accuracy of submissions. Users must not submit false reports, publish defamatory statements, misrepresent facts, harass others, or upload manipulated evidence.</p>
        <h2 className="font-display text-xl font-bold mt-6">Donations and Support</h2>
        <p>Contributions are voluntary support for platform sustainability and do not grant ownership, editorial control, or administrative privileges.</p>
        <h2 className="font-display text-xl font-bold mt-6">Disclaimer</h2>
        <p>The platform cannot guarantee that every report or comment is accurate. Independently verify information before relying on it.</p>
        <h2 className="font-display text-xl font-bold mt-6">Limitation of Liability</h2>
        <p>To the fullest extent permitted by law, the platform owner, contributors, volunteers, and sponsors shall not be liable for indirect damages, lost profits, data loss, or third-party service failures arising from use of the platform.</p>
      </main>
      <SiteFooter />
    </div>
  );
}
