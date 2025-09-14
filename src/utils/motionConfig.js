export const SearchBoxConfig = {
  open: {
    height: "500px",
    width: "500px",
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 20,
    },
  },
  close: {
    height: "70px",
    width: "500px",
    // height: "500px",
    // width: "500px",
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 20,
    },
  },
};

export const filterPopUpContainerConfig = {
  open: {
    scaleY: 1,
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.1, 0.25, 1],
      when: "beforeChildren",
      staggerChildren: 0.08,
    },
  },
  close: {
    scaleY: 0,
    opacity: 0,
    transition: {
      duration: 0.3,
      ease: [0.25, 0.1, 0.25, 1],
      when: "afterChildren",
    },
  },
};
export const filterPopUpChildConfig = {
  open: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3 },
  },
  close: {
    opacity: 0,
    y: -10,
    transition: { duration: 0.2 },
  },
};

export const resultCardContainerConfig = {
  hidden: { opacity: 0 },
  show: { opacity: 1 },
};

export const resultCardChildContainerConfig = {
  hidden: { opacity: 0, x: -15 },
  show: (i) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.35,
      ease: [0.25, 0.8, 0.25, 1],
    },
  }),
};
