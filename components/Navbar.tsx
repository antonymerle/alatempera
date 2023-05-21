import Image from "next/image";

const Navbar = () => {
  return (
    <nav>
      <div className="logo">
        <Image width={100} height={100} src="/logo.jpg" alt="logo"></Image>
      </div>
      <h1>A la tempera</h1>
      <ul>
        <li>A propos</li>
        <li>Originaux</li>
        <li>Impressions</li>
        <li>Contact</li>
      </ul>
    </nav>
  );
};

export default Navbar;
