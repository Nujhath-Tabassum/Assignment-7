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
        <nav className="h-6.25 flex items-center  gap-7">

            {navs.map((nav) => (
                <Link
                    key={nav.id}
                    href={`/category/${nav.slug}`}
                    className="flex items-center gap-3  font-bold text-gray-700 whitespace-nowrap hover:text-green-600"
                >
                    <span >
                        {nav.icon}
                    </span>

                    <span>
                        {nav.nameBn}
                    </span>
                </Link>
            ))}

        </nav>
    );
};

export default NavLinks;