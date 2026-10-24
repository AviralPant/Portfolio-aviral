import { createBrowserClient } from "@supabase/auth-helpers-nextjs";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

function createFallbackSupabaseClient() {
  const createChain = () => {
    const chainObj = {
      select: () => createChain(),
      insert: () => createChain(),
      update: () => createChain(),
      delete: () => createChain(),
      eq: () => createChain(),
      order: () => createChain(),
      limit: () => createChain(),
      single: async () => ({ data: null, error: null, count: 0 }),
      maybeSingle: async () => ({ data: null, error: null, count: 0 }),
      range: () => createChain(),
      then: (resolve: any) => Promise.resolve({ data: null, error: null, count: 0 }).then(resolve),
    };
    return chainObj;
  };

  return {
    from: () => createChain(),
    auth: {
      getSession: async () => ({ data: { session: null }, error: null }),
      signInWithPassword: async () => ({ data: null, error: { message: "Supabase not configured" } }),
      signOut: async () => ({ error: null }),
    },
    storage: {
      from: () => ({
        upload: async () => ({ data: null, error: null }),
        download: async () => ({ data: null, error: null }),
        remove: async () => ({ data: null, error: null }),
      }),
    },
    removeChannel: () => {},
    channel: () => ({
      on: () => ({ subscribe: async () => ({}) }),
      subscribe: async () => ({}),
      unsubscribe: () => {},
    }),
  } as any;
}

if (!isSupabaseConfigured && typeof window !== "undefined") {
  console.warn(
    "[supabase] NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY is missing. Supabase features will be disabled.",
  );
}

export const supabase = isSupabaseConfigured
  ? createBrowserClient(supabaseUrl!, supabaseAnonKey!)
  : createFallbackSupabaseClient();