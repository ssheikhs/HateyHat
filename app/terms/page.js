import LegalPage from "@/components/LegalPage";

export const metadata = { title: "Terms of Service" };

export default function TermsPage() {
  return (
    <LegalPage title="Terms of service" updated="2 November 2026">
      <p>By using HateyHat you agree to these terms.</p>

      <h2>Using HateyHat</h2>
      <ul>
        <li>Give accurate information when you register and when you create events.</li>
        <li>Only create real social service events. Events that are misleading, commercial, political campaigning or unsafe may be removed.</li>
        <li>Only upload photos you have the right to share.</li>
      </ul>

      <h2>Events</h2>
      <ul>
        <li>Each event is organized by the person who created it, not by HateyHat. Organizers are responsible for their events.</li>
        <li>Joining an event tells the organizer you plan to come. Please leave the event if you can no longer attend.</li>
        <li>Volunteers take part at their own risk and should follow the organizer&apos;s safety instructions.</li>
      </ul>

      <h2>Accounts</h2>
      <ul>
        <li>Keep your password private. You are responsible for activity on your account.</li>
        <li>We may suspend accounts that break these terms.</li>
      </ul>

      <h2>Changes</h2>
      <p>We may update these terms. The date at the top shows the latest version.</p>

      <h2>Contact</h2>
      <p>
        <a className="link link-primary" href="mailto:sheikhsazzaduzzaman@gmail.com">sheikhsazzaduzzaman@gmail.com</a>
      </p>
    </LegalPage>
  );
}
