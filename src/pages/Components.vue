<template>
  <div class="container mx-auto py-10 flex flex-col gap-y-6">
    <!-- Text Input -->
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

    <!-- Number Input -->
    <section class="bg-slate-800 rounded-lg py-4 px-12 flex flex-col gap-4">
      <h2 class="text-xl font-semibold text-white">Number</h2>

      <Number v-model="number" id="number1" label="Favorite Number" placeholder="24" />
      <Number v-model="number" id="number2" label="Favorite Number" placeholder="24" ping />
      <Number v-model="number" id="number3" label="Favorite Number" placeholder="24" valid />
      <Number v-model="number" id="number4" label="Favorite Number" placeholder="24" invalid error-message="Currently blocked age!" />
      <Number v-model="number" id="number5" label="Favorite Number" placeholder="24" help-text="We don't share sensible data ;)" />
    </section>

    <!-- Checkboxes -->
    <section class="bg-slate-800 rounded-lg py-4 px-12 flex flex-col gap-4">
      <h2 class="text-xl font-semibold text-white">Checkboxes</h2>

      <Checkbox v-model="checkbox" id="checkbox1" label="Newsletter?" />
      <Checkbox v-model="checkbox" id="checkbox2" label="Newsletter?" ping />
      <Checkbox v-model="checkbox" id="checkbox3" label="Newsletter?" valid />
      <Checkbox v-model="checkbox" id="checkbox4" label="Newsletter?" invalid error-message="You HAVE to accept!!!" />
      <Checkbox v-model="checkbox" id="checkbox5" label="Newsletter?" help-text="We promise this is not spam!" />
    </section>

    <!-- Dropdowns -->
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

    <!-- Buttons -->
    <section class="bg-slate-800 rounded-lg py-4 px-12 flex flex-col gap-4">
      <h2 class="text-xl font-semibold text-white">Buttons</h2>

      <div class="flex flex-col gap-2">
        <div class="flex gap-2">
          <Button label="Button Solid" variant="primary" @click="handleButtonClicked" />
          <Button label="Button Tinted" variant="primary" style-variant="tinted" @click="handleButtonClicked" />
          <Button label="Button Outline" variant="primary" style-variant="outline" @click="handleButtonClicked" />
        </div>

        <div class="flex gap-2">
          <Button label="Button Solid" variant="secondary" @click="handleButtonClicked" />
          <Button label="Button Tinted" variant="secondary" style-variant="tinted" @click="handleButtonClicked" />
          <Button label="Button Outline" variant="secondary" style-variant="outline" @click="handleButtonClicked" />
        </div>

        <div class="flex gap-2">
          <Button label="Button Solid" variant="neutral" @click="handleButtonClicked" />
          <Button label="Button Tinted" variant="neutral" style-variant="tinted" @click="handleButtonClicked" />
          <Button label="Button Outline" variant="neutral" style-variant="outline" @click="handleButtonClicked" />
        </div>

        <div class="flex gap-2">
          <Button label="Button Solid" variant="success" @click="handleButtonClicked" />
          <Button label="Button Tinted" variant="success" style-variant="tinted" @click="handleButtonClicked" />
          <Button label="Button Outline" variant="success" style-variant="outline" @click="handleButtonClicked" />
        </div>

        <div class="flex gap-2">
          <Button label="Button Solid" variant="danger" @click="handleButtonClicked" />
          <Button label="Button Tinted" variant="danger" style-variant="tinted" @click="handleButtonClicked" />
          <Button label="Button Outline" variant="danger" style-variant="outline" @click="handleButtonClicked" />
        </div>

        <div class="flex gap-2">
          <Button label="Button Solid" variant="warning" @click="handleButtonClicked" />
          <Button label="Button Tinted" variant="warning" style-variant="tinted" @click="handleButtonClicked" />
          <Button label="Button Outline" variant="warning" style-variant="outline" @click="handleButtonClicked" />
        </div>

        <div class="flex gap-2">
          <Button label="Button Solid" variant="info" @click="handleButtonClicked" />
          <Button label="Button Tinted" variant="info" style-variant="tinted" @click="handleButtonClicked" />
          <Button label="Button Outline" variant="info" style-variant="outline" @click="handleButtonClicked" />
        </div>
      </div>
    </section>

    <!-- Dialogs -->
    <section class="bg-slate-800 rounded-lg py-4 px-12 flex flex-col gap-4">
      <h2 class="text-xl font-semibold text-white">Dialogs</h2>

      <div class="flex gap-2">
        <Dialog title="Create Supplier">
          <Dropdown v-model="dropdown" id="dropdown6" label="Country" placeholder="Austria" :options="COUNTRIES" />
        </Dialog>
      </div>
    </section>

    <!-- Badges -->
    <section class="bg-slate-800 rounded-lg py-4 px-12 flex flex-col gap-4">
      <h2 class="text-xl font-semibold text-white">Badges</h2>

      <div class="flex flex-col gap-2">
        <div class="flex gap-2">
          <Badge label="Badge Solid" variant="primary" />
          <Badge label="Badge Solid" variant="primary" @click="handleBadgeDismissed" dismissable />
          <Badge label="Badge Tinted" variant="primary" style-variant="tinted" />
          <Badge label="Badge Tinted" variant="primary" @click="handleBadgeDismissed" style-variant="tinted" dismissable />
          <Badge label="Badge Outline" variant="primary" style-variant="outline" />
          <Badge label="Badge Outline" variant="primary" @click="handleBadgeDismissed" style-variant="outline" dismissable />
        </div>

        <div class="flex gap-2">
          <Badge label="Badge Solid" variant="secondary" />
          <Badge label="Badge Solid" variant="secondary" @click="handleBadgeDismissed" dismissable />
          <Badge label="Badge Tinted" variant="secondary" style-variant="tinted" />
          <Badge label="Badge Tinted" variant="secondary" @click="handleBadgeDismissed" style-variant="tinted" dismissable />
          <Badge label="Badge Outline" variant="secondary" style-variant="outline" />
          <Badge label="Badge Outline" variant="secondary" @click="handleBadgeDismissed" style-variant="outline" dismissable />
        </div>

        <div class="flex gap-2">
          <Badge label="Badge Solid" variant="neutral" />
          <Badge label="Badge Solid" variant="neutral" @click="handleBadgeDismissed" dismissable />
          <Badge label="Badge Tinted" variant="neutral" style-variant="tinted" />
          <Badge label="Badge Tinted" variant="neutral" @click="handleBadgeDismissed" style-variant="tinted" dismissable />
          <Badge label="Badge Outline" variant="neutral" style-variant="outline" />
          <Badge label="Badge Outline" variant="neutral" @click="handleBadgeDismissed" style-variant="outline" dismissable />
        </div>

        <div class="flex gap-2">
          <Badge label="Badge Solid" variant="success" />
          <Badge label="Badge Solid" variant="success" @click="handleBadgeDismissed" dismissable />
          <Badge label="Badge Tinted" variant="success" style-variant="tinted" />
          <Badge label="Badge Tinted" variant="success" @click="handleBadgeDismissed" style-variant="tinted" dismissable />
          <Badge label="Badge Outline" variant="success" style-variant="outline" />
          <Badge label="Badge Outline" variant="success" @click="handleBadgeDismissed" style-variant="outline" dismissable />
        </div>

        <div class="flex gap-2">
          <Badge label="Badge Solid" variant="danger" />
          <Badge label="Badge Solid" variant="danger" @click="handleBadgeDismissed" dismissable />
          <Badge label="Badge Tinted" variant="danger" style-variant="tinted" />
          <Badge label="Badge Tinted" variant="danger" @click="handleBadgeDismissed" style-variant="tinted" dismissable />
          <Badge label="Badge Outline" variant="danger" style-variant="outline" />
          <Badge label="Badge Outline" variant="danger" @click="handleBadgeDismissed" style-variant="outline" dismissable />
        </div>

        <div class="flex gap-2">
          <Badge label="Badge Solid" variant="warning" />
          <Badge label="Badge Solid" variant="warning" @click="handleBadgeDismissed" dismissable />
          <Badge label="Badge Tinted" variant="warning" style-variant="tinted" />
          <Badge label="Badge Tinted" variant="warning" @click="handleBadgeDismissed" style-variant="tinted" dismissable />
          <Badge label="Badge Outline" variant="warning" style-variant="outline" />
          <Badge label="Badge Outline" variant="warning" @click="handleBadgeDismissed" style-variant="outline" dismissable />
        </div>

        <div class="flex gap-2">
          <Badge label="Badge Solid" variant="info" />
          <Badge label="Badge Solid" variant="info" @click="handleBadgeDismissed" dismissable />
          <Badge label="Badge Tinted" variant="info" style-variant="tinted" />
          <Badge label="Badge Tinted" variant="info" @click="handleBadgeDismissed" style-variant="tinted" dismissable />
          <Badge label="Badge Outline" variant="info" style-variant="outline" />
          <Badge label="Badge Outline" variant="info" @click="handleBadgeDismissed" style-variant="outline" dismissable />
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

