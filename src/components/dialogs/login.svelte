<script lang="ts">
	import Button, { Label } from '@smui/button';
	import { Title, Content } from '@smui/dialog';
	import Dialog from '@smui/dialog';
	import { Separator } from '@smui/list';
	import Textfield from '@smui/textfield';
	import { _login, _loginWithGoogle } from '@modules/auth';
	import { loader, loading, showLogin, snackStore } from '@modules/stores';
	import { messages } from '@modules/messages';

	const login = async (e?: SubmitEvent) =>
		await loader(async () => {
			const form = new FormData(e?.target as HTMLFormElement);
			const { email }: { email?: string } = Object.fromEntries(form);
			const { error } = email ? await _login(email) : await _loginWithGoogle();
			const msg = error ? error : email ? messages.EMAIL_SENT : messages.LOGIN_SUCCESS;
			snackStore.showMsg(msg);
		});
</script>

<Dialog bind:open={$showLogin}>
	<Title>Login</Title>
	<Content>
		<center>
			<form on:submit|preventDefault={login}>
				<p>Sign in via magic link with your email below</p>
				<div>
					<Textfield
						type="email"
						variant="outlined"
						label="Email"
						input$name="email"
						input$emptyValueUndefined
					/>
				</div>
				<br />
				<Button class="color-red" type="submit" variant="outlined" disabled={$loading}>
					<Label>{$loading ? 'Loading' : 'Send magic link'}</Label>
				</Button>
			</form>
			<br />
			<Separator />
			<br />
			OR
			<br />
			<br />
			<Button style="background-color: red" variant="raised" on:click={() => login()}>
				Login with Google
			</Button>
		</center>
	</Content>
</Dialog>
