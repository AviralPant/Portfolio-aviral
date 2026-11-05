'use client'

import { useState } from 'react'
import { motion, Variants } from 'framer-motion'
import { Mail, MessageSquare, Send, User } from 'lucide-react'
import { createEmailDraftUrl } from '@/lib/openEmailDraft'

const smoothEase: [number, number, number, number] = [0.22, 1, 0.36, 1]

const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: smoothEase,
    },
  },
}

export default function CommentsSection() {
  const [emailDraftUrl, setEmailDraftUrl] = useState<string | null>(null)

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const name = String(formData.get('name') || '').trim()
    const email = String(formData.get('email') || '').trim()
    const comment = String(formData.get('comment') || '').trim()

    setEmailDraftUrl(
      createEmailDraftUrl('New portfolio comment', {
        Name: name,
        Email: email || 'Not provided',
        Comment: comment,
      }),
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{
        duration: 0.8,
        ease: smoothEase,
      }}
      viewport={{ once: false, amount: 0.2 }}
      className="rounded-[28px] md:rounded-[34px] border border-white/10 bg-white/5 backdrop-blur-xl p-5 md:p-8 h-full"
    >
      <div className="mb-5 md:mb-6">
        <h3 className="text-xl md:text-2xl font-semibold mb-1">
          Leave a Comment
        </h3>
        <p className="text-xs md:text-sm text-white/40">
          Your comment will be sent privately by email.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-3 md:space-y-4"
      >
        <motion.div
          variants={itemVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false }}
          className="relative"
        >
          <User className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
          <input
            name="name"
            autoComplete="name"
            maxLength={120}
            required
            placeholder="Your Name"
            className="w-full rounded-2xl border border-white/15 bg-black/20 pl-12 pr-4 py-3 md:py-4 outline-none focus:border-white"
          />
        </motion.div>

        <motion.div
          variants={itemVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false }}
          className="relative"
        >
          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
          <input
            name="email"
            type="email"
            autoComplete="email"
            maxLength={254}
            placeholder="Your Email (optional)"
            className="w-full rounded-2xl border border-white/15 bg-black/20 pl-12 pr-4 py-3 md:py-4 outline-none focus:border-white"
          />
        </motion.div>

        <motion.div
          variants={itemVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false }}
          className="relative"
        >
          <MessageSquare className="absolute left-4 top-4 text-white/40" />
          <textarea
            name="comment"
            rows={5}
            maxLength={5000}
            required
            placeholder="Your Comment"
            className="w-full rounded-2xl border border-white/15 bg-black/20 pl-12 pr-4 py-3 md:py-4 outline-none resize-none focus:border-white"
          />
        </motion.div>

        {emailDraftUrl && (
          <div role="status" className="space-y-2 text-sm">
            <p className="text-white/60">
              Your comment is ready, but has not been sent yet.
            </p>
            <a
              href={emailDraftUrl}
              className="inline-flex text-emerald-300 underline underline-offset-4 hover:text-emerald-200"
            >
              Open email draft to send your comment
            </a>
          </div>
        )}

        <motion.button
          type="submit"
          variants={itemVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full rounded-2xl py-3 md:py-4 bg-white/10 border border-white/10 transition-all flex items-center justify-center gap-2"
        >
          <Send size={16} />
          Send Comment
        </motion.button>
      </form>
    </motion.div>
  )
}
