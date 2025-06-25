import RegisterForm from "@/components/backend/auth/signup/registerForm";
import { GridBackground } from "@/components/ui/grid-background";
import React from "react";

export default function page() {
  return (
    <GridBackground>
      <div className="px-4">
        <RegisterForm />
      </div>
    </GridBackground>
  );
}
