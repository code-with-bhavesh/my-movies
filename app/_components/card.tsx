"use client";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import { ReactElement } from "react";

interface Props {
  className: string;
  children: ReactElement;
  imageUrl?: string;
  footer?: ReactElement;
}

export default function CardComponent(props: Props) {
  const { className, children, imageUrl, footer } = props;
  return (
    <Card className={className} placeholder={""}>
      <CardHeader color="blue-gray" className="relative h-56" placeholder={""}>
        <img src={imageUrl} alt="card-image" />
      </CardHeader>
      <CardBody placeholder={""}>{children}</CardBody>
      <CardFooter className="pt-0" placeholder={""}>
        {footer}
      </CardFooter>
    </Card>
  );
}
