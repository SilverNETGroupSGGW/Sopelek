<script setup lang="ts">
interface Endpoint {
  controller: string
  endpoint: string
}

const endpointsData: Endpoint[] = [
  // Groups
  { controller: 'GroupController', endpoint: '[GET] api/Groups/:groupId' },
  { controller: 'GroupController', endpoint: '[GET] api/Groups' },
  { controller: 'GroupController', endpoint: '[GET] api/Groups/:groupId/dependencies' },
  { controller: 'GroupController', endpoint: '[GET] api/Groups/schedule/:scheduleId' },
  { controller: 'GroupController', endpoint: '[POST] api/Groups' },
  { controller: 'GroupController', endpoint: '[PUT] api/Groups' },
  { controller: 'GroupController', endpoint: '[DELETE] api/Groups/:groupId' },

  // Lecturers
  { controller: 'LecturerController', endpoint: '[GET] api/Lecturers/:lecturerId' },
  { controller: 'LecturerController', endpoint: '[GET] api/Lecturers' },
  { controller: 'LecturerController', endpoint: '[GET] api/Lecturers/academic-degrees' },
  { controller: 'LecturerController', endpoint: '[GET] api/Lecturers/:lecturerId/schedule/full' },
  { controller: 'LecturerController', endpoint: '[GET] api/Lecturers/:lecturerId/dependencies' },
  { controller: 'LecturerController', endpoint: '[POST] api/Lecturers' },
  { controller: 'LecturerController', endpoint: '[PUT] api/Lecturers' },
  { controller: 'LecturerController', endpoint: '[DELETE] api/Lecturers/:lecturerId' },

  // Lessons
  { controller: 'LessonController', endpoint: '[GET] api/Lessons/:lessonId' },
  { controller: 'LessonController', endpoint: '[GET] api/Lessons/subject/:subjectId' },
  { controller: 'LessonController', endpoint: '[GET] api/Lessons/schedule/:scheduleId' },
  { controller: 'LessonController', endpoint: '[GET] api/Lessons/:lessonId/Occurrences' },
  { controller: 'LessonController', endpoint: '[POST] api/Lessons' },
  { controller: 'LessonController', endpoint: '[PUT] api/Lessons' },
  { controller: 'LessonController', endpoint: '[DELETE] api/Lessons/:lessonId' },
  { controller: 'LessonController', endpoint: '[POST] api/Lessons/iCalendar' },
  { controller: 'LessonController', endpoint: '[PUT] api/Lessons/iCalendar' },

  // LessonSequence
  { controller: 'LessonDateTimeSequenceGenerationController', endpoint: '[GET] api/LessonsDateTimeSequenceGeneration/:startDateTime/:numberOfDates' },

  // OffDays
  { controller: 'OffDaysController', endpoint: '[GET] api/OffDay' },
  { controller: 'OffDaysController', endpoint: '[GET] api/OffDay/:offDayId' },
  { controller: 'OffDaysController', endpoint: '[POST] api/OffDay' },
  { controller: 'OffDaysController', endpoint: '[PUT] api/OffDay' },
  { controller: 'OffDaysController', endpoint: '[DELETE] api/OffDay/:offDayId' },

  // Organizations
  { controller: 'OrganizationsController', endpoint: '[GET] api/Organizations' },
  { controller: 'OrganizationsController', endpoint: '[GET] api/Organizations/:organizationId' },
  { controller: 'OrganizationsController', endpoint: '[POST] api/Organizations' },
  { controller: 'OrganizationsController', endpoint: '[PUT] api/Organizations' },
  { controller: 'OrganizationsController', endpoint: '[DELETE] api/Organizations/:organizationId' },

  // Roles
  { controller: 'RolesController', endpoint: '[GET] api/Roles/:userId' },

  // ScheduleGenerator
  { controller: 'ScheduleGeneratorController', endpoint: '[POST] api/ScheduleGenerator/generate/:scheduleId' },

  // StudyPrograms
  { controller: 'StudyProgramController', endpoint: '[GET] api/StudyProgram/all' },
  { controller: 'StudyProgramController', endpoint: '[GET] api/StudyProgram/:studyProramId' },
  { controller: 'StudyProgramController', endpoint: '[GET] api/StudyProgram/:tenantId/all' },
  { controller: 'StudyProgramController', endpoint: '[POST] api/StudyProgram' },
  { controller: 'StudyProgramController', endpoint: '[PUT] api/StudyProgram' },
  { controller: 'StudyProgramController', endpoint: '[DELETE] /api/StudyProgram/:studyProramId' },

  // StudySemesters
  { controller: 'StudySemesterController', endpoint: '[GET] api/StudySemesters/:studyProramId/all' },
  { controller: 'StudySemesterController', endpoint: '[GET] api/studySemesters/:id' },
  { controller: 'StudySemesterController', endpoint: '[POST] api/studySemesters' },
  { controller: 'StudySemesterController', endpoint: '[PUT] api/studySemesters' },
  { controller: 'StudySemesterController', endpoint: '[DELETE] api/studySemesters/:id' },

  // Subjects
  { controller: 'SubjectController', endpoint: '[GET] api/subjects' },
  { controller: 'SubjectController', endpoint: '[GET] api/subjects/:subjectId' },
  { controller: 'SubjectController', endpoint: '[GET] api/subjects/schedule/:scheduleId' },
  { controller: 'SubjectController', endpoint: '[GET] api/subjects/:subjectId/extended' },
  { controller: 'SubjectController', endpoint: '[GET] api/subjects/schedule/:scheduleId/extended' },
  { controller: 'SubjectController', endpoint: '[POST] api/subjects' },
  { controller: 'SubjectController', endpoint: '[PUT] api/subjects' },
  { controller: 'SubjectController', endpoint: '[DELETE] api/subjects/:subjectId' },
  { controller: 'SubjectController', endpoint: '[POST] api/subjects/check-conflict' },

  // SubjectTypes
  { controller: 'SubjectTypeController', endpoint: '[GET] api/subjectTypes' },
  { controller: 'SubjectTypeController', endpoint: '[GET] api/subjectTypes/:subjectTypeId' },
  { controller: 'SubjectTypeController', endpoint: '[GET] api/subjectTypes/byTenantId/:tenantId' },
  { controller: 'SubjectTypeController', endpoint: '[POST] api/subjectTypes' },
  { controller: 'SubjectTypeController', endpoint: '[PUT] api/subjectTypes' },
  { controller: 'SubjectTypeController', endpoint: '[DELETE] api/subjectTypes/:subjectTypeId' },

  // Tenants
  { controller: 'TenantController', endpoint: '[GET] api/tenants' },
  { controller: 'TenantController', endpoint: '[GET] api/tenants/:tenantId' },
  { controller: 'TenantController', endpoint: '[POST] api/tenants' },
  { controller: 'TenantController', endpoint: '[PUT] api/tenants' },
  { controller: 'TenantController', endpoint: '[DELETE] api/tenants/:tenantId' },

  // Tokens
  { controller: 'TokenController', endpoint: '[POST] api/login' },
  { controller: 'TokenController', endpoint: '[POST] api/tokens/refresh' },
  { controller: 'TokenController', endpoint: '[POST] api/tokens/revoke' },

  // Schedules
  { controller: 'ScheduleController', endpoint: '[GET] api/schedules' },
  { controller: 'ScheduleController', endpoint: '[GET] api/schedules/:id' },
  { controller: 'ScheduleController', endpoint: '[POST] api/schedules' },
  { controller: 'ScheduleController', endpoint: '[PUT] api/schedules/:id' },
  { controller: 'ScheduleController', endpoint: '[DELETE] api/schedules/:id' },
  { controller: 'ScheduleController', endpoint: '[GET] api/schedules/:id/extended' },
  { controller: 'ScheduleController', endpoint: '[GET] api/schedules/study-modes' },
  { controller: 'ScheduleController', endpoint: '[GET] api/schedules/degrees-of-studies' },

  // Users
  { controller: 'UserController', endpoint: '[GET] api/users' },
  { controller: 'UserController', endpoint: '[GET] api/users/:userId' },
  { controller: 'UserController', endpoint: '[POST] api/users' },
  { controller: 'UserController', endpoint: '[PUT] api/users' },
  { controller: 'UserController', endpoint: '[DELETE] api/users/:userId' },
  { controller: 'UserController', endpoint: '[POST] api/users/:userId/change-tenant/:tenantId' },

  // UserRoles
  { controller: 'UserRolesController', endpoint: '[GET] api/UsersRoles/:userId' },
  { controller: 'UserRolesController', endpoint: '[POST] api/UsersRoles/assign' },
  { controller: 'UserRolesController', endpoint: '[POST] api/UsersRoles/assign-multiple' },
  { controller: 'UserRolesController', endpoint: '[DELETE] api/UsersRoles/remove' },
  { controller: 'UserRolesController', endpoint: '[DELETE] api/UsersRoles/remove-multiple' },
]

