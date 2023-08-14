'use client'

import { useToggle } from "@mantine/hooks"
import { Eye, EyeOff } from "lucide-react"
import { Checkbox } from "./checkbox"
import { Input, InputProps } from "./input"

type PasswordInputProps = InputProps & {
  checkboxId: string
}


export default function PassordInput({ checkboxId, ...props }: PasswordInputProps) {
  const [passwordType, togglePasswordType] = useToggle<"password" | "text">(['password', 'text'])

  return (
    <>
      <div className="relative">
        <Input
          type={passwordType}
          {...props}
        />
        <Checkbox
          id={checkboxId}
          className="hidden"
          // @ts-expect-error
          onCheckedChange={togglePasswordType}
        />
        <label
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              document.getElementById(checkboxId)?.click();
            }
          }}
          tabIndex={0}
          htmlFor={checkboxId}
          className="absolute top-0 right-0 bottom-0  flex items-center px-2 focus:outline-none
          focus:bg-gray-300
          rounded-full
          transition
          duration-100
          ease-in
          cursor-pointer
          "
        >
          <PasswordIcon type={passwordType} />
        </label>
      </div>
    </>
  );
}

const PasswordIcon = ({ type }: { type: "password" | "text" }) => {
  if (type === 'password') return <Eye />
  return <EyeOff/>
}