"use client";
import React from "react";
import { Navbar, Typography, Button } from "@material-tailwind/react";
import LoginComponent from "@/app/_components/loginComponent";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";

export default function NavBar() {
  const { data, status } = useSession();

  const [open, setOpen] = React.useState(false);

  const openDrawer = () => setOpen(true);
  const closeDrawer = () => setOpen(false);
  return (
    <div>
      <Navbar
        placeholder={""}
        className="mx-auto max-w-screen-xl px-4 py-2 lg:px-8 lg:py-4 mt-4"
      >
        <div className="container mx-auto flex items-center justify-between text-blue-gray-900">
          <div className="flex items-center gap-x-1">
            {status === "authenticated" ? (
              <Button
                onClick={() => signOut()}
                placeholder={""}
                variant="gradient"
                size="sm"
              >
                <span>Sign out</span>
              </Button>
            ) : (
              <Button
                placeholder={""}
                variant="gradient"
                size="sm"
                onClick={openDrawer}
              >
                <span>Sign in</span>
              </Button>
            )}
          </div>
          {status === "authenticated" && (
            <Typography
              placeholder={""}
              className="mr-4 cursor-pointer py-1.5 font-medium flex items-center"
            >
              <img src={data?.user?.image || ""} className="h-12 mr-2" />{" "}
              {data?.user?.name}
            </Typography>
          )}

        </div>
      </Navbar>
      <LoginComponent open={open} onClose={closeDrawer} />
    </div>
  );
}
