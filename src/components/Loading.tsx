import React from "react";
import {SimpleLayout} from "@/components/SimpleLayout";

export default function Loading(title?: string) {
  return <SimpleLayout title={title || 'Loading...'}>
    <h1>Please wait a short moment...</h1>
  </SimpleLayout>;
}
