<script setup lang="ts">
import * as EE from "@duplojs/utils/either";
import { PrimaryButton } from "@duplojs/form/vueDesignSystem";
import { useProfileLayoutForm } from "./profileLayoutForm";

const { TheForm, checkForm } = useProfileLayoutForm();

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
			label="Submit"
		/>

		<template #customMessage="{ formField, value, update }">
			<div class="DFV-grid-element">
				<p>Custom render with slot</p>

				<button
					type="button"
					@click="update('')"
				>
					reset
				</button>

				{{ value }}

				<component :is="formField" />
			</div>
		</template>
	</TheForm>
</template>
