import { Variants, motion } from "framer-motion"

interface LoaderProps extends React.HTMLAttributes<HTMLDivElement> {
  text?: string
}

const Loader = ({ text }: LoaderProps) => {
  return (
    <div className="grid place-content-center w-full h-full py-4">
      <BarLoader />
      <p className="pt-4 text-opacity-70">{text}</p>
    </div>
  )
}

const variants = {
  initial: {
    scaleY: 0.5,
    opacity: 0,
  },
  animate: {
    scaleY: 1,
    opacity: 1,
    transition: {
      repeat: Infinity,
      repeatType: "mirror",
      duration: 1,
      ease: "circIn",
    },
  },
} as Variants

const BarLoader = () => {
  return (
    <motion.div
      transition={{
        staggerChildren: 0.25,
      }}
      initial="initial"
      animate="animate"
      className="flex gap-1 pl-2"
    >
      <motion.div variants={variants} className="h-12 w-2 bg-secondary" />
      <motion.div variants={variants} className="h-12 w-2 bg-secondary" />
      <motion.div variants={variants} className="h-12 w-2 bg-secondary" />
      <motion.div variants={variants} className="h-12 w-2 bg-secondary" />
      <motion.div variants={variants} className="h-12 w-2 bg-secondary" />
    </motion.div>
  )
}

export default Loader
