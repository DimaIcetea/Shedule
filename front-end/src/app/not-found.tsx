"use client";

import { ErrorMessage } from "@/components/ErrorMessage";

export default function Error() {
  return (
    <ErrorMessage code={404} message={"Невідоме посилання"}/>
  );
}
