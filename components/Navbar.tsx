import { Button, Link } from "@digdir/designsystemet-react";

const Navbar = () => {
  return (
    <header>
      <nav className="flex justify-between px-8 items-center bg-amber-100 h-20">
        <Link data-color="neutral" href="/">
          <span className="text-black">Home</span>
        </Link>
        <Link href="/profile">
          <span className="text-black">Profile</span>
        </Link>
        <Button asChild>
          <Link href="/auth">
            <span className="text-white">Login</span>
          </Link>
        </Button>
      </nav>
    </header>
  );
};

export default Navbar;
