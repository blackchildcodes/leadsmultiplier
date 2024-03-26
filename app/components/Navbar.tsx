import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./ThemeToggle";
import {
    RegisterLink,
    LoginLink,
    LogoutLink
} from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Image from "next/image";
import { UserNav } from "./UserNav";

export async function Navbar() {
    const { isAuthenticated, getUser } = getKindeServerSession();
    const user = await getUser();

    return(
        <nav className="border-b bg-background h-[10vh] flex items-center">
            <div className="container flex items-center justify-between">
                <Link href="/">
                <Image
                    src="/assets/website/logo.png"
                    width={80}
                    height={80}
                    alt=""
                />
                </Link>

                <div className="flex items-center gap-x-5">
                    <ThemeToggle />

                    {(await isAuthenticated()) ? (
                        <UserNav
                            email={user?.email as string}
                            image={user?.picture as string}
                            name={user?.given_name as string}
                        />
                    ) : (
                        <div className="flex items-center gap-x-5">
                            <LoginLink>
                                <Button>Sign In</Button>
                            </LoginLink>

                            <RegisterLink>
                                <Button variant="secondary">Sign Up</Button>
                            </RegisterLink>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}