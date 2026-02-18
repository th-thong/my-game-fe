import { Middle } from "@/components/NavBar/Middle";
import { Right } from "@/components/NavBar/Right";
import { Left } from "@/components/NavBar/Left";

export function NavBar() {
  return (
    <nav className="grid grid-cols-3 h-14 w-full items-center px-6 bg-background">
      <Left />
      <Middle />
      <Right />
    </nav>
  );
}
