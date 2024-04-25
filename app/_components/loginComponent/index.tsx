"use client";

import React from "react";
import { Button, Typography } from "@material-tailwind/react";
import DrawerComponent from "@/app/_components/drawer";
import { signIn } from "next-auth/react";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function DrawerDefault(props: Props) {
  const { open, onClose } = props;

  return (
    <DrawerComponent
      open={open}
      onClose={onClose}
      title="Sign In using Github"
      placement={"left"}
      size={500}
    >
      <div>
        <Typography
          placeholder={""}
          color="gray"
          className="mb-8 pr-4 font-normal"
        >
          You must need to login using github if you need to save favorite movies.
        </Typography>
        <div className="flex gap-2">
          <Button
            onClick={() => signIn('github')}
            placeholder={""}
            size="lg"
            variant="gradient"
          >
            SignIn Using GitHub
          </Button>
        </div>
      </div>
    </DrawerComponent>
  );
}
