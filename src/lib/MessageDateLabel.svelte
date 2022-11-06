<script>
	import { messageDate } from '../formatters/date.js';

	export let date;

	$: [day, month, dayName] = messageDate(date);
	$: saturday = dayName?.toLowerCase() === 'sa';
	$: sunday = dayName?.toLowerCase() === 'su';
</script>

{#if date}
	<div>
		<span class="day">{day}</span>
		<span class="month">{month}</span>
		<span class="day-name" class:saturday class:sunday>{dayName}</span>
	</div>
{/if}

<style>
	div {
		display: flex;
	}

	.day,
	.month,
	.day-name {
		background-color: white;
		padding: 5px;
		font-family: 'Poor Story', cursive;
		color: black;
		border: 3px solid black;
		text-align: center;
	}

	.day {
		height: 28px;
		width: 28px;
		transform: skew(10deg);
		z-index: 10;
	}

	.month {
		height: 32px;
		width: 32px;
		transform: translate(-4px, -8px);
		z-index: 9;
	}

	.day-name {
		height: 28px;
		width: 28px;
		transform: skew(-10deg) translate(-8px, -4px) rotate(10deg);
		z-index: 8;
	}

	.saturday {
		background-color: #1ea1c4;
		color: white;
	}

	.sunday {
		background-color: #fe0100;
		color: white;
	}
</style>
