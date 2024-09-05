import Link from "next/link";

export default function NavItems() {
	return (
		<>
			<li>
				<Link
					href="/"
					className="text-muted-foreground hover:text-foreground transition-colors"
				>
					Home
				</Link>
			</li>
			<li>
				<Link
					href="/social"
					className="text-muted-foreground hover:text-foreground transition-colors"
				>
					Social
				</Link>
			</li>
			<li>
				<Link
					href="/about"
					className="text-muted-foreground hover:text-foreground transition-colors"
				>
					About
				</Link>
			</li>
			<li>
				<Link
					href="/contact"
					className="text-muted-foreground hover:text-foreground transition-colors"
				>
					Contact
				</Link>
			</li>
		</>
	);
}
