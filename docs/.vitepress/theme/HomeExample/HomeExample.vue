<script setup>
import Example from "./example.md";
import { useMyCustomForm } from "@/examples/v0/vue/home/index.ts";
import { PrimaryButton } from "@form/v0/vueDesignSystem";

const { TheForm, checkForm } = useMyCustomForm();
</script>

<template>
	<div class="win">
		<div class="container">
			<Example class="example" />

			<div class="form-container">
				<TheForm
					class="form"
					@submit="checkForm()"
				>
					<PrimaryButton
						type="submit"
						label="Submit"
					/>
				</TheForm>
			</div>
		</div>
	</div>
</template>

<style scoped="scss">
.win {
	display: flex;
	width: 100%;
	justify-content: center;
	align-items: center;
	margin-bottom: 15px;
}

.container {
	flex-grow: 0;
	flex-shrink: 0;
	flex-basis: auto;
	width: 95vw;
	display: flex;
	gap: 10px;
	justify-content: center;
	align-items: start;
	overflow: hidden;

	> * {
		flex-grow: 1;
		flex-shrink: 1;
		flex-basis: 0;
		min-width: 0;
		height: 1050px;
	}
}

@media (max-width: 768px) {
  .container {
    flex-direction: column;
	width: 100%;

	> * {
		flex-grow: 1;
		flex-shrink: 1;
		flex-basis: auto;
		min-width: auto;
		height: auto;
		width: 100%;
	}
  }
}

.form-container {
	padding: 16px 0 16px 0;
}

.form {
	background-color: white;
	height: 100%;
	padding: 20px;
	border-radius: 8px;
	color: black;
	overflow: hidden;

	&::before {
		content: "This is a super form !";
		font-size: 1.5rem;
	}

	> :global(.DFV-grid-container) {
		max-height: 100%;
		flex-grow: 1;
		overflow: auto;
		align-content: start;
	}
}
</style>
