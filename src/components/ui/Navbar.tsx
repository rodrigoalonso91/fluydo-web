import { DesktopMenu } from "./DesktopMenu";
import { MobileMenu } from "./MobileMenu";

export function Navbar() {
  return (
    <header className="bg-primary shadow-sm">
      <DesktopMenu />
      <MobileMenu />
    </header>
  );
}
