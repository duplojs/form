<script setup lang="ts">
import * as EE from "@duplojs/utils/either";
import { unwrap } from "@duplojs/utils";
import { OutlineButton, PrimaryButton } from "@duplojs/form/vueDesignSystem";
import { onBeforeUnmount, ref } from "vue";
import {
	type ProfileFormSubmitValue,
	useProfileForm,
} from "./profileForm";

const {
	ProfileForm,
	checkProfileForm,
	currentProfileValue,
	resetProfileForm,
	disposeProfileForm,
} = useProfileForm();

const submitResult = ref<ProfileFormSubmitValue | null>(null);

function submit() {
	const result = checkProfileForm();

	if (EE.isRight(result)) {
		submitResult.value = unwrap(result);
	}
}

function reset() {
	resetProfileForm();
	submitResult.value = null;
}

onBeforeUnmount(disposeProfileForm);
</script>

<template>
	<ProfileForm @submit="submit">
		<PrimaryButton
			type="submit"
			label="Submit"
		/>

		<OutlineButton
			type="button"
			label="Reset"
			@click="reset"
		/>
	</ProfileForm>

	<pre>currentValue: {{ currentProfileValue }}</pre>

	<pre>checkedValue: {{ submitResult }}</pre>
</template>
