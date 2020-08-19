<template>
	<button
		class="btn badge"
		style="margin-top: 0.5rem;"
		v-on:click="count += 1"
		v-bind:data-badge="count"
	>
		count: {{ count }}
	</button>
</template>

<script>
export default {
	data() {
		return {
			count: 0,
		};
	},
};
</script>

<style>
.btn {
	-webkit-appearance: none;
	-moz-appearance: none;
	appearance: none;
	background: #fff;
	border: 0.05rem solid #5755d9;
	border-radius: 0.1rem;
	color: #5755d9;
	cursor: pointer;
	display: inline-block;
	font-size: 0.8rem;
	height: 1.8rem;
	line-height: 1.2rem;
	outline: none;
	padding: 0.25rem 0.4rem;
	text-align: center;
	text-decoration: none;
	transition: background 0.2s, border 0.2s, box-shadow 0.2s, color 0.2s;
	-webkit-user-select: none;
	-moz-user-select: none;
	-ms-user-select: none;
	user-select: none;
	vertical-align: middle;
	white-space: nowrap;
}

.badge {
	position: relative;
	white-space: nowrap;
}

.badge.btn:after {
	position: absolute;
	transform: translate(50%, -50%);
	top: 0;
	right: 0;
}

.badge[data-badge]:after {
	font-size: 0.7rem;
	height: 0.9rem;
	line-height: 1;
	min-width: 0.9rem;
	padding: 0.1rem 0.2rem;
	text-align: center;
	white-space: nowrap;

	background: #5755d9;
	background-clip: padding-box;
	border-radius: 0.5rem;
	box-shadow: 0 0 0 0.1rem #fff;
	color: #fff;
	content: attr(data-badge);
	display: inline-block;
}
</style>
