import { Link } from "@digdir/designsystemet-react";

const Navbar = () => {
  return (
    <nav>
      <Link href="/">Home</Link>
      <Link href="/profile">Profile</Link>
      <Link href="/auth">Auth</Link>
    </nav>
  );
};

export default Navbar;
