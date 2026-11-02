import LegalPage from "@/components/LegalPage";

export const metadata = { title: "Privacy Policy" };

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy policy" updated="2 November 2026">
      <p>
        HateyHat is a community platform for organizing and joining social service events in Bangladesh. This page
        explains what we store about you and why.
      </p>

      <h2>What we collect</h2>
      <ul>
        <li>Your name, email address and profile photo, from the registration form or from Google when you sign in with it.</li>
        <li>The events you create: title, description, type, photo, location and date.</li>
        <li>The events you join, so organizers can see who is coming and you can see your own list.</li>
        <li>Photos you upload for events or your profile.</li>
      </ul>

      <h2>How we use it</h2>
      <ul>
        <li>To log you in and keep you logged in.</li>
        <li>To show your name on events you organize and to show organizers the volunteers who joined.</li>
        <li>We do not sell your data, show ads or share it with third parties.</li>
      </ul>

      <h2>Google sign-in</h2>
      <p>
        When you choose Google, we receive only your name, email address and profile picture. We never see or
        store your Google password.
      </p>

      <h2>Your choices</h2>
      <ul>
        <li>You can update your name and photo at any time on your profile page.</li>
        <li>You can leave any event you joined, and delete any event you created.</li>
        <li>To delete your account, email us and we will remove your account and data.</li>
      </ul>

      <h2>Contact</h2>
      <p>
        Questions about your data: <a className="link link-primary" href="mailto:sheikhsazzaduzzaman@gmail.com">sheikhsazzaduzzaman@gmail.com</a>
      </p>
    </LegalPage>
  );
}
