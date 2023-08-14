'use client'

import { useToggle } from "@mantine/hooks"
import { Eye, EyeOff } from "lucide-react"
import { Checkbox } from "./ui/checkbox"
import { Input } from "./ui/input"

type PasswordInputProps = {
  field: any,
  handleInput: any
}


export default function PassordInput({ field, handleInput }: PasswordInputProps) {
  const [passwordType, togglePasswordType] = useToggle < "password"|"text">(['password', 'text'])


  return (
    <>
      <div className="relative">
        <Input
          type={passwordType}
          placeholder="enter your password"
          {...field}
          onInput={handleInput}
        />
        <Checkbox
          id="toggle-password"
          className="hidden"
          onCheckedChange={togglePasswordType}
        />
        <label
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              document.getElementById("toggle-password")?.click();
            }
          }}
          tabIndex={0}
          htmlFor="toggle-password"
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