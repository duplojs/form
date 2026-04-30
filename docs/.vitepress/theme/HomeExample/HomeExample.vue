<script setup>
import Example from "./example.md";
import { useMyCustomForm } from "@/examples/v0/vue/home/index.ts";
import { PrimaryButton } from "@form/v0/vueDesignSystem";

const { TheForm, CheckForm } = useMyCustomForm();
</script>

<template>
	<div class="win">
		<div class="container">
			<Example />

			<div class="form-container">
				<TheForm
					class="form"
					@submit="CheckForm()"
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

	> * {
		flex-grow: 1;
		flex-shrink: 1;
		flex-basis: 0;
		min-width: 0;
	}
}

@media (max-width: 768px) {
  .container {
    flex-direction: column;
	width: 100%;
	flex-grow: unset;
	flex-shrink: unset;
	flex-basis: unset;

	> * {
		flex-grow: 1;
		flex-shrink: 1;
		flex-basis: auto;
		min-width: auto;
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

	&::before {
		content: "This is a super form !";
		font-size: 1.5rem;
	}
}
</style>