import { UserIcon } from "@heroicons/vue/24/outline";

import Badge from "../components/badge/Badge.vue";
import Button from "../components/button/Button.vue";
import Checkbox from "../components/checkbox/Checkbox.vue";
import Dialog from "../components/dialog/Dialog.vue";
import Dropdown from "../components/dropdown/Dropdown.vue";
import Number from "../components/number/Number.vue";
import Text from "../components/text/Text.vue";

const COUNTRIES = [
  { label: "Switzerland", value: "CH" },
  { label: "United States", value: "US" },
  { label: "Germany", value: "DE" },
  { label: "United Kingdom", value: "GB" },
  { label: "France", value: "FR" },
  { label: "Italy", value: "IT" },
  { label: "Spain", value: "ES" },
  { label: "Netherlands", value: "NL" },
  { label: "Australia", value: "AU" },
  { label: "Canada", value: "CA" },
  { label: "Brazil", value: "BR" },
  { label: "Russia", value: "RU" },
  { label: "India", value: "IN" },
  { label: "China", value: "CN" },
  { label: "Japan", value: "JP" },
  { label: "South Korea", value: "KR" },
  { label: "Mexico", value: "MX" },
  { label: "Sweden", value: "SE" },
  { label: "Norway", value: "NO" },
  { label: "Denmark", value: "DK" },
  { label: "Belgium", value: "BE" },
  { label: "Austria", value: "AT" },
  { label: "Ireland", value: "IE" },
  { label: "Greece", value: "GR" },
  { label: "New Zealand", value: "NZ" },
  { label: "Singapore", value: "SG" },
  { label: "South Africa", value: "ZA" },
  { label: "Argentina", value: "AR" },
  { label: "Chile", value: "CL" },
  { label: "Colombia", value: "CO" },
  { label: "Nigeria", value: "NG" },
  { label: "Egypt", value: "EG" },
  { label: "Turkey", value: "TR" },
  { label: "Thailand", value: "TH" },
  { label: "Finland", value: "FI" },
  { label: "Poland", value: "PL" },
  { label: "Czech Republic", value: "CZ" },
  { label: "Hungary", value: "HU" },
  { label: "Ukraine", value: "UA" },
  { label: "Israel", value: "IL" },
  { label: "Malaysia", value: "MY" },
  { label: "Saudi Arabia", value: "SA" },
  { label: "United Arab Emirates", value: "AE" },
  { label: "Qatar", value: "QA" },
  { label: "Kuwait", value: "KW" },
  { label: "Indonesia", value: "ID" },
  { label: "Vietnam", value: "VN" },
  { label: "Philippines", value: "PH" },
  { label: "Pakistan", value: "PK" },
];

const checkbox = ref(false);
const text = ref("awu");
const number = ref(24);
const dropdown = ref(null);

/**
 * Handle when the button is clicked. This method logs a message to the console since this is just a demo.
 *
 * @param { PointerEvent } event - The event which triggered the handler.
 */
const handleButtonClicked = (event: PointerEvent) => {
  console.log("Button clicked!", event);
};

/**
 * Handle when the badge is dismissed. This method logs a message to the console since this is just a demo.
 *
 * @param { PointerEvent } event - The event which triggered the handler.
 */
const handleBadgeDismissed = (event: PointerEvent) => {
  console.log("Badge dismissed!", event);
};
</script>
