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
      __EFMigrationsHistory: {
        Row: {
          migration_id: string
          product_version: string
        }
        Insert: {
          migration_id: string
          product_version: string
        }
        Update: {
          migration_id?: string
          product_version?: string
        }
        Relationships: []
      }
      classrooms: {
        Row: {
          building: number
          capacity: number
          floor: number
          id: number
          name: string | null
          type: string | null
        }
        Insert: {
          building: number
          capacity: number
          floor: number
          id?: number
          name?: string | null
          type?: string | null
        }
        Update: {
          building?: number
          capacity?: number
          floor?: number
          id?: number
          name?: string | null
          type?: string | null
        }
        Relationships: []
      }
      faculties: {
        Row: {
          id: number
          institute_id: number | null
          name: string
        }
        Insert: {
          id?: number
          institute_id?: number | null
          name: string
        }
        Update: {
          id?: number
          institute_id?: number | null
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: 'fk_faculties_institutes_institute_id'
            columns: ['institute_id']
            isOneToOne: false
            referencedRelation: 'institutes'
            referencedColumns: ['id']
          },
        ]
      }
      group_lesson: {
        Row: {
          groups_id: number
          lessons_id: number
        }
        Insert: {
          groups_id: number
          lessons_id: number
        }
        Update: {
          groups_id?: number
          lessons_id?: number
        }
        Relationships: [
          {
            foreignKeyName: 'fk_group_lesson_groups_groups_id'
            columns: ['groups_id']
            isOneToOne: false
            referencedRelation: 'groups'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'fk_group_lesson_lessons_lessons_id'
            columns: ['lessons_id']
            isOneToOne: false
            referencedRelation: 'lessons'
            referencedColumns: ['id']
          },
        ]
      }
      group_schedule: {
        Row: {
          groups_id: number
          schedules_id: number
        }
        Insert: {
          groups_id: number
          schedules_id: number
        }
        Update: {
          groups_id?: number
          schedules_id?: number
        }
        Relationships: [
          {
            foreignKeyName: 'fk_group_schedule_groups_groups_id'
            columns: ['groups_id']
            isOneToOne: false
            referencedRelation: 'groups'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'fk_group_schedule_schedules_schedules_id'
            columns: ['schedules_id']
            isOneToOne: false
            referencedRelation: 'schedules'
            referencedColumns: ['id']
          },
        ]
      }
      groups: {
        Row: {
          capacity: number
          id: number
          name: string | null
        }
        Insert: {
          capacity: number
          id?: number
          name?: string | null
        }
        Update: {
          capacity?: number
          id?: number
          name?: string | null
        }
        Relationships: []
      }
      institutes: {
        Row: {
          id: number
          name: string
          university_id: number | null
        }
        Insert: {
          id?: number
          name: string
          university_id?: number | null
        }
        Update: {
          id?: number
          name?: string
          university_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: 'fk_institutes_universities_university_id'
            columns: ['university_id']
            isOneToOne: false
            referencedRelation: 'universities'
            referencedColumns: ['id']
          },
        ]
      }
      lecturers: {
        Row: {
          degree: number
          email: string | null
          id: number
          institute_id: number | null
          name: string
        }
        Insert: {
          degree: number
          email?: string | null
          id?: number
          institute_id?: number | null
          name: string
        }
        Update: {
          degree?: number
          email?: string | null
          id?: number
          institute_id?: number | null
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: 'fk_lecturers_institutes_institute_id'
            columns: ['institute_id']
            isOneToOne: false
            referencedRelation: 'institutes'
            referencedColumns: ['id']
          },
        ]
      }
      lessons: {
        Row: {
          amount: number
          classroom_id: number | null
          day_of_week: number
          end_time: string
          id: number
          lecturer_id: number | null
          start_time: string
          subject_id: number | null
        }
        Insert: {
          amount: number
          classroom_id?: number | null
          day_of_week: number
          end_time: string
          id?: number
          lecturer_id?: number | null
          start_time: string
          subject_id?: number | null
        }
        Update: {
          amount?: number
          classroom_id?: number | null
          day_of_week?: number
          end_time?: string
          id?: number
          lecturer_id?: number | null
          start_time?: string
          subject_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: 'fk_lessons_classrooms_classroom_id'
            columns: ['classroom_id']
            isOneToOne: false
            referencedRelation: 'classrooms'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'fk_lessons_lecturers_lecturer_id'
            columns: ['lecturer_id']
            isOneToOne: false
            referencedRelation: 'lecturers'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'fk_lessons_subjects_subject_id'
            columns: ['subject_id']
            isOneToOne: false
            referencedRelation: 'subjects'
            referencedColumns: ['id']
          },
        ]
      }
      schedules: {
        Row: {
          id: number
          is_published: boolean
          name: string
          start: string
          study_plan_id: number | null
          term: number
        }
        Insert: {
          id?: number
          is_published: boolean
          name: string
          start: string
          study_plan_id?: number | null
          term: number
        }
        Update: {
          id?: number
          is_published?: boolean
          name?: string
          start?: string
          study_plan_id?: number | null
          term?: number
        }
        Relationships: [
          {
            foreignKeyName: 'fk_schedules_study_plans_study_plan_id'
            columns: ['study_plan_id']
            isOneToOne: false
            referencedRelation: 'study_plans'
            referencedColumns: ['id']
          },
        ]
      }
      study_plans: {
        Row: {
          faculty_id: number | null
          field: string | null
          id: number
          mode: number
          start: string
          type: number
        }
        Insert: {
          faculty_id?: number | null
          field?: string | null
          id?: number
          mode?: number
          start: string
          type?: number
        }
        Update: {
          faculty_id?: number | null
          field?: string | null
          id?: number
          mode?: number
          start?: string
          type?: number
        }
        Relationships: [
          {
            foreignKeyName: 'fk_study_plans_faculties_faculty_id'
            columns: ['faculty_id']
            isOneToOne: false
            referencedRelation: 'faculties'
            referencedColumns: ['id']
          },
        ]
      }
      subjects: {
        Row: {
          id: number
          name: string
          schedule_id: number | null
        }
        Insert: {
          id?: number
          name: string
          schedule_id?: number | null
        }
        Update: {
          id?: number
          name?: string
          schedule_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: 'fk_subjects_schedules_schedule_id'
            columns: ['schedule_id']
            isOneToOne: false
            referencedRelation: 'schedules'
            referencedColumns: ['id']
          },
        ]
      }
      universities: {
        Row: {
          id: number
          name: string
        }
        Insert: {
          id?: number
          name: string
        }
        Update: {
          id?: number
          name?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      continents:
        | 'Africa'
        | 'Antarctica'
        | 'Asia'
        | 'Europe'
        | 'Oceania'
        | 'North America'
        | 'South America'
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, 'public'>]

export type Tables<
  PublicTableNameOrOptions extends
  | keyof (PublicSchema['Tables'] & PublicSchema['Views'])
  | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions['schema']]['Tables'] &
    Database[PublicTableNameOrOptions['schema']]['Views'])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions['schema']]['Tables'] &
  Database[PublicTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R
    }
      ? R
      : never
  : PublicTableNameOrOptions extends keyof (PublicSchema['Tables'] &
  PublicSchema['Views'])
    ? (PublicSchema['Tables'] &
    PublicSchema['Views'])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
        ? R
        : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
  | keyof PublicSchema['Tables']
  | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
    Insert: infer I
  }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
    ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
  | keyof PublicSchema['Tables']
  | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
    Update: infer U
  }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
    ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
      Update: infer U
    }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
  | keyof PublicSchema['Enums']
  | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions['schema']]['Enums']
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions['schema']]['Enums'][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema['Enums']
    ? PublicSchema['Enums'][PublicEnumNameOrOptions]
    : never
