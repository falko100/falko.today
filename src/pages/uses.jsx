import Head from 'next/head'

import { Card } from '@/components/Card'
import { Section } from '@/components/Section'
import { SimpleLayout } from '@/components/SimpleLayout'

function ToolsSection({ children, ...props }) {
  return (
    <Section {...props}>
      <ul role="list" className="space-y-16">
        {children}
      </ul>
    </Section>
  )
}

function Tool({ title, href, children }) {
  return (
    <Card as="li">
      <Card.Title as="h3" href={href}>
        {title}
      </Card.Title>
      <Card.Description>{children}</Card.Description>
    </Card>
  )
}

export default function Uses() {
  return (
    <>
      <Head>
        <title>Uses - Falko Woudstra</title>
        <meta
          name="description"
          content="Software I use, gadgets I love, and other things I recommend."
        />
      </Head>
      <SimpleLayout
        title="Software I use, gadgets I love, and other things I recommend."
        intro="I get asked a lot about the things I use to build software, stay productive, or buy to fool myself into thinking I’m being productive when I’m really just procrastinating. Here’s a big list of all of my favorite stuff."
      >
        <div className="space-y-20">
          <ToolsSection title="Workstation">
            <Tool title="13” MacBook Pro, M1, 16GB RAM (2020)">
              I was using an Intel-based 16” MacBook Pro with 64GB RAM prior to
              this, but the performance of the M1 is just amazing. The smaller
              size makes working from the couch more comfortable as well.
            </Tool>
            <Tool title="WASD V3 104-Key Custom Mechanical Keyboard">
              When we were looking into mechanical keyboards for all the
              developers at Coddin, I found WASD Keyboards from the USA. We
              designed some fully customized keyboards in our brand colors and
              they are amazing. To keep the office a bit quiet, we chose Cherry
              MX Silent Red switches.
            </Tool>
            <Tool title="IKEA Markus Chair">
              These chairs are soooo comfortable. Everyone in the office uses
              them and loves them. Although not everyone keeps the armrests
              attached.
            </Tool>
            <Tool title="4k monitor">
              This was a gift from my lovely wife. Amazing piece of technology
              with such crisp details. More information will be added as soon as
              I can find out which one it is.
            </Tool>
          </ToolsSection>
          <ToolsSection title="Development tools">
            <Tool title="JetBrains PhpStorm">
              Started using PhpStorm as a replacement of Eclipse and oh my.
              Especially love the shift+shift quick open file shortcut and
              integrated git support.
            </Tool>
            <Tool title="iTerm2">
              Like most people who use this. I’m not sure why this is better,
              but it works well in combination with OhMyZsh.
            </Tool>
            <Tool title="TablePlus">
              I got introduced to this by a colleague and was mostly using the
              database intergation of PhpStorm before. It works very well. Setup
              is easy and it remembers your SQL snippets over multiple tabs.
            </Tool>
          </ToolsSection>
          <ToolsSection title="Design">
            <Tool title="Adobe XD">
              Coming from Photoshop, Adobe XD is just awesome. They keep adding
              new features. I’m bummed that it is no longer free tho.
            </Tool>
          </ToolsSection>
          <ToolsSection title="Productivity">
            <Tool title="Offline Checklists">
              I try to make a new checklist every day of what I need to do that
              day. If something remains on the checklist, it gets transferred to
              the new one. If I’ve been avoiding a task for multiple days, it
              probably isn’t important so I drop or delegate it.
              <span className="mt-4 block bg-gray-50 p-2 dark:bg-zinc-700">
                <span className="block italic">
                  ″There is nothing so useless as doing efficiently that which
                  should not be done at all.″
                </span>
                <span>- Peter Drucker</span>
              </span>
            </Tool>
          </ToolsSection>
        </div>
      </SimpleLayout>
    </>
  )
}
