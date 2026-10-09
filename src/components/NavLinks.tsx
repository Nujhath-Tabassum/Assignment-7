import Link from "next/link";

interface NavItem {
  id: string;
  slug: string;
  nameBn: string;
  icon: string;
}

interface NavLinksProps {
  navs: NavItem[];
}

const NavLinks = ({ navs }: NavLinksProps) => {
  return (
    <nav className="flex h-6.25 items-center gap-7">
      {navs.map((nav) => (
        <Link
          key={nav.id}
          href={`/category/${nav.slug}`}
          className="flex items-center gap-2 whitespace-nowrap font-bold text-gray-700 transition-colors hover:text-green-600"
        >
          <span>{nav.icon}</span>
          <span>{nav.nameBn}</span>
        </Link>
      ))}
    </nav>
  );
};

export default NavLinks;