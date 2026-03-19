import { Toaster as Sonner } from "sonner";

import type { ToasterProps as SonnerProps } from "sonner";

import { useTheme } from "next-themes"; 

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  const themeState = useTheme?.() || { theme: "system" };
  const { theme = "system" } = themeState;

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
        } as React.CSSProperties
      }
      {...props}
    />
  );
};

export { Toaster };
