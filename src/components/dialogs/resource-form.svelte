<script lang="ts">
	import Button, { Label } from '@smui/button';
	import Dialog, { Title, Content } from '@smui/dialog';
	import IconButton from '@smui/icon-button';
	import Textfield from '@smui/textfield';
	import { loader, loading, resourcesStore, resourceStore, snackStore } from '@modules/stores';
	import {
		addResource,
		updateResource,
		deleteResource,
		type Resource,
		getResources
	} from '@modules/resource';
	import { messages } from '@modules/messages';

	let focusRef = null;

	const submitForm = (e: SubmitEvent) => {
		loader(async () => {
			const form = new FormData(e.target as HTMLFormElement);
			const { id, title, description, url } = Object.fromEntries(form);
			const type = $resourceStore.type;
			const { error /*data*/ } =
				type === 'add'
					? await addResource({ title, description, url } as Resource)
					: type === 'edit'
					? await updateResource({ id, title, description, url } as Resource)
					: await deleteResource({ id } as { id: string });
			if (error) {
				snackStore.showMsg(error.message);
				return;
			}
			// todo: use 'data' to update object in store
			// reset state
			const { data: newData, error: newError } = await getResources();
			if (newError) {
				snackStore.showMsg(error.message);
				return;
			}
			resourcesStore.set(newData);
			resourceStore.reset();
			const msg =
				type === 'add'
					? messages.ADD_RESOURCE_SUCCESS
					: type === 'edit'
					? messages.UPDATE_RESOURCE_SUCCESS
					: messages.DELETE_RESOURCE_SUCCESS;
			snackStore.showMsg(msg);
		});
	};
</script>

<Dialog
	bind:open={$resourceStore.opened}
	on:SMUIDialog:opened={focusRef.focus()}
	on:SMUIDialog:closed={resourceStore.reset}
>
	<Content>
		<IconButton on:click={resourceStore.reset} class="right-corner material-icons">
			close
		</IconButton>
		<Title>
			{$resourceStore.type === 'add' ? 'Add' : $resourceStore.type === 'edit' ? 'Edit' : 'Delete'} Resource
		</Title>
		<center>
			<form on:submit|preventDefault={submitForm}>
				<input type="hidden" name="id" value={$resourceStore?.resource?.id} />
				<p>
					<Textfield
						style="width: 100%;"
						type="text"
						variant="outlined"
						label="Title"
						input$name="title"
						value={$resourceStore?.resource?.title}
						bind:this={focusRef}
						input$emptyValueUndefined
						disabled={$loading || $resourceStore.type === 'delete'}
					/>
				</p>
				<p>
					<Textfield
						style="width: 100%;"
						type="text"
						variant="outlined"
						label="Description"
						input$name="description"
						value={$resourceStore?.resource?.description}
						input$emptyValueUndefined
						disabled={$loading || $resourceStore.type === 'delete'}
					/>
				</p>
				<p>
					<Textfield
						style="width: 100%;"
						type="text"
						variant="outlined"
						label="Website"
						input$name="url"
						value={$resourceStore?.resource?.url}
						input$emptyValueUndefined
						disabled={$loading || $resourceStore.type === 'delete'}
					/>
				</p>
				<br />
				{#if $resourceStore.type === 'delete'}
					<strong>Are you sure?</strong>
					<p />
				{/if}
				<Button class="dialog-button" type="submit" variant="outlined" disabled={$loading}>
					<Label>
						{$loading ? 'Loading' : $resourceStore.type === 'delete' ? 'Delete' : 'Save'}
					</Label>
				</Button>
				<Button
					type="button"
					on:click={resourceStore.reset}
					class="dialog-button"
					variant="outlined"
					disabled={$loading}
				>
					<Label>Cancel</Label>
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
</style>
