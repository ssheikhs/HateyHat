import { LuCalendarPlus, LuHandHeart, LuListChecks, LuShieldCheck } from "react-icons/lu";

const features = [
  {
    icon: LuCalendarPlus,
    title: "Post an event in two minutes",
    text: "Add a title, the cause, a photo, the place and a future date. Your event goes live for everyone straight away.",
  },
  {
    icon: LuHandHeart,
    title: "Save your spot with one tap",
    text: "Open any event and press Join. Organizers see how many hands are coming, so they can plan supplies.",
  },
  {
    icon: LuListChecks,
    title: "Keep your calendar in order",
    text: "Joined Events lists everything you signed up for, earliest first, so Friday's plantation never sneaks up on you.",
  },
  {
    icon: LuShieldCheck,
    title: "Only you can edit your events",
    text: "Update or cancel the events you organize. Nobody else can change them, and old dates drop off the listing by themselves.",
  },
];

export default function Features() {
  return (
    <section className="container-page py-20">
      <div className="grid gap-12 lg:grid-cols-[1fr_2fr]">
        <div>
          <h2 className="section-title">Built for the people who show up</h2>
          <p className="section-lead mt-4">
            Most neighbourhood work starts in a Facebook post and gets lost in the comments. HateyHat keeps the who,
            where and when in one place.
          </p>
        </div>
        <ul className="grid gap-x-10 gap-y-10 sm:grid-cols-2">
          {features.map(({ icon: Icon, title, text }) => (
            <li key={title} className="border-t-2 border-primary pt-5">
              <Icon className="h-7 w-7 text-primary" aria-hidden="true" />
              <h3 className="mt-4 text-xl font-bold">{title}</h3>
              <p className="mt-2 text-base-content/75">{text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
