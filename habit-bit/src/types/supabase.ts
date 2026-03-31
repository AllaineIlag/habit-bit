export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      habit_logs: {
        Row: {
          completed_at: string
          created_at: string
          habit_id: string
          id: string
          status: string
          user_id: string
        }
        Insert: {
          completed_at?: string
          created_at?: string
          habit_id: string
          id?: string
          status?: string
          user_id?: string
        }
        Update: {
          completed_at?: string
          created_at?: string
          habit_id?: string
          id?: string
          status?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "habit_logs_habit_id_fkey"
            columns: ["habit_id"]
            isOneToOne: false
            referencedRelation: "habits"
            referencedColumns: ["id"]
          },
        ]
      }
      habits: {
        Row: {
          category: string | null
          created_at: string
          frequency: Json | null
          id: string
          is_archived: boolean
          name: string
          order_index: number | null
          routine_id: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          category?: string | null
          created_at?: string
          frequency?: Json | null
          id?: string
          is_archived?: boolean
          name: string
          order_index?: number | null
          routine_id?: string | null
          updated_at?: string
          user_id?: string
        }
        Update: {
          category?: string | null
          created_at?: string
          frequency?: Json | null
          id?: string
          is_archived?: boolean
          name?: string
          order_index?: number | null
          routine_id?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "habits_routine_id_fkey"
            columns: ["routine_id"]
            isOneToOne: false
            referencedRelation: "routines"
            referencedColumns: ["id"]
          },
        ]
      }
      health_logs: {
        Row: {
          created_at: string
          id: string
          logged_at: string
          user_id: string
          weight: number
        }
        Insert: {
          created_at?: string
          id?: string
          logged_at?: string
          user_id: string
          weight: number
        }
        Update: {
          created_at?: string
          id?: string
          logged_at?: string
          user_id?: string
          weight?: number
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          full_name: string | null
          id: string
          is_authorized: boolean | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          avatar_url?: string | null
          full_name?: string | null
          id?: string
          is_authorized?: boolean | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          avatar_url?: string | null
          full_name?: string | null
          id?: string
          is_authorized?: boolean | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      quotes: {
        Row: {
          author: string | null
          created_at: string | null
          id: string
          text: string
        }
        Insert: {
          author?: string | null
          created_at?: string | null
          id?: string
          text: string
        }
        Update: {
          author?: string | null
          created_at?: string | null
          id?: string
          text?: string
        }
        Relationships: []
      }
      routines: {
        Row: {
          created_at: string | null
          id: string
          name: string
          order_index: number | null
          slug: string
          type: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          name: string
          order_index?: number | null
          slug: string
          type?: string
        }
        Update: {
          created_at?: string | null
          id?: string
          name?: string
          order_index?: number | null
          slug?: string
          type?: string
        }
        Relationships: []
      }
      rule_logs: {
        Row: {
          completed_at: string
          created_at: string | null
          id: string
          rule_id: string
          user_id: string
        }
        Insert: {
          completed_at?: string
          created_at?: string | null
          id?: string
          rule_id: string
          user_id: string
        }
        Update: {
          completed_at?: string
          created_at?: string | null
          id?: string
          rule_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "rule_logs_rule_id_fkey"
            columns: ["rule_id"]
            isOneToOne: false
            referencedRelation: "rules"
            referencedColumns: ["id"]
          },
        ]
      }
      rules: {
        Row: {
          created_at: string | null
          id: string
          order_index: number | null
          title: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          order_index?: number | null
          title: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          order_index?: number | null
          title?: string
          user_id?: string
        }
        Relationships: []
      }
    }
  }
}