const selectedController = ref<string | null>('')
const selectedEndpoint = ref<string | null>('')

const controllers = computed(() => {
  return endpointsData.map(endpoint => endpoint.controller).reduce((array, controller) => {
    if (!array.includes(controller)) {
      array.push(controller)
    }
    return array
  }, [] as string[])
})

const endpoints = computed(() => {
  return endpointsData.filter(e => e.controller === selectedController.value).map(e => e.endpoint)
})

function handleEndpointComboboxChange(value: string) {
  selectedEndpoint.value = value
}

function handleControllerComboboxChange(value: string) {
  selectedController.value = value
  selectedEndpoint.value = null
}
</script>

<template>
  <div class="flex w-full flex-wrap items-start justify-between gap-6 border-b border-b-gray-200 px-12 py-9">
    <utils-header text="API Management " />
  </div>

  <div class="my-9 h-screen px-12">
    <div class="inline-flex columns-2 gap-10">
      <div>
        <h1 class="mb-4 text-xl font-bold text-gray-900">
          Controller:
        </h1>

        <div class="my-1 w-96">
          <base-combobox
            :options="controllers"
            :value="selectedController"
            @change="handleControllerComboboxChange"
          />
        </div>
      </div>

      <div>
        <h1 class="mb-4 text-xl font-bold text-gray-900">
          Endpoint:
        </h1>

        <div class="my-1 w-96">
          <base-combobox
            :options="endpoints"
            :value="selectedEndpoint"
            @change="handleEndpointComboboxChange"
          />
        </div>
      </div>
    </div>

    <!-- Groups -->
    <api-view-groups-get v-if="selectedEndpoint === '[GET] api/Groups/:groupId'" class="my-9" />
    <api-view-groups-get-all v-if="selectedEndpoint === '[GET] api/Groups'" class="my-9" />
    <api-view-groups-get-dependencies v-if="selectedEndpoint === '[GET] api/Groups/:groupId/dependencies'" class="my-9" />
    <api-view-groups-get-schedule v-if="selectedEndpoint === '[GET] api/Groups/schedule/:scheduleId'" class="my-9" />
    <api-view-groups-post v-if="selectedEndpoint === '[POST] api/Groups'" class="my-9" />
    <api-view-groups-put v-if="selectedEndpoint === '[PUT] api/Groups'" class="my-9" />
    <api-view-groups-delete v-if="selectedEndpoint === '[DELETE] api/Groups/:groupId'" class="my-9" />

    <!-- Lecturers -->
    <api-view-lecturers-get v-if="selectedEndpoint === '[GET] api/Lecturers/:lecturerId'" class="my-9" />
    <api-view-lecturers-get-all v-if="selectedEndpoint === '[GET] api/Lecturers'" class="my-9" />
    <api-view-lecturers-get-academic-degrees v-if="selectedEndpoint === '[GET] api/Lecturers/academic-degrees'" class="my-9" />
    <api-view-lecturers-get-schedule-full v-if="selectedEndpoint === '[GET] api/Lecturers/:lecturerId/schedule/full'" class="my-9" />
    <api-view-lecturers-get-dependencies v-if="selectedEndpoint === '[GET] api/Lecturers/:lecturerId/dependencies'" class="my-9" />
    <api-view-lecturers-post v-if="selectedEndpoint === '[POST] api/Lecturers'" class="my-9" />
    <api-view-lecturers-put v-if="selectedEndpoint === '[PUT] api/Lecturers'" class="my-9" />
    <api-view-lecturers-delete v-if="selectedEndpoint === '[DELETE] api/Lecturers/:lecturerId'" class="my-9" />

    <!-- Lessons -->
    <api-view-lessons-get v-if="selectedEndpoint === '[GET] api/Lessons/:lessonId'" class="my-9" />
    <api-view-lessons-get-all-by-subject v-if="selectedEndpoint === '[GET] api/Lessons/subject/:subjectId'" class="my-9" />
    <api-view-lessons-get-all-by-schedule v-if="selectedEndpoint === '[GET] api/Lessons/schedule/:scheduleId'" class="my-9" />
    <api-view-lessons-get-occurences v-if="selectedEndpoint === '[GET] api/Lessons/:lessonId/Occurrences'" class="my-9" />
    <api-view-lessons-post v-if="selectedEndpoint === '[POST] api/Lessons'" class="my-9" />
    <api-view-lessons-put v-if="selectedEndpoint === '[PUT] api/Lessons'" class="my-9" />
    <api-view-lessons-delete v-if="selectedEndpoint === '[DELETE] api/Lessons/:lessonId'" class="my-9" />
    <api-view-lessons-post-icalendar v-if="selectedEndpoint === '[POST] api/Lessons/iCalendar'" class="my-9" />
    <api-view-lessons-put-icalendar v-if="selectedEndpoint === '[PUT] api/Lessons/iCalendar'" class="my-9" />

    <!-- LessonSequence -->
    <api-view-lesson-sequence-get v-if="selectedEndpoint === '[GET] api/LessonsDateTimeSequenceGeneration/:startDateTime/:numberOfDates'" class="my-9" />

    <!-- OffDays -->
    <api-view-off-days-get-all v-if="selectedEndpoint === '[GET] api/OffDay'" class="my-9" />
    <api-view-off-days-get v-if="selectedEndpoint === '[GET] api/OffDay/:offDayId'" class="my-9" />
    <api-view-off-days-post v-if="selectedEndpoint === '[POST] api/OffDay'" class="my-9" />
    <api-view-off-days-put v-if="selectedEndpoint === '[PUT] api/OffDay'" class="my-9" />
    <api-view-off-days-delete v-if="selectedEndpoint === '[DELETE] api/OffDay/:offDayId'" class="my-9" />

    <!-- Organizations -->
    <api-view-organizations-get-all v-if="selectedEndpoint === '[GET] api/Organizations'" class="my-9" />
    <api-view-organizations-get v-if="selectedEndpoint === '[GET] api/Organizations/:organizationId'" class="my-9" />
    <api-view-organizations-post v-if="selectedEndpoint === '[POST] api/Organizations'" class="my-9" />
    <api-view-organizations-put v-if="selectedEndpoint === '[PUT] api/Organizations'" class="my-9" />
    <api-view-organizations-delete v-if="selectedEndpoint === '[DELETE] api/Organizations/:organizationId'" class="my-9" />

    <!-- Roles -->
    <api-view-roles-get v-if="selectedEndpoint === '[GET] api/Roles/:userId'" class="my-9" />

    <!-- ScheduleGenerator -->
    <api-view-schedule-generator-post v-if="selectedEndpoint === '[POST] api/ScheduleGenerator/generate/:scheduleId'" class="my-9" />

    <!-- StudyPrograms -->
    <api-view-study-programs-get-all v-if="selectedEndpoint === '[GET] api/StudyProgram/all'" class="my-9" />
    <api-view-study-programs-get v-if="selectedEndpoint === '[GET] api/StudyProgram/:studyProramId'" class="my-9" />
    <api-view-study-programs-get-all-by-tenant v-if="selectedEndpoint === '[GET] api/StudyProgram/:tenantId/all'" class="my-9" />
    <api-view-study-programs-post v-if="selectedEndpoint === '[POST] api/StudyProgram'" class="my-9" />
    <api-view-study-programs-put v-if="selectedEndpoint === '[PUT] api/StudyProgram'" class="my-9" />
    <api-view-study-programs-delete v-if="selectedEndpoint === '[DELETE] /api/StudyProgram/:studyProramId'" class="my-9" />

    <!-- StudySemester -->
    <api-view-study-semesters-get-all v-if="selectedEndpoint === '[GET] api/StudySemesters/:studyProramId/all'" class="my-9" />
    <api-view-study-semesters-get v-if="selectedEndpoint === '[GET] api/studySemesters/:id'" class="my-9" />
    <api-view-study-semesters-post v-if="selectedEndpoint === '[POST] api/studySemesters'" class="my-9" />
    <api-view-study-semesters-put v-if="selectedEndpoint === '[PUT] api/studySemesters'" class="my-9" />
    <api-view-study-semesters-delete v-if="selectedEndpoint === '[DELETE] api/studySemesters/:id'" class="my-9" />

    <!-- Subjects -->
    <api-view-subjects-get-all v-if="selectedEndpoint === '[GET] api/subjects'" class="my-9" />
    <api-view-subjects-get v-if="selectedEndpoint === '[GET] api/subjects/:subjectId'" class="my-9" />
    <api-view-subjects-get-by-schedule v-if="selectedEndpoint === '[GET] api/subjects/schedule/:scheduleId'" class="my-9" />
    <api-view-subjects-get-extended v-if="selectedEndpoint === '[GET] api/subjects/:subjectId/extended'" class="my-9" />
    <api-view-subjects-get-extended-by-schedule v-if="selectedEndpoint === '[GET] api/subjects/schedule/:scheduleId/extended'" class="my-9" />
    <api-view-subjects-post v-if="selectedEndpoint === '[POST] api/subjects'" class="my-9" />
    <api-view-subjects-put v-if="selectedEndpoint === '[PUT] api/subjects'" class="my-9" />
    <api-view-subjects-delete v-if="selectedEndpoint === '[DELETE] api/subjects/:subjectId'" class="my-9" />
    <api-view-subjects-post-check-conflict v-if="selectedEndpoint === '[POST] api/subjects/check-conflict'" class="my-9" />

    <!-- SubjectTypes -->
    <api-view-subject-types-get-all v-if="selectedEndpoint === '[GET] api/subjectTypes'" class="my-9" />
    <api-view-subject-types-get v-if="selectedEndpoint === '[GET] api/subjectTypes/:subjectTypeId'" class="my-9" />
    <api-view-subject-types-get-all-by-tenant-id v-if="selectedEndpoint === '[GET] api/subjectTypes/byTenantId/:tenantId'" class="my-9" />
    <api-view-subject-types-post v-if="selectedEndpoint === '[POST] api/subjectTypes'" class="my-9" />
    <api-view-subject-types-put v-if="selectedEndpoint === '[PUT] api/subjectTypes'" class="my-9" />
    <api-view-subject-types-delete v-if="selectedEndpoint === '[DELETE] api/subjectTypes/:subjectTypeId'" class="my-9" />

    <!-- Tenants -->
    <api-view-tenants-get-all v-if="selectedEndpoint === '[GET] api/tenants'" class="my-9" />
    <api-view-tenants-get v-if="selectedEndpoint === '[GET] api/tenants/:tenantId'" class="my-9" />
    <api-view-tenants-post v-if="selectedEndpoint === '[POST] api/tenants'" class="my-9" />
    <api-view-tenants-put v-if="selectedEndpoint === '[PUT] api/tenants'" class="my-9" />
    <api-view-tenants-delete v-if="selectedEndpoint === '[DELETE] api/tenants/:tenantId'" class="my-9" />

    <!-- Tokens -->
    <api-view-tokens-login v-if="selectedEndpoint === '[POST] api/login'" class="my-9" />
    <api-view-tokens-refresh v-if="selectedEndpoint === '[POST] api/tokens/refresh'" class="my-9" />
    <api-view-tokens-revoke v-if="selectedEndpoint === '[POST] api/tokens/revoke'" class="my-9" />

    <!-- Schedules -->
    <api-view-schedules-get-all v-if="selectedEndpoint === '[GET] api/schedules'" class="my-9" />
    <api-view-schedules-get v-if="selectedEndpoint === '[GET] api/schedules/:id'" class="my-9" />
    <api-view-schedules-get-extended v-if="selectedEndpoint === '[GET] api/schedules/:id/extended'" class="my-9" />
    <api-view-schedules-post v-if="selectedEndpoint === '[POST] api/schedules'" class="my-9" />
    <api-view-schedules-put v-if="selectedEndpoint === '[PUT] api/schedules/:id'" class="my-9" />
    <api-view-schedules-delete v-if="selectedEndpoint === '[DELETE] api/schedules/:id'" class="my-9" />
    <api-view-schedules-get-study-modes v-if="selectedEndpoint === '[GET] api/schedules/study-modes'" class="my-9" />
    <api-view-schedules-get-degrees-of-studies v-if="selectedEndpoint === '[GET] api/schedules/degrees-of-studies'" class="my-9" />

    <!-- Users -->
    <api-view-users-get-all v-if="selectedEndpoint === '[GET] api/users'" class="my-9" />
    <api-view-users-get v-if="selectedEndpoint === '[GET] api/users/:userId'" class="my-9" />
    <api-view-users-post v-if="selectedEndpoint === '[POST] api/users'" class="my-9" />
    <api-view-users-put v-if="selectedEndpoint === '[PUT] api/users'" class="my-9" />
    <api-view-users-delete v-if="selectedEndpoint === '[DELETE] api/users/:userId'" class="my-9" />
    <api-view-users-post-change-tenant v-if="selectedEndpoint === '[POST] api/users/:userId/change-tenant/:tenantId'" class="my-9" />

    <!-- UserRoles -->
    <api-view-user-roles-get-user-roles v-if="selectedEndpoint === '[GET] api/UsersRoles/:userId'" class="my-9" />
    <api-view-user-roles-post-assign v-if="selectedEndpoint === '[POST] api/UsersRoles/assign'" class="my-9" />
    <api-view-user-roles-post-assign-multiple v-if="selectedEndpoint === '[POST] api/UsersRoles/assign-multiple'" class="my-9" />
    <api-view-user-roles-delete-remove v-if="selectedEndpoint === '[DELETE] api/UsersRoles/remove'" class="my-9" />
    <api-view-user-roles-delete-remove-multiple v-if="selectedEndpoint === '[DELETE] api/UsersRoles/remove-multiple'" class="my-9" />
  </div>
</template>
