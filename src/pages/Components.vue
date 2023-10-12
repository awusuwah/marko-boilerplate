<template>
  <div class="container mx-auto py-10 flex flex-col gap-y-6">
    <section class="bg-slate-800 rounded-lg py-4 px-12 flex flex-col gap-4">
      <h2 class="text-xl font-semibold text-white">Text Input</h2>

      <Text v-model="text" id="text1" type="text" label="Username" placeholder="awusuwah" />
      <Text v-model="text" id="text2" type="text" label="Username" placeholder="awusuwah" ping />
      <Text v-model="text" id="text3" type="text" label="Username" placeholder="awusuwah" valid />
      <Text
        v-model="text"
        id="text4"
        type="text"
        label="Username"
        placeholder="awusuwah"
        :error-message="`@${text} is already taken`"
        invalid
      >
        <template #start>
          <UserIcon class="pl-3 w-8 h-8 text-gray-500" />
        </template>
      </Text>
      <Text
        v-model="text"
        id="text5"
        type="text"
        label="Username"
        placeholder="awusuwah"
        :help-text="`You will be represented as @${text}`"
      >
        <template #start>
          <UserIcon class="pl-3 w-8 h-8 text-gray-500" />
        </template>
      </Text>
    </section>

    <section class="bg-slate-800 rounded-lg py-4 px-12 flex flex-col gap-4">
      <h2 class="text-xl font-semibold text-white">Number</h2>

      <Number v-model="number" id="number1" label="Favorite Number" placeholder="24" />
      <Number v-model="number" id="number2" label="Favorite Number" placeholder="24" ping />
      <Number v-model="number" id="number3" label="Favorite Number" placeholder="24" valid />
      <Number v-model="number" id="number4" label="Favorite Number" placeholder="24" invalid error-message="Currently blocked age!" />
      <Number v-model="number" id="number5" label="Favorite Number" placeholder="24" help-text="We don't share sensible data ;)" />
    </section>

    <section class="bg-slate-800 rounded-lg py-4 px-12 flex flex-col gap-4">
      <h2 class="text-xl font-semibold text-white">Checkboxes</h2>

      <Checkbox v-model="checkbox" id="checkbox1" label="Newsletter?" />
      <Checkbox v-model="checkbox" id="checkbox2" label="Newsletter?" ping />
      <Checkbox v-model="checkbox" id="checkbox3" label="Newsletter?" valid />
      <Checkbox v-model="checkbox" id="checkbox4" label="Newsletter?" invalid error-message="You HAVE to accept!!!" />
      <Checkbox v-model="checkbox" id="checkbox5" label="Newsletter?" help-text="We promise this is not spam!" />
    </section>

    <section class="bg-slate-800 rounded-lg py-4 px-12 flex flex-col gap-4">
      <h2 class="text-xl font-semibold text-white">Dropdowns</h2>

      <Dropdown v-model="dropdown" id="dropdown1" label="Country" placeholder="Austria" :options="COUNTRIES" />
      <Dropdown v-model="dropdown" id="dropdown2" label="Country" placeholder="Austria" :options="COUNTRIES" ping />
      <Dropdown v-model="dropdown" id="dropdown3" label="Country" placeholder="Austria" :options="COUNTRIES" valid />
      <Dropdown v-model="dropdown" id="dropdown4" label="Country" placeholder="Austria" :options="COUNTRIES" invalid />
      <Dropdown
        v-model="dropdown"
        id="dropdown5"
        label="Country"
        placeholder="Austria"
        :options="COUNTRIES"
        help-text="This will be shown on your profile."
      />
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

import { UserIcon } from "@heroicons/vue/24/outline";

import Checkbox from "../components/checkbox/Checkbox.vue";
import Dropdown from "../components/dropdown/Dropdown.vue";
import Number from "../components/number/Number.vue";
import Text from "../components/text/Text.vue";

const COUNTRIES = [
  { value: "CH", label: "Switzerland" },
  { value: "DE", label: "Germany" },
  { value: "HR", label: "Croatia" },
  { value: "JP", label: "Japan" },
  { value: "FR", label: "France" },
];

const checkbox = ref(false);
const text = ref("awu");
const number = ref(24);
const dropdown = ref(COUNTRIES[0]);
</script>
