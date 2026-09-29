import { AppConstant } from "@/theme/appConstants";

const Header = () => {
  return (
    <header className="sticky z-10 top-0 h-16">
      {/* scroll indicator progress bar */}
      <nav className="flex items-center justify-between bg-frost/70 px-6 py-3 backdrop-blur-xl sm:px-10">
        {/* name and professional */}
        <div className="flex items-center gap-2">
          <span className="fr-pulse size-2.5 rounded-full bg-sky"></span>
          <span className="font-semibold tracking-tight">
            {AppConstant.nameOfDeveloper}
          </span>
          <span className="hidden sm:inline text-3xs text-deep/40 font-mono">
            {" "}
            / {AppConstant.profession}
          </span>
        </div>

        {/* nav and contact me button */}
        <div className="flex items-center gap-3 text-sm font-medium text-deep/70 sm:gap-5">
          <a href="#" className="nav-link md:inline">
            Work
          </a>
          <a href="#" className="nav-link md:inline">
            Craft
          </a>
          <a href="#" className="nav-link sm:inline">
            About
          </a>
          <a
            href="#"
            className="rounded-full bg-deep px-4 py-1.5 text-sm font-medium text-frost ring-1 ring-white/20 transition-colors hover:bg-abyss"
          >
            {AppConstant.headingButtonTitle}
          </a>
        </div>
      </nav>
    </header>
  );
};

export default Header;
