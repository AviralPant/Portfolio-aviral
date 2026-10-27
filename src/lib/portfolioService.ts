import { supabase } from '@/lib/supabase'

const defaultTechStacks = [
  { id: 'javascript', name: 'JavaScript', logo_url: 'https://cdn.simpleicons.org/javascript/F7DF1E' },
  { id: 'typescript', name: 'TypeScript', logo_url: 'https://cdn.simpleicons.org/typescript/3178C6' },
  { id: 'react', name: 'React', logo_url: 'https://cdn.simpleicons.org/react/61DAFB' },
  { id: 'nextjs', name: 'Next.js', logo_url: 'https://cdn.simpleicons.org/nextdotjs/FFFFFF' },
  { id: 'tailwindcss', name: 'Tailwind CSS', logo_url: 'https://cdn.simpleicons.org/tailwindcss/06B6D4' },
  { id: 'supabase', name: 'Supabase', logo_url: 'https://cdn.simpleicons.org/supabase/3FCF8E' },
  { id: 'threejs', name: 'Three.js', logo_url: 'https://cdn.simpleicons.org/threedotjs/FFFFFF' },
  { id: 'react-three-fiber', name: 'React Three Fiber', logo_url: 'https://cdn.simpleicons.org/react/61DAFB' },
  { id: 'framer-motion', name: 'Framer Motion', logo_url: 'https://cdn.simpleicons.org/framer/0055FF' },
  { id: 'gsap', name: 'GSAP', logo_url: 'https://cdn.simpleicons.org/greensock/88CE02' },
  { id: 'git', name: 'Git', logo_url: 'https://cdn.simpleicons.org/git/F05032' },
  { id: 'github', name: 'GitHub', logo_url: 'https://cdn.simpleicons.org/github/FFFFFF' },
  { id: 'vercel', name: 'Vercel', logo_url: 'https://cdn.simpleicons.org/vercel/FFFFFF' },
]

export const fetchProjects = async () => {
  const { data } = await supabase
    .from('projects')
    .select('*')
    .order('created_at', {
      ascending: true,
    })

  return data || []
}

export const fetchCertificates = async () => {
  const { data } = await supabase
    .from('certificates')
    .select('*')
    .order('created_at', {
      ascending: true,
    })

  return data || []
}

export const fetchTechStacks = async () => {
  const { data } = await supabase
    .from('tech_stack')
    .select('*')
    .order('created_at', {
      ascending: true,
    })

  return data?.length ? data : defaultTechStacks
}