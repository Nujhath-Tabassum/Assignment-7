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
        <nav className="flex w-full flex-wrap items-center justify-center gap-x-4 gap-y-3 py-2 sm:justify-start sm:gap-x-5 md:gap-x-7">

            {navs.map((nav) => (
                <Link
                    key={nav.id}
                    href={`/category/${nav.slug}`}
                    className="flex items-center gap-2 font-bold text-sm text-gray-700 whitespace-nowrap hover:text-green-600 sm:gap-3 sm:text-base"
                >
                    <span>
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