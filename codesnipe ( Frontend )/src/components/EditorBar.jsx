import React, { useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "motion/react";
import { cn } from "../lib/utils";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react/dist/iconify.js";
import toast from "react-hot-toast";
import { useEditor } from "../context/EditorContext";

export const EditorNav = ({
  navItems,
  className,
}) => {
  const { scrollY } = useScroll();
  const nav = useNavigate();
  const [visible, setVisible] = useState(true);
  const [lastScroll, setLastScroll] = useState(0);
  const { saveScreenshot } = useEditor();

  const handleShare = () => {
    const currentUrl = window.location.href;
    navigator.clipboard.writeText(currentUrl).then(() => {
      toast.success('Link copied to clipboard');
    }).catch(() => {
      toast.error('Failed to copy link');
    });
  };

  useMotionValueEvent(scrollY, "change", (current) => {
    if (typeof current === "number") {
      const isScrollingDown = current > lastScroll;
      setLastScroll(current);

      // Always show when at top
      if (current < 100) {
        setVisible(true);
      } else {
        setVisible(isScrollingDown ? false : true);
      }
    }
  });

  return (
    (<AnimatePresence mode="wait">
      <motion.div
        initial={{
          opacity: 1,
          y: -100,
        }}
        animate={{
          y: visible ? 0 : -100,
          opacity: visible ? 1 : 0,
        }}
        transition={{
          duration: 0.2,
        }}
        className={cn(
          "flex max-w-fit fixed md:top-4 md:bottom-auto bottom-4 inset-x-0 mx-auto border border-transparent dark:border-white/[0.2] rounded-full dark:bg-black bg-white shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] z-[5000] pr-2 pl-8 py-2  items-center justify-center space-x-4",
          className
        )}>
        {navItems.map((navItem, idx) => (
          <Link
            key={`link=${idx}`}
            to={navItem.link}
            onClick={(e) => {
              if (navItem.name === "Share") {
                e.preventDefault();
                shareFunction();
              }
            }}
            className={cn(
              "relative dark:text-neutral-50 items-center flex space-x-1 text-neutral-600 dark:hover:text-neutral-300 hover:text-neutral-500"
            )}>
            <span className="block sm:hidden">{navItem.icon}</span>
            <span className="hidden sm:block text-sm">{navItem.name}</span>
          </Link>
        ))}
        <button onClick={handleShare} className="relative cursor-pointer dark:text-neutral-50 items-center text-neutral-600 dark:hover:text-neutral-300 hover:text-neutral-500 text-sm">
          <span className="md:hidden"><Icon icon="mdi:share" width="20" /></span>
          <span className="hidden sm:block">
            Share
          </span>
        </button>
        <button
          onClick={saveScreenshot}
          className="border text-sm font-medium relative border-neutral-200 dark:border-white/[0.2] text-black dark:text-white px-4 py-2 rounded-full flex items-center space-x-2">
          <span>Save</span>
          <Icon icon="uil:save" width="20" />
          <span
            className="absolute inset-x-0 w-1/2 mx-auto -bottom-px bg-gradient-to-r from-transparent via-blue-500 to-transparent  h-px" />
        </button>
      </motion.div>
    </AnimatePresence>)
  );
};
