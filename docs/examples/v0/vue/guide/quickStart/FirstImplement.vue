<script setup lang="ts">
import * as EE from "@duplojs/utils/either";
import { PrimaryButton } from "@duplojs/form/vueDesignSystem";
import { useFirstForm } from "./firstForm";

const {
	TheForm,
	checkForm,
} = useFirstForm();

function onSubmit() {
	void EE.whenIsRight(
		checkForm(),
		(result) => {
			alert(JSON.stringify(result));
		},
	);
}
</script>

<template>
	<TheForm @submit="onSubmit">
		<PrimaryButton
			type="submit"
			label="submit"
		/>
	</TheForm>
</template>
