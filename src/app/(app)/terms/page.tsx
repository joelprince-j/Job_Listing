export const metadata = { title: "Contributor terms — Math Handwriting Dataset" };

// PLACEHOLDER. The real consent / licensing text must be supplied by the project owner
// (and reviewed legally) before collecting real contributor data — see proposal §11.
// When the text changes, bump CONSENT_VERSION in the backend .env.
export default function TermsPage() {
  return (
    <article className="mx-auto max-w-2xl space-y-4">
      <h1 className="text-2xl font-semibold">Contributor terms (draft)</h1>
      <p className="rounded-md border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-800">
        Placeholder text. The final terms will be provided before public launch.
      </p>
      <p className="text-slate-700">
        By submitting images you confirm that the handwriting is your own, that the images contain no personal
        information about you or anyone else, and that you grant the project the right to store, process, annotate
        and license the images as part of a mathematics handwriting dataset.
      </p>
      <p className="text-slate-700">
        You can ask for your account and submissions to be deleted at any time by contacting the project team.
      </p>
    </article>
  );
}
