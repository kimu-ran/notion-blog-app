import Link from "next/link";
import React from "react";


const Navbar = () => {
	return <nav className="container mx-auto lg:px-2 px-5 lg:w-2/3">
		<div className="container flex items-center justify-between">
			<Link href="/" className="text-2xl font-medium">BLOG</Link>
			<div>
				<ul className="flex gap-1 items-center text-sm py-4">
					<li>
						<Link href="/" className="block py-2 px-4 hover:text-sky-900 hover:underline transition-all duration-300">Home</Link>
					</li>
					<li>
						<Link href="/posts" className="block  py-2 px-4 hover:text-sky-900 hover:underline transition-all duration-300">Posts</Link>
					</li>
				</ul>
			</div>
		</div>
	</nav>;
};

export default Navbar;