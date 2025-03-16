import { cn } from "../lib/utils"
import { motion } from "motion/react"
import React from "react"

const animationProps = {
  initial: { "--x": "100%", scale: 0.8 },
  animate: { "--x": "-100%", scale: 1 },
  whileTap: { scale: 0.95 },
  transition: {
    repeat: Number.POSITIVE_INFINITY,
    repeatType: "loop",
    repeatDelay: 1,
    type: "spring",
    stiffness: 20,
    damping: 15,
    mass: 2,
    scale: {
      type: "spring",
      stiffness: 200,
      damping: 5,
      mass: 0.5,
    },
  },
}

export const ShinyButton = React.forwardRef(({ children, className, ...props }, ref) => {
  return (
    <motion.button
      ref={ref}
      className={cn(
        "relative rounded-lg bg-[#050a1f] border border-[#0f1a4d] px-6 py-2 font-medium backdrop-blur-xl transition-all duration-300 ease-in-out shadow-[0_0_15px_rgba(0,0,0,0.2)] hover:shadow-[0_0_25px_rgba(255,255,255,0.2)] bg-[radial-gradient(circle_at_50%_0%,#0a1433_0%,#050a1f_60%)]",
        className,
      )}
      {...animationProps}
      {...props}
    >
      <span
        className="relative block size-full text-sm uppercase tracking-wide text-white font-medium"
        style={{
          maskImage:
            "linear-gradient(-75deg,hsl(0,0%,100%) calc(var(--x) + 20%),transparent calc(var(--x) + 30%),hsl(0,0%,100%) calc(var(--x) + 100%))",
        }}
      >
        {children}
      </span>
      <span
        style={{
          mask: "linear-gradient(rgb(0,0,0), rgb(0,0,0)) content-box,linear-gradient(rgb(0,0,0), rgb(0,0,0))",
          maskComposite: "exclude",
        }}
        className="absolute inset-0 z-10 block rounded-[inherit] bg-[linear-gradient(-75deg,rgba(255,255,255,0.2)_calc(var(--x)+20%),rgba(255,255,255,0.7)_calc(var(--x)+25%),rgba(255,255,255,0.2)_calc(var(--x)+100%))] p-px"
      ></span>
      <span className="absolute inset-0 -z-10 rounded-lg opacity-40 blur-xl bg-[linear-gradient(-75deg,rgba(255,255,255,0.1)_calc(var(--x)+20%),rgba(255,255,255,0.3)_calc(var(--x)+25%),rgba(255,255,255,0.1)_calc(var(--x)+100%))]"></span>
    </motion.button>
  )
})

ShinyButton.displayName = "ShinyButton"

