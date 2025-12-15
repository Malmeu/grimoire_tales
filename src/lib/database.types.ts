export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          username: string
          avatar_url: string | null
          bio_geek: string | null
          badges: string[]
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          username: string
          avatar_url?: string | null
          bio_geek?: string | null
          badges?: string[]
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          username?: string
          avatar_url?: string | null
          bio_geek?: string | null
          badges?: string[]
          created_at?: string
          updated_at?: string
        }
      }
      stories: {
        Row: {
          id: string
          title: string
          slug: string
          author_id: string
          description: string | null
          cover_url: string | null
          genre: string
          tags: string[]
          status: 'draft' | 'published' | 'archived'
          type: 'novel' | 'book' | 'comic'
          views: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          slug: string
          author_id: string
          description?: string | null
          cover_url?: string | null
          genre: string
          tags?: string[]
          status?: 'draft' | 'published' | 'archived'
          type: 'novel' | 'book' | 'comic'
          views?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          slug?: string
          author_id?: string
          description?: string | null
          cover_url?: string | null
          genre?: string
          tags?: string[]
          status?: 'draft' | 'published' | 'archived'
          type?: 'novel' | 'book' | 'comic'
          views?: number
          created_at?: string
          updated_at?: string
        }
      }
      chapters: {
        Row: {
          id: string
          story_id: string
          title: string
          content: string
          chapter_number: number
          images: string[]
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          story_id: string
          title: string
          content: string
          chapter_number: number
          images?: string[]
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          story_id?: string
          title?: string
          content?: string
          chapter_number?: number
          images?: string[]
          created_at?: string
          updated_at?: string
        }
      }
      comments: {
        Row: {
          id: string
          story_id: string
          chapter_id: string | null
          user_id: string
          content: string
          likes_count: number
          created_at: string
        }
        Insert: {
          id?: string
          story_id: string
          chapter_id?: string | null
          user_id: string
          content: string
          likes_count?: number
          created_at?: string
        }
        Update: {
          id?: string
          story_id?: string
          chapter_id?: string | null
          user_id?: string
          content?: string
          likes_count?: number
          created_at?: string
        }
      }
      likes: {
        Row: {
          id: string
          user_id: string
          story_id: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          story_id: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          story_id?: string
          created_at?: string
        }
      }
      follows: {
        Row: {
          id: string
          follower_id: string
          following_id: string
          created_at: string
        }
        Insert: {
          id?: string
          follower_id: string
          following_id: string
          created_at?: string
        }
        Update: {
          id?: string
          follower_id?: string
          following_id?: string
          created_at?: string
        }
      }
      ratings: {
        Row: {
          id: string
          user_id: string
          story_id: string
          rating: number
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          story_id: string
          rating: number
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          story_id?: string
          rating?: number
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}

export type User = Database['public']['Tables']['users']['Row']
export type Story = Database['public']['Tables']['stories']['Row']
export type Chapter = Database['public']['Tables']['chapters']['Row']
export type Comment = Database['public']['Tables']['comments']['Row']
export type Like = Database['public']['Tables']['likes']['Row']
export type Follow = Database['public']['Tables']['follows']['Row']
export type Rating = Database['public']['Tables']['ratings']['Row']
