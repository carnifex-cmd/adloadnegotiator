import { AdSlot } from './components/AdSlot';

export default function Home() {
  return (
    <main style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem' }}>
      {/* Title and Subtitle */}
      <header style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>
          Ad Load Negotiator Demo
        </h1>
        <p style={{ fontSize: '1.25rem', color: '#666' }}>
          A prototype for intelligent ad loading decisions based on user attention
        </p>
      </header>

      {/* Article Content with Ad Slots */}
      <article style={{ lineHeight: '1.8' }}>
        <p style={{ marginBottom: '1.5rem' }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
          quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
          consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
          cillum dolore eu fugiat nulla pariatur.
        </p>

        <p style={{ marginBottom: '1.5rem' }}>
          Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
          deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste
          natus error sit voluptatem accusantium doloremque laudantium, totam rem
          aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto
          beatae vitae dicta sunt explicabo.
        </p>

        {/* Ad Slot 1 */}
        <AdSlot slotId="ad-slot-1" status="PLACEHOLDER" />

        <p style={{ marginBottom: '1.5rem' }}>
          Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit,
          sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
          Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur,
          adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et
          dolore magnam aliquam quaerat voluptatem.
        </p>

        <p style={{ marginBottom: '1.5rem' }}>
          Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit
          laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure
          reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur,
          vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?
        </p>

        <p style={{ marginBottom: '1.5rem' }}>
          At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis
          praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias
          excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui
          officia deserunt mollitia animi, id est laborum et dolorum fuga.
        </p>

        {/* Ad Slot 2 */}
        <AdSlot slotId="ad-slot-2" status="PLACEHOLDER" />

        <p style={{ marginBottom: '1.5rem' }}>
          Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore,
          cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod
          maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor
          repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum
          necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae
          non recusandae.
        </p>

        <p style={{ marginBottom: '1.5rem' }}>
          Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis
          voluptatibus maiores alias consequatur aut perferendis doloribus asperiores
          repellat. Sed ut perspiciatis unde omnis iste natus error sit voluptatem
          accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo
          inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
        </p>
      </article>
    </main>
  );
}
