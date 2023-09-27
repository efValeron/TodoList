import React, {memo} from "react";
import {Button, ButtonProps} from "@mui/material";

type PropsType = ButtonProps & {
  children: React.ReactNode
}

export const CustomButton = memo(({children, ...otherProps}: PropsType) => {
  return (
    <Button {...otherProps}>{children}</Button>
  )
})