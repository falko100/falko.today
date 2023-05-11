import Image from 'next/image';
import Head from 'next/head';

import { Card } from '@/components/Card';
import { SimpleLayout } from '@/components/SimpleLayout';
import coddinSite from '@/images/projects/coddin-site.png';
import elektramat from '@/images/projects/elektramat.png';
import tommie from '@/images/projects/tommie.png';

const projects = [
  {
    name: 'Coddin',
    description:
      'A new website for Coddin. Built with PayloadCMS, Nuxt and a lot of custom CSS.',
    link: { href: 'https://coddin.nl', label: 'coddin.nl', target: '_blank' },
    logo: coddinSite,
  },
  {
    name: 'Elektramat Generatoren',
    description:
      'Custom product generators for fuseboxes, electrical components and charging stations',
    link: {
      href: 'https://elektramat.nl',
      label: 'elektramat.nl',
      target: '_blank',
    },
    logo: elektramat,
  },
  {
    name: 'TommieTheCat Box builder',
    description:
      'Custom box build for catfood subscriptions. Completely headless and build with TypeScript and Vue3.',
    link: {
      href: 'https://boxbuilder.tommiethecat.com',
      label: 'boxbuilder.tommiethecat.com',
      target: '_blank',
    },
    logo: tommie,
  },
];

function LinkIcon(props: { [key: string]: any }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        d="M15.712 11.823a.75.75 0 1 0 1.06 1.06l-1.06-1.06Zm-4.95 1.768a.75.75 0 0 0 1.06-1.06l-1.06 1.06Zm-2.475-1.414a.75.75 0 1 0-1.06-1.06l1.06 1.06Zm4.95-1.768a.75.75 0 1 0-1.06 1.06l1.06-1.06Zm3.359.53-.884.884 1.06 1.06.885-.883-1.061-1.06Zm-4.95-2.12 1.414-1.415L12 6.344l-1.415 1.413 1.061 1.061Zm0 3.535a2.5 2.5 0 0 1 0-3.536l-1.06-1.06a4 4 0 0 0 0 5.656l1.06-1.06Zm4.95-4.95a2.5 2.5 0 0 1 0 3.535L17.656 12a4 4 0 0 0 0-5.657l-1.06 1.06Zm1.06-1.06a4 4 0 0 0-5.656 0l1.06 1.06a2.5 2.5 0 0 1 3.536 0l1.06-1.06Zm-7.07 7.07.176.177 1.06-1.06-.176-.177-1.06 1.06Zm-3.183-.353.884-.884-1.06-1.06-.884.883 1.06 1.06Zm4.95 2.121-1.414 1.414 1.06 1.06 1.415-1.413-1.06-1.061Zm0-3.536a2.5 2.5 0 0 1 0 3.536l1.06 1.06a4 4 0 0 0 0-5.656l-1.06 1.06Zm-4.95 4.95a2.5 2.5 0 0 1 0-3.535L6.344 12a4 4 0 0 0 0 5.656l1.06-1.06Zm-1.06 1.06a4 4 0 0 0 5.657 0l-1.061-1.06a2.5 2.5 0 0 1-3.535 0l-1.061 1.06Zm7.07-7.07-.176-.177-1.06 1.06.176.178 1.06-1.061Z"
        fill="currentColor"
      />
    </svg>
  );
}

export default function Projects() {
  return (
    <>
      <Head>
        <title>Projects - Falko Woudstra</title>
        <meta
          name="description"
          content="These are some of the projects I am proud of."
        />
      </Head>
      <SimpleLayout
        title="These are some of the projects I am proud of."
        intro="I've worked on more projects than I can remember. These are some of the projects I am proud of. When I'm not working on projects for clients, I'm working on my own projects. This blog is one of them. The main reason I started this blog was to learn React and Next.js. I also use this blog to write about things I've learned, and hope others can learn from it as well."
      >
        <ul
          role="list"
          className="grid grid-cols-1 gap-x-12 gap-y-16 sm:grid-cols-2 lg:grid-cols-3"
        >
          {projects.map((project) => (
            <Card as="li" key={project.name}>
              <div className="relative z-10 flex h-40 w-full items-center justify-center bg-white shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0">
                <Image
                  src={project.logo}
                  alt=""
                  className="h-full w-full object-cover object-top"
                  unoptimized
                />
              </div>
              <h2 className="mt-6 text-base font-semibold text-zinc-800 dark:text-zinc-100">
                <Card.Link
                  href={project.link.href}
                  target={project.link.target}
                >
                  {project.name}
                </Card.Link>
              </h2>
              <Card.Description>{project.description}</Card.Description>
              <p className="relative z-10 mt-6 flex text-sm font-medium text-zinc-400 transition group-hover:text-teal-500 dark:text-zinc-200">
                <LinkIcon className="h-6 w-6 flex-none" />
                <span className="ml-2">{project.link.label}</span>
              </p>
            </Card>
          ))}
        </ul>
      </SimpleLayout>
    </>
  );
}
