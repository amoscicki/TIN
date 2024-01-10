<script>
  import { LoggedIn } from '$lib';
  import { enhance } from '$app/forms';
  import { Avatar } from '@skeletonlabs/skeleton';
  export let form;
  export let data;
  //  src={`data:${material.imageType};base64,${material.image}`}
  //                 alt={material.imageName}
</script>

<h1 class="w-full prose text-center h1">Profile</h1>
<LoggedIn let:user>
  <div class="relative inline-block">
    <span
      class="absolute z-10 w-24 h-24 text-lg badge-icon variant-filled-warning -top-4 -right-4"
      >{user.role}</span
    >
    <Avatar width="w-64" initials={user.email[0]} src={user.avatar} />
  </div>
  <h3 class="m-8 h3">{user.email}</h3>
  <form action="" use:enhance method="POST" enctype="multipart/form-data">
    <label>
      Name
      <input
        class="input"
        type="text"
        name="name"
        id="name"
        value={user?.name}
      /></label
    >
    <label>
      Avatar
      <input
        class="input"
        type="file"
        accept="image/*"
        name="avatar"
        id="avatar"
      />
    </label>
    <button class="btn variant-filled-primary" type="submit">Save</button>
  </form>
</LoggedIn>
