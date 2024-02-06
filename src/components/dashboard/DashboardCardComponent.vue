<template>
  <v-card class="my-2" elevation="2">
    <v-card>
      <v-card
        class="rounded-0 rounded-t"
        color="purple-darken-3"
        variant="flat"
      >
        <v-card-actions class="mx-4">
          <span class="`text-h6 font-weight-bold"> {{ props.card.title }}</span>
        </v-card-actions>
      </v-card>
    </v-card>
    <div
      class="d-flex align-center justify-center"
      v-if="useDashboardModule().isLoading"
    >
      <v-progress-circular
        class="ma-4"
        :color="props.card.color"
        width="10"
        size="80"
        indeterminate
      />
    </div>
    <div v-else>
      <v-list lines="two">
        <v-list-item>
          <template v-slot:prepend>
            <v-avatar size="75">
              <v-icon class="larger-icons" :color="props.card.color">{{
                props.card.icon
              }}</v-icon>
            </v-avatar>
          </template>
          <template v-slot:append>
            <div>
              <span
                :class="`text-h4 font-weight-bold text-${props.card.color}`"
                >{{ props.card.count }}</span
              >
            </div>
          </template>
        </v-list-item>
      </v-list>
    </div>
    <v-divider />
    <v-card-actions>
      <v-spacer />
      <v-btn
        variant="outlined"
        block
        :color="props.card.color"
        :to="props.card.link"
      >
        <v-icon>mdi-magnify</v-icon> See More
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
import { useDashboardModule } from "../../store/index";
import DashboardCard from "../../interfaces/DashboardCard";

const props = defineProps<{
  card: DashboardCard;
}>();
</script>

<style scoped>
.larger-icons {
  font-size: 4em;
}
</style>
