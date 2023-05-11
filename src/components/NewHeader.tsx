import {useRouter} from 'next/router';
import {Container} from "@/components/Container";
import Link from "next/link";

export function NewHeader() {
  let isHomePage = useRouter().pathname === '/';

  return (
    <>
      <header
        className="pointer-events-none relative z-50 flex flex-col"
        style={{
          height: 'var(--header-height)',
          marginBottom: 'var(--header-mb)',
        }}
      >
        <div className="py-5">
          <Container>
            <div className="flex pointer-events-auto">
              <Link href={"/"} className="logo leading-tight cursor-pointer">
                <div className="font-mono text-3xl font-extrabold tracking-tighter">Falko.</div>
                <div className="font-mono -mt-3 text-xl font-extrabold tracking-[8px]">today</div>
              </Link>

              <nav className="menu mt-auto ml-10">
                <ul className="flex space-x-7 font-mono">
                  <li><Link className="cursor-pointer" href={"/about"}>About</Link></li>
                  <li><Link className="cursor-pointer" href={"/articles"}>Articles</Link></li>
                  <li><Link className="cursor-pointer" href={"/drinks"}>Cocktail</Link></li>
                  <li><Link className="cursor-pointer" href={"/speaking"}>Speaking</Link></li>
                  <li><Link className="cursor-pointer" href={"/projects"}>Projects</Link></li>
                </ul>
              </nav>
            </div>
          </Container>
        </div>
      </header>
    </>
  );
}
