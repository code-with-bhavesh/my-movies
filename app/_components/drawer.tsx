"use client";
import React, { ReactElement } from "react";
import { Drawer, Typography, IconButton } from "@material-tailwind/react";

interface Props {
  open: boolean;
  onClose: () => void;
  title: string;
  children?: ReactElement;
  placement?: "left" | "right" | "top";
  size?: number;
}

export default function DrawerComponent(props: Props) {
  const { open, onClose, title, children, placement, size } = props;

  return (
    <Drawer
      size={size || 250}
      placeholder={""}
      open={open}
      onClose={onClose}
      className="p-4"
      placement={placement || "left"}
    >
      <div className="mb-6 flex items-center justify-between">
        <Typography placeholder={""} variant="h5" color="blue-gray">
          {title}
        </Typography>
        <IconButton
          placeholder={""}
          variant="text"
          color="blue-gray"
          onClick={onClose}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="h-5 w-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </IconButton>
      </div>
      <div className="mb-8 pr-4 font-normal">{children}</div>
    </Drawer>
  );
}
