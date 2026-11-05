'use client'

import { motion } from 'framer-motion'
import {
  ArrowRight,
  ArrowUpRight,
} from 'lucide-react'
import { useRouter } from 'next/navigation'

type Props = {
  title: string
  description: string
  index: number
  id?: string
  image?: string
  live_url?: string
  github_url?: string
}

export default function PortfolioCard({
  title,
  description,
  index,
  id,
  image,
  live_url,
  github_url,
}: Props) {
  const router = useRouter()

  return (
    <motion.div
      initial={{
        opacity: 0,
        x: index % 2 === 0 ? -50 : 50,
        y: 20,
      }}
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0,
      }}
      transition={{
        duration: 0.75,
        delay: index * 0.06,
      }}
      whileHover={{ y: -4 }}
      className="group relative rounded-[26px] border border-white/10 bg-white/5 p-4 backdrop-blur-xl flex flex-col min-h-[270px]"
    >
      <div className="w-full h-36 rounded-2xl overflow-hidden border border-white/10 bg-white/[0.03] mb-3">
        {image ? (
          <img
            src={image}
            alt={`${title} project preview`}
            className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
          />
        ) : (
          <div className="relative flex h-full w-full items-center justify-center overflow-hidden bg-gradient-to-br from-white/[0.12] via-white/[0.04] to-transparent">
            <div className="absolute -right-8 -top-12 h-36 w-36 rounded-full border border-white/10" />
            <div className="absolute -right-2 -top-6 h-24 w-24 rounded-full border border-white/10" />
            <span className="text-5xl font-semibold tracking-widest text-white/25">
              {title
                .split(/\s+/)
                .map((word) => word[0])
                .join('')
                .slice(0, 3)
                .toUpperCase()}
            </span>
            <span className="absolute bottom-3 left-4 text-[10px] font-medium uppercase tracking-[0.2em] text-white/45">
              Featured project
            </span>
          </div>
        )}
      </div>

      <h3 className="text-[17px] font-semibold mb-2 leading-tight">
        {title}
      </h3>

      <p className="text-[13px] text-white/60 leading-relaxed line-clamp-2 min-h-[38px]">
        {description}
      </p>

      <div className="mt-auto pt-4 flex items-center justify-between">
        {live_url || github_url ? (
          <a
            href={live_url || github_url}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 text-[13px] text-white/70 hover:text-white transition-all"
          >
            {live_url ? 'Live Demo' : 'View on GitHub'}
            <ArrowUpRight size={14} />
          </a>
        ) : (
          <div className="text-[13px] text-white/35">
            No Link
          </div>
        )}

        {id && (
          <button
            onClick={() =>
              router.push(`/portfolio/${id}`)
            }
            className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 transition-all flex items-center gap-2 text-[13px]"
          >
            Details
            <ArrowRight size={13} />
          </button>
        )}
      </div>
    </motion.div>
  )
}