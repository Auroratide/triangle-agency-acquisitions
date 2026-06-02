<footer>
	<div class="container">
		<ul class="footer-links">
			<li>
				<a href="https://auroratide.com/support-me">Support Auroratide</a>
			</li>
			<li>
				<a href="https://shop.hauntedtable.games/collections/physical-games"
					>Support Haunted Table</a
				>
			</li>
			<li><a href="https://github.com">Source Code</a></li>
		</ul>
		<p class="license">
			Triangle Agency Acquisitions is an independent production by Auroratide
			and is not affiliated with Triangle Agency or Haunted Table, LLC. It is
			published under the Triangle Agency Third Party License. Triangle Agency
			is copyright Haunted Table, LLC.
		</p>
	</div>
</footer>

<style>
	footer {
		inline-size: 100%;
		font-size: 0.875em;
		position: relative;
		background: var(--agency-ink);
		color: var(--bg);
		z-index: 2;
	}

	.container {
		inline-size: 100%;
		max-inline-size: 50rem;
		padding: 1em 1em;
	}

	.footer-links {
		list-style: none;
		padding: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		text-align: center;
		gap: 1em;
		margin: 0 0 0.75em 0;
	}

	.footer-links li {
		flex: 1;
	}

	.footer-links a {
		color: var(--bg);
		font-weight: bold;
		display: inline-block;
	}

	/* .footer-links li::after {
			content: "▲";
			display: inline-block;
			margin-inline-start: 2em;
			font-size: 0.5em;
		}

		.footer-links li:last-child::after {
			display: none;
		} */

	.license {
		font-size: 0.625em;
		text-align: center;
		margin: 0;
		line-height: 1;
		text-wrap: balance;
	}
</style>
