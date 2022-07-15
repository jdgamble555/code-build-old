<script lang="ts">
	import Button, { Label } from '@smui/button';
	import Dialog, { Title, Content } from '@smui/dialog';
	import IconButton from '@smui/icon-button';
	import Textfield from '@smui/textfield';
	import { _getProfile, _updateProfile, type Profile } from '@modules/profile';
	import {
		loader,
		loading,
		profileStore,
		showProfile,
		snackStore,
		toggleProfile
	} from '@modules/stores';
	import { messages } from '@modules/messages';

	let focusRef = null;

	const getProfile = async () =>
		await loader(async () => {
			if (!$profileStore) {
				const { error, data } = await _getProfile();
				if (error) {
					snackStore.showMsg(error);
				}
				if (data) {
					profileStore.set(data);
				}
			}
			focusRef.focus();
		});

	const updateProfile = async (e: SubmitEvent) =>
		await loader(async () => {
			const form = new FormData(e.target as HTMLFormElement);
			const { username, website, photo_url } = Object.fromEntries(form);
			const { error, data } = await _updateProfile({ username, website, photo_url } as Profile);
			if (error) {
				snackStore.showMsg(error);
			}
			if (data) {
				profileStore.set(data);
				snackStore.showMsg(messages.UPDATE_PROFILE_SUCCESS);
			}
			toggleProfile();
		});
</script>

<Dialog bind:open={$showProfile} fullscreen on:SMUIDialog:opened={getProfile}>
	<Content>
		<IconButton on:click={toggleProfile} class="right-corner material-icons">close</IconButton>
		<Title>Edit Profile</Title>
		<center>
			<form on:submit|preventDefault={updateProfile}>
				<p>
					<Textfield
						style="width: 100%;"
						type="text"
						variant="outlined"
						label="Username"
						input$name="username"
						value={$profileStore?.username}
						bind:this={focusRef}
						input$emptyValueUndefined
						disabled={$loading}
					/>
				</p>
				<p>
					<Textfield
						style="width: 100%;"
						type="text"
						variant="outlined"
						label="Photo URL"
						input$name="photo_url"
						value={$profileStore?.photo_url}
						input$emptyValueUndefined
						disabled={$loading}
					/>
				</p>
				<p>
					<Textfield
						style="width: 100%;"
						type="text"
						variant="outlined"
						label="Website"
						input$name="website"
						value={$profileStore?.website}
						input$emptyValueUndefined
						disabled={$loading}
					/>
				</p>
				<br />
				<Button class="dialog-button" type="submit" variant="outlined" disabled={$loading}>
					<Label>{$loading ? 'Loading' : 'Save'}</Label>
				</Button>
				<Button
					type="button"
					on:click={toggleProfile}
					class="dialog-button"
					variant="outlined"
					disabled={$loading}
				>
					<Label>Close</Label>
				</Button>
			</form>
		</center>
	</Content>
</Dialog>

<style global>
	.right-corner {
		position: absolute;
		top: 0;
		right: 0;
	}
	.dialog-button {
		background-color: #cfd8dc;
		color: #d81b60;
	}
	.mdc-button {
		text-transform: none;
		padding: 20px;
	}
</style>
